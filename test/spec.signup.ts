jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

import Auth, { CognitoUser } from '@aws-amplify/auth';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { AdminCreateUserResponse, AdminGetUserRequest, UserType } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { MailSlurp } from "mailslurp-client";
import { Inbox } from 'mailslurp-swagger-sdk-ts/dist/api';
import { ApiHelper } from "./api.utils";
import { AuthUtils } from './auth.utils';

const pwdGenerator = require('generate-password');
const config = require("../outputs/stack.dev.json");
const mailSlurp = new MailSlurp({ apiKey: "85117a16750ebeb8c6e659c6e9984ac0290557c2dfa90df89d54fc72b170ac8a" })
const credentials = new AWS.SharedIniFileCredentials({profile: 'fl-infrastructure'});

const RdsCommonParams = {
    database: config["Service"],
    secretArn: config["DBSecretArn"],
    resourceArn: config["DBClusterArn"]
};

AWS.config.credentials = credentials;
AWS.config.region = config['Region'];

let UserPool = new AWS.CognitoIdentityServiceProvider();
Auth.configure(ApiHelper.apiConfig().Auth);

describe("Onboarding", () => {
    beforeAll(() => {

    });

    describe("signup", () => {
        const tenantName = "lib-forms-api";
        let inbox: Inbox;
        let password : string = pwdGenerator.generate({length:8, numbers: true, symbols: true, uppercase: true, strict: true});
        let verificationCode: string;
        let accountAdminUserId: string;
        let signupSuccess = true;
        let tenantId;

        beforeAll(async(done) => {
            try {
                inbox = await mailSlurp.createNewEmailAddress();
            } catch (error) {
                signupSuccess = false;
            }
        });

        it("cognito.signUp", async (done) => {
            try {
                let signupResult = await Auth.signUp({
                    username: inbox.emailAddress,
                    password: password,
                    attributes : {
                        given_name: "Signup",
                        family_name: "Spec",
                        "custom:tenantName": tenantName
                    }
                });
                expect(signupResult).toBeDefined();
                expect(signupResult.user).toBeDefined();
                accountAdminUserId = signupResult.userSub;
            } catch (error) {
                signupSuccess = false;
            }
        });

        it("signup.emailVerification", async (done) => {
            try {
                let email = await mailSlurp.fetchLatestEmail(inbox.emailAddress);
                verificationCode = email.body;
            } catch (error) {
                signupSuccess = false;
                done.fail("Email Verification Failed");
                console.log(`spec.signup.emailVerification ERROR - ${error.toString()}`);
            }
        });

        it("signup.confirmSignUp", async(done) => {
            try {
                expect(verificationCode).toBeDefined("Must have verification code");
                await Auth.confirmSignUp(inbox.emailAddress, verificationCode, {forceAliasCreation: true});
            } catch (error) {
                signupSuccess = false;
                done.fail("Confirm Sign Up Failed");
                console.log(`spec.signup.confirmSignUp ERROR - ${error.toString()}`);
            }
        });

        it("signup.attributes", async (done) => {
            try {
                let user = await UserPool.adminGetUser({UserPoolId:config["UserPoolId"], Username: accountAdminUserId} as AdminGetUserRequest).promise();
                expect(user).toBeDefined("User should exist");
                let attributes = AuthUtils.attributeListToMap(user.UserAttributes);
                expect(attributes).toBeDefined();
                expect(attributes["custom:tenantId"]).toBeDefined("User must have tenantId");
                tenantId = attributes["custom:tenantId"];
                expect(attributes["custom:group"]).toEqual("AccountAdmin", "User must be AccountAdmin");
                expect(attributes["custom:tenantName"]).toEqual(tenantName, "User must have tenantName");
            } catch (error) {
                signupSuccess = false;
            }
        });

        if(signupSuccess) {
            describe("Invite", () => {
                let inboxEditor;
                let user: UserType;
                beforeAll(async (done) => {
                    try {
                        inboxEditor = await mailSlurp.createNewEmailAddress();
                    } catch (error) {
                        console.log(`spec.signup.invite MailSlurp ERROR - ${error.toString()}`);
                    }
                });

                it("invite.createUser", async(done) => {
                    await Auth.signIn(inbox.emailAddress, password);
                    let accountAdmin: CognitoUser = await Auth.currentAuthenticatedUser();
                    let session: CognitoUserSession = await Auth.currentSession();
                    let token = session.getIdToken().getJwtToken();

                    let invitePayload = {
                        "custom:group" : "AccountEditor",
                        "custom:source": accountAdmin.getUsername(), // this is sub not email
                        family_name: "Invite",
                        given_name: "Spec",
                        email: inboxEditor.emailAddress
                    }
                    let inviteResponse = await fetch(`${config.ServiceEndpoint}/invite`, {
                        method: 'POST',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(invitePayload)
                    });

                    let response: AdminCreateUserResponse = await inviteResponse.json();
                    expect(response).toBeDefined();
                    expect(response.User)
                    user = response.User;
                    let attributes = AuthUtils.attributeListToMap(user.Attributes);
                    expect(attributes).toBeDefined();
                    expect(attributes["custom:group"]).toEqual("AccountEditor");
                    expect(attributes["custom:tenantId"]).toEqual(tenantId);
                    expect(attributes["custom:tenantName"]).toEqual(tenantName);
                    expect(attributes["email"]).toEqual(inboxEditor.emailAddress);
                });

                it("invite.passwordEmail", async (done) => {
                    try {
                        expect(user).toBeDefined();
                        let email = await mailSlurp.fetchLatestEmail(inbox.emailAddress);
                        expect(email).toBeDefined();
                        expect(email.body).toBeDefined();
                        expect(email.body.indexOf("temporary password")).toBeGreaterThan(-1);
                    } catch (error) {
                        console.log(`spec.signup.invite.passwordEmail MailSlurp ERROR - ${error.toString()}`);
                        done.fail("")
                    }
                });

                afterAll(async (done) => {
                    UserPool.adminDisableUser({UserPoolId: config["UserPoolId"], Username: user.Username}).promise();
                    UserPool.adminDeleteUser({UserPoolId: config["UserPoolId"], Username: user.Username}).promise();
                    const rds = new AWS.RDSDataService();
                    let transaction = await rds.beginTransaction(RdsCommonParams).promise();
                    let {transactionId} = transaction;
                    await rds.executeStatement({
                        transactionId: transactionId,
                        ...RdsCommonParams,
                        sql: "SET foreign_key_checks=0"}).promise();

                    const deleteUserSQL:AWS.RDSDataService.ExecuteStatementRequest = {
                        ...RdsCommonParams,
                        transactionId: transactionId,
                        sql: `DELETE FROM User where id=:userid`,
                        parameters: [
                            {name: "userid", value: {stringValue: accountAdminUserId}}
                        ]
                    };

                    await rds.executeStatement(deleteUserSQL).promise();
                    await rds.commitTransaction({
                        transactionId: transactionId,
                        resourceArn: RdsCommonParams.resourceArn,
                        secretArn: RdsCommonParams.secretArn}).promise();
                });
            });
        }

        afterAll(async (done) => {
            UserPool.adminDisableUser({UserPoolId: config["UserPoolId"], Username: accountAdminUserId}).promise();
            UserPool.adminDeleteUser({UserPoolId: config["UserPoolId"], Username: accountAdminUserId}).promise();

            const rds = new AWS.RDSDataService();
            let transaction = await rds.beginTransaction(RdsCommonParams).promise();
            let {transactionId} = transaction;
            await rds.executeStatement({
                transactionId: transactionId,
                ...RdsCommonParams,
                sql: "SET foreign_key_checks=0"}).promise();
            const deleteUserSQL:AWS.RDSDataService.ExecuteStatementRequest = {
                ...RdsCommonParams,
                transactionId: transactionId,
                sql: `DELETE FROM User where id=:userid`,
                parameters: [
                    {name: "userid", value: {stringValue: accountAdminUserId}}
                ]
            };
            const deleteAccountSQL:AWS.RDSDataService.ExecuteStatementRequest = {
                ...RdsCommonParams,
                transactionId: transactionId,
                sql: `DELETE FROM Account where id=:accountid`,
                parameters: [
                    {name: "accountid", value: {stringValue: tenantId}}
                ]
            };
            await rds.executeStatement(deleteAccountSQL).promise();
            await rds.executeStatement(deleteUserSQL).promise();
            await rds.commitTransaction({
                transactionId: transactionId,
                resourceArn: RdsCommonParams.resourceArn,
                secretArn: RdsCommonParams.secretArn}).promise();
        }, 60000);

    });
});