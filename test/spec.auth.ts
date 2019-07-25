require('isomorphic-fetch');
import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { MailSlurp } from "mailslurp-client";
import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';
import { Inbox } from 'mailslurp-swagger-sdk-ts';
const config = require("../outputs/stack.json");
const mailSlurp = new MailSlurp({ apiKey: "85117a16750ebeb8c6e659c6e9984ac0290557c2dfa90df89d54fc72b170ac8a" })

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

import * as AWS from 'aws-sdk';
import { AdminGetUserRequest, AdminDisableUserRequest, AdminDeleteUserRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";

var credentials = new AWS.SharedIniFileCredentials({profile: 'fl-infrastructure-dev'});
AWS.config.credentials = credentials;
AWS.config.region = 'ap-southeast-2';
let UserPool = new AWS.CognitoIdentityServiceProvider();

Amplify.configure({
    Auth: {
      region: 'ap-southeast-2',
      userPoolId: config["UserPoolId"],
      userPoolWebClientId: config["UserPoolClientId"]
    }
});

describe("Auth", () => {
    describe("Admin SignIn", () => {
        it("can sign in as Admin user", async (done) => {
            const user = await Auth.signIn(config["UserPoolAdminUser"], "Pd8Ohek..");
            expect(user).toBeDefined();
            done();
        });

        afterAll(async (done) => {
            await Auth.signOut();
            done();
        })
    })

    describe("New Tenant", async () => {
        let inbox: Inbox;
        let user : ISignUpResult;
        let verificationCode: string;
        const tenant = `Forms.li QA`;
        const password = "P@ssword1";

        beforeAll(async (done) => {
            try {
                inbox = await mailSlurp.createInbox();
                done();
            } catch (error) {
                fail(error);
            }
        });

        it("Signup", async (done) => {
            try {
                user = await Auth.signUp({
                    username: inbox.emailAddress,
                    password: password,
                    attributes : {
                        "custom:tenantName": tenant
                    }
                });
                expect(user).toBeDefined();
                done();
            } catch (error) {
                fail(error)
            }
        });


        it("Get Verification Code", async (done) => {
            try {
                const emails = await mailSlurp.getEmails(inbox.id, { minCount: 1 })

                expect(emails.length).toBeGreaterThan(0);
                let email = await mailSlurp.getEmail(emails[0].id);

                expect(email).toBeDefined();
                expect(email.body.length).toBeGreaterThan(1);
                verificationCode = email.body;
                done();
            } catch (error) {
                fail(error);
            }
        });

        it("Verify Email", async (done) => {
            // Confirm user
            await Auth.confirmSignUp(inbox.emailAddress, verificationCode, {
                forceAliasCreation: true
            });

            done();
        });

        it("Sign In", async (done) => {
            Auth.signIn(inbox.emailAddress, password).then((value)=> {
                console.log("Admin User", value);
                Auth.currentAuthenticatedUser()
                    .then((user: CognitoUser) => {
                        user.getUserAttributes((err, attributes=[]) => {
                            if(err) {
                                fail(err);
                                return;
                            }
                            let attrs = {}
                            attributes.forEach((attr) => {
                                attrs[attr["Name"]] = attr["Value"];
                            });
                            console.log("New User Attributes", attrs);
                            done();
                        })
                    })
                    .catch(err => fail(err));
            }).catch(err => fail(err));
        });

        afterAll(async (done) => {
            // delete user
            if(user) {
                try {
                    await UserPool.adminDisableUser(<AdminDisableUserRequest>{
                        Username: user.userSub,
                        UserPoolId: config["UserPoolId"]
                    }).promise();
                    await UserPool.adminDeleteUser(<AdminDeleteUserRequest>{
                        Username: user.userSub,
                        UserPoolId: config["UserPoolId"]
                    }).promise();
                    done();
                } catch (error) {
                    fail(error)
                }
            } else {
                done();
            }
        })
    })
});