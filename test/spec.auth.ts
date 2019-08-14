require('isomorphic-fetch');
import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { MailSlurp } from "mailslurp-client";
import { ISignUpResult, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Inbox } from 'mailslurp-swagger-sdk-ts';
const config = require("../outputs/stack.dev.json");
const mailSlurp = new MailSlurp({ apiKey: "85117a16750ebeb8c6e659c6e9984ac0290557c2dfa90df89d54fc72b170ac8a" })

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

import * as AWS from 'aws-sdk';
import { AdminDisableUserRequest, AdminDeleteUserRequest, AdminCreateUserResponse } from "aws-sdk/clients/cognitoidentityserviceprovider";

const SSM = {
    State : "/App/formsli/dev/tenantState",
    GlobalAdmin : "/App/formsli/dev/globalAdmin",
    AccountAdmin : "/App/formsli/dev/tenantAccountAdmin",
    AccountEditor : "/App/formsli/dev/tenantAccountEditor",
    AccountViewer : "/App/formsli/dev/tenantAccountViewer",
}

var credentials = new AWS.SharedIniFileCredentials({profile: 'fl-infrastructure-dev'});
AWS.config.credentials = credentials;
AWS.config.region = config['Region'];
let UserPool = new AWS.CognitoIdentityServiceProvider();

Amplify.configure({
    Auth: {
      region: config['Region'],
      userPoolId: config["UserPoolId"],
      userPoolWebClientId: config["UserPoolClientId"]
    }
});

describe("Auth", () => {

    let accAdminInbox: Inbox;
    let accAdmin : ISignUpResult;
    let tenantId: string;
    const tenant = `Dev-Formsli`;
    const password = "P@ssword1";

    describe("Global Admin", () => {
        it("can sign in", async (done) => {
            try {
                const user = await Auth.signIn(config["UserPoolAdminUser"], "LmgIBf:3");
                expect(user).toBeDefined();
                done();
            } catch (error) {
                console.error(error);
                fail(error);
            }
        });

        afterAll(async (done) => {
            await Auth.signOut();
            done();
        })
    });

    describe("New Tenant", () => {
        let verificationCode: string;
        beforeAll(async (done) => {
            try {
                accAdminInbox = await mailSlurp.createInbox();
                done();
            } catch (error) {
                console.error(error);
                fail(error);
            }
        });

        it("Signup", async (done) => {
            try {
                accAdmin = await Auth.signUp({
                    username: accAdminInbox.emailAddress,
                    password: password,
                    attributes : {
                        "custom:tenantName" : tenant,
                        "given_name" : "AccountAdmin",
                        "family_name": tenant
                    }
                });
                expect(accAdmin).toBeDefined();
                done();
            } catch (error) {
                console.error(error);
                fail(error)
            }
        });

        it("Email Verification", async (done) => {
            try {
                const emails = await mailSlurp.getEmails(accAdminInbox.id, { minCount: 1 })

                expect(emails.length).toBeGreaterThan(0);
                let email = await mailSlurp.getEmail(emails[0].id);

                expect(email).toBeDefined();
                expect(email.body.length).toBeGreaterThan(1);
                verificationCode = email.body;
                done();
            } catch (error) {
                console.error(error);
                fail(error);
            }
        });

        it("Confirm Sign Up", async (done) => {
            // Confirm user
            await Auth.confirmSignUp(accAdminInbox.emailAddress, verificationCode, {
                forceAliasCreation: true
            });
            done();
        });

        it("Sign In", async (done) => {

            await Auth.signIn(accAdminInbox.emailAddress, password);
            let user: CognitoUser = await Auth.currentAuthenticatedUser();

            user.getUserAttributes((err, attributes=[]) => {
                if(err) {
                    console.error(err);
                    fail(err);
                    return;
                }
                let attrs = {}
                attributes.forEach((attr) => {
                    attrs[attr["Name"]] = attr["Value"];
                });
                expect(attrs['custom:environment']).toBe('dev', "custom:environment should be 'dev'");
                expect(attrs['custom:group']).toBe('AccountAdmin', "custom:group should be 'AccountAdmin'");
                expect(attrs['custom:tenantName']).toEqual(tenant);
                expect(attrs['custom:tenantId']).toBeDefined("custom:tenantId should be set");
                expect(attrs['email_verified']).toBeTruthy();
                tenantId = attrs['custom:tenantId'];
                done();
            });

        });
    });

    describe("Existing Tenant", () => {
        let accViewerInbox: Inbox;
        let accViewerSub: string;

        beforeAll(async (done) => {
            await Auth.signOut();
            accViewerInbox = await mailSlurp.createInbox();
            done();
        });

        it("Invite User", async (done) => {
            try {
                await Auth.signIn(accAdminInbox.emailAddress, password);
                let admin: CognitoUser = await Auth.currentAuthenticatedUser();
                let session: CognitoUserSession = await Auth.currentSession();
                let token = session.getIdToken().getJwtToken();

                let invitePayload = {
                    "custom:group" : "Viewer",
                    "custom:source": admin.getUsername(), // this is sub not email
                    family_name: tenant,
                    given_name:"Viewer",
                    email: accViewerInbox.emailAddress
                }

                let inviteResponse = await fetch(`${config.ServiceEndpoint}/invite`, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(invitePayload)
                });

                if(inviteResponse.status != 200) {
                    done.fail(inviteResponse.statusText);
                    done();
                    return;
                }

                let res: AdminCreateUserResponse = await inviteResponse.json();
                expect(res).toBeDefined();
                expect(res.User).toBeDefined();

                accViewerSub = res.User.Username;
                let attrs = {}
                res.User.Attributes.forEach((attr) => {
                    attrs[attr["Name"]] = attr["Value"];
                });

                expect(attrs['custom:environment']).toBe('dev');
                expect(attrs['custom:group']).toBe('Viewer');
                expect(attrs['custom:tenantId']).toEqual(tenantId);
                expect(attrs['custom:source']).toEqual(accAdmin.userSub);
                expect(attrs['custom:tenantName']).toEqual(tenant);
                done();

            } catch (error) {
                console.error(error);
                fail(error);
            }
        });

        it("User login details", async () =>{
            const emails = await mailSlurp.getEmails(accViewerInbox.id, { minCount: 1 });
            expect(emails.length).toBeGreaterThan(0);
            let email = await mailSlurp.getEmail(emails[0].id);
            expect(email).toBeDefined();
            expect(email.body.length).toBeGreaterThan(1);
            expect(email.body.indexOf("temporary password is")).toBeGreaterThan(-1);
        });

        afterAll(async (done) => {
            // delete Viewer
            if(accViewerSub) {
                try {
                    await UserPool.adminDisableUser(<AdminDisableUserRequest>{
                        Username: accViewerSub,
                        UserPoolId: config["UserPoolId"]
                    }).promise();
                    await UserPool.adminDeleteUser(<AdminDeleteUserRequest>{
                        Username: accViewerSub,
                        UserPoolId: config["UserPoolId"]
                    }).promise();
                    done();
                } catch (error) {
                    done.fail(error);
                }
            } else {
                done();
            }
        });
    });

    afterAll(async (done) => {
        // delete Account Admin
        if(accAdmin) {
            try {
                await UserPool.adminDisableUser(<AdminDisableUserRequest>{
                    Username: accAdmin.userSub,
                    UserPoolId: config["UserPoolId"]
                }).promise();
                await UserPool.adminDeleteUser(<AdminDeleteUserRequest>{
                    Username: accAdmin.userSub,
                    UserPoolId: config["UserPoolId"]
                }).promise();
                done();
            } catch (error) {
                fail(error)
            }
        } else {
            done();
        }
    });
});