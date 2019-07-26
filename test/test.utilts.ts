import Auth from '@aws-amplify/auth';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { AdminCreateUserResponse, AdminDisableUserRequest, AdminDeleteUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { MailSlurp } from "mailslurp-client";
import AWS from 'aws-sdk';
const config = require("../outputs/stack.json");
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
    group: string
}

class TestUtils {
    private static __instance : TestUtils;
    private static globalAdmin;
    private static accountAdmin : IFormsAppUser;
    private static accountEditor : IFormsAppUser;
    private static accountViewer : IFormsAppUser;

    private constructor() {

    }

    static getInstance() {
        if(!TestUtils.__instance) {
            TestUtils.__instance = new TestUtils();
        }
        return TestUtils.__instance;
    }

    async setup() {
        return new Promise(async (resolve, reject) => {
            try {
                TestUtils.accountAdmin = await TestUtils.setupTenant("P@ssword1", `lib-forms-api ${1e5 * Math.random()}`);
                let {username, password} = TestUtils.accountAdmin;
                TestUtils.accountEditor = await TestUtils.inviteUser(username, password, 'Editor');
                TestUtils.accountViewer = await TestUtils.inviteUser(username, password, 'Viewer');
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    async teardown() {
        return new Promise(async (resolve, reject)=> {
            try {
                await TestUtils.deleteUser(TestUtils.accountViewer);
                await TestUtils.deleteUser(TestUtils.accountEditor);
                await TestUtils.deleteUser(TestUtils.accountAdmin);
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    static async setupTenant(password: string, tenantName: string) : Promise<IFormsAppUser> {
        return new Promise(async (resolve, reject) => {
            try {
                let inbox = await mailSlurp.createInbox();
                let signupResult = await Auth.signUp({
                    username: inbox.emailAddress,
                    password: password,
                    attributes : {
                        "custom:tenantName": tenantName
                    }
                });
                const emails = await mailSlurp.getEmails(inbox.id, { minCount: 1 })
                let email = await mailSlurp.getEmail(emails[0].id);
                let verificationCode = email.body;
                await Auth.confirmSignUp(inbox.emailAddress, verificationCode, {
                    forceAliasCreation: true
                });
                resolve({
                    username: inbox.emailAddress,
                    password: password,
                    tenantName: tenantName,
                    usersub: signupResult.userSub,
                    group: 'AccountAdmin'
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
                    family_name: admin.getUsername(),
                    given_name:"Viewer",
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

                let attributes = {}
                res.User.Attributes.map((a) => {
                    attributes[a.Name] = a.Value
                });

                resolve({
                    username: attributes['email'],
                    usersub: res.User.Username,
                    password: email.body.split("temporary password is")[1],
                    group: group,
                    tenantName: attributes['custom:tenantName']
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