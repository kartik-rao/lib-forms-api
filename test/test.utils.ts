import Auth from '@aws-amplify/auth';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { AdminCreateUserResponse, AdminDisableUserRequest, AdminDeleteUserRequest, AdminGetUserRequest, AttributeType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { MailSlurp } from "mailslurp-client";

import * as AWS from 'aws-sdk';
const config = require("../outputs/stack.dev.json");
const mailSlurp = new MailSlurp({ apiKey: "85117a16750ebeb8c6e659c6e9984ac0290557c2dfa90df89d54fc72b170ac8a" })

var credentials = new AWS.SharedIniFileCredentials({profile: 'fl-infrastructure-dev'});
AWS.config.credentials = credentials;
AWS.config.region = 'ap-southeast-2';
let UserPool = new AWS.CognitoIdentityServiceProvider();

interface IFormsAppUser {
    username: string,
    usersub: string,
    password: string,
    tenantName: string,
    group: string,
    attributes: any
}
const TenantStateParameter = "/App/formsli/dev/tenantstate";
const TenantAccountAdmin   = "/App/formsli/dev/tenantAccountAdmin";
const TenantAccountEditor  = "/App/formsli/dev/tenantAccountEditor";
const TenantAccountViewer  = "/App/formsli/dev/tenantAccountViewer";

export class TestUtils {
    static globalAdmin: IFormsAppUser = {
        username: config["UserPoolAdminUser"],
        password: "Pd8Ohek..",
        group: "Admin",
        tenantName: null,
        attributes: null,
        usersub: null
    }

    static accountAdmin : IFormsAppUser;
    static accountEditor : IFormsAppUser;
    static accountViewer : IFormsAppUser;

    private constructor() {

    }

    static async setup() {
        return new Promise(async (resolve, reject) => {
            const ssm = new AWS.SSM();
            try {
                console.log("TestUtils.checking tenant state");
                // Check if tenant has already been setup on this instance
                await ssm.getParameter({Name: TenantStateParameter, WithDecryption: true}).promise();
                let taa = await ssm.getParameter({Name: TenantAccountAdmin, WithDecryption: true}).promise();
                TestUtils.accountAdmin = JSON.parse(taa.Parameter.Value) as IFormsAppUser;

                let tae = await ssm.getParameter({Name: TenantAccountEditor, WithDecryption: true}).promise();
                TestUtils.accountEditor = JSON.parse(tae.Parameter.Value) as IFormsAppUser;

                let tav = await ssm.getParameter({Name: TenantAccountViewer, WithDecryption: true}).promise();
                TestUtils.accountViewer = JSON.parse(tav.Parameter.Value) as IFormsAppUser;
                resolve();
            } catch (error) {
                console.log("TestUtils.checking tenant state - Creating new tenant");
                // Test Tenant has not been setup
                try {
                    TestUtils.accountAdmin = await TestUtils.setupTenant("P@ssword1", `lib-forms-api ${1e5 * Math.random()}`);
                    let {username, password} = TestUtils.accountAdmin;
                    await ssm.putParameter({
                        Name: TenantAccountAdmin,
                        Type: 'String',
                        Value: JSON.stringify(TestUtils.accountAdmin),
                        Tier: "Standard"}).promise();
                    TestUtils.accountEditor = await TestUtils.inviteUser(username, password, 'Editor');
                    await ssm.putParameter({
                        Name: TenantAccountEditor,
                        Type: 'String',
                        Value: JSON.stringify(TestUtils.accountEditor),
                        Tier: "Standard"}).promise();
                    TestUtils.accountViewer = await TestUtils.inviteUser(username, password, 'Viewer');
                    await ssm.putParameter({
                        Name: TenantAccountViewer,
                        Type: 'String',
                        Value: JSON.stringify(TestUtils.accountViewer),
                        Tier: "Standard"}).promise();
                    await ssm.putParameter({
                        Name: TenantStateParameter,
                        Type: 'String',
                        Value: "1",
                        Tier: "Standard"}).promise();
                        resolve();
                } catch (error) {
                    reject(error);
                }
            }
        });
    }

    static attributeListToMap(attrs: AttributeType[]) : any {
        let attributes = {}
        attrs.forEach((a) => {
            attributes[a.Name] = a.Value
        });
        return attributes;
    }

    static async setupTenant(password: string, tenantName: string) : Promise<IFormsAppUser> {
        return new Promise(async (resolve, reject) => {
            try {
                let inbox = await mailSlurp.createInbox();
                let signupResult = await Auth.signUp({
                    username: inbox.emailAddress,
                    password: password,
                    attributes : {
                        given_name: "Formsli",
                        family_name: "AccountAdmin",
                        "custom:tenantName": tenantName
                    }
                });
                const emails = await mailSlurp.getEmails(inbox.id, { minCount: 1 })
                let email = await mailSlurp.getEmail(emails[0].id);
                let verificationCode = email.body;
                await Auth.confirmSignUp(inbox.emailAddress, verificationCode, {
                    forceAliasCreation: true
                });
                let user = await UserPool.adminGetUser({UserPoolId:config["UserPoolId"], Username: signupResult.userSub} as AdminGetUserRequest).promise();
                let attributes = TestUtils.attributeListToMap(user.UserAttributes);
                resolve({
                    username: inbox.emailAddress,
                    password: password,
                    tenantName: tenantName,
                    usersub: signupResult.userSub,
                    group: 'AccountAdmin',
                    attributes: attributes
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    static async inviteUser(adminEmail: string, adminPassword: string, group: string) : Promise<IFormsAppUser> {
        // https://stackoverflow.com/questions/40287012/how-to-change-user-status-force-change-password
        return new Promise(async (resolve, reject) => {
            try {
                let inbox = await mailSlurp.createInbox();
                await Auth.signIn(adminEmail, adminPassword);
                let admin: CognitoUser = await Auth.currentAuthenticatedUser();
                let session: CognitoUserSession = await Auth.currentSession();
                let token = session.getIdToken().getJwtToken();

                let invitePayload = {
                    "custom:group" : group,
                    "custom:source": admin.getUsername(), // this is sub not email
                    family_name: "Formsli",
                    given_name: group,
                    email: inbox.emailAddress
                }

                let inviteResponse = await fetch(`${config.ServiceEndpoint}/invite`, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(invitePayload)
                });

                let res: AdminCreateUserResponse = await inviteResponse.json();

                const emails = await mailSlurp.getEmails(inbox.id, { minCount: 1 });
                let email = await mailSlurp.getEmail(emails[0].id);
                let attributes = TestUtils.attributeListToMap(res.User.Attributes);

                resolve({
                    username: attributes['email'],
                    usersub: res.User.Username,
                    password: email.body.split("temporary password is")[1],
                    group: group,
                    tenantName: attributes['custom:tenantName'],
                    attributes: attributes
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    static async deleteUser(user: IFormsAppUser) {
        return new Promise(async (resolve, reject)=> {
            try {
                await UserPool.adminDisableUser(<AdminDisableUserRequest>{
                    Username: user.usersub,
                    UserPoolId: config["UserPoolId"]
                }).promise();
                await UserPool.adminDeleteUser(<AdminDeleteUserRequest>{
                    Username: user.usersub,
                    UserPoolId: config["UserPoolId"]
                }).promise();
                resolve();
            } catch (error) {
                reject(error)
            }
        });
    }
}