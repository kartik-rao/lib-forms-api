import Auth from '@aws-amplify/auth';
import { CognitoUser, CognitoUserSession, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AdminCreateUserResponse, AdminDisableUserRequest, AdminDeleteUserRequest, AdminGetUserRequest, AttributeType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { MailSlurp } from "mailslurp-client";
const pwdGenerator = require('generate-password');
import * as AWS from 'aws-sdk';
const config = require("../outputs/stack.dev.json");
const mailSlurp = new MailSlurp({ apiKey: "85117a16750ebeb8c6e659c6e9984ac0290557c2dfa90df89d54fc72b170ac8a" })

var credentials = new AWS.SharedIniFileCredentials({profile: 'fl-infrastructure-dev'});
AWS.config.credentials = credentials;
AWS.config.region = config['Region'];
let UserPool = new AWS.CognitoIdentityServiceProvider();

interface IFormsAppUser {
    username: string,
    usersub: string,
    password: string,
    tenantName: string,
    group: string,
    attributes: any
}

const SSM = {
    State : "/App/formsli/dev/tenantState",
    GlobalAdmin : "/App/formsli/dev/globalAdmin",
    AccountAdmin : "/App/formsli/dev/tenantAccountAdmin",
    AccountEditor : "/App/formsli/dev/tenantAccountEditor",
    AccountViewer : "/App/formsli/dev/tenantAccountViewer",
}

export class AuthUtils {
    static globalAdmin   : IFormsAppUser;
    static accountAdmin  : IFormsAppUser;
    static accountEditor : IFormsAppUser;
    static accountViewer : IFormsAppUser;
    static initialized   : boolean = false;
    private constructor() {

    }

    static findParameter(key:string, params: AWS.SSM.Parameter[] = [], noParse: boolean = false) : any {
        let param = params.find((p) => {
            return p.Name == key;
        });

        if(param) {
            if (noParse) {
                return param.Value;
            }
            return JSON.parse(param.Value);
        }
    }

    static async setup() {
        return new Promise(async (resolve, reject) => {
            const ssm = new AWS.SSM();
            if (AuthUtils.initialized == true) {
                resolve();
                return;
            }
            try {
                console.log("\n   AuthUtils.checking tenant state");
                // Check if tenant has already been setup on this instance
                let params = await ssm.getParametersByPath({Path: "/App/formsli/dev/", WithDecryption: true}).promise();
                let state = AuthUtils.findParameter(SSM.State, params.Parameters);
                if (!state || state != "1") {
                    throw new Error("NotSetup");
                }
                AuthUtils.globalAdmin = AuthUtils.findParameter(SSM.GlobalAdmin, params.Parameters) as IFormsAppUser;
                AuthUtils.accountAdmin = AuthUtils.findParameter(SSM.AccountAdmin, params.Parameters) as IFormsAppUser;
                AuthUtils.accountEditor = AuthUtils.findParameter(SSM.AccountEditor, params.Parameters) as IFormsAppUser;
                AuthUtils.accountViewer = AuthUtils.findParameter(SSM.AccountViewer, params.Parameters) as IFormsAppUser;
                AuthUtils.initialized = true;
                resolve();
            } catch (error) {
                console.log("\n   AuthUtils.checking tenant state - Creating new tenant");
                // Test Tenant has not been setup
                try {
                    // Set password for Global Admin and save in SSM
                    let adminPwd = pwdGenerator.generate({length:8, numbers: true, symbols: true, uppercase: true, strict: true});
                    let adminUser = { username: config["UserPoolAdminUser"], password: adminPwd, group: "Admin"};
                    await ssm.putParameter({
                        Name: SSM.GlobalAdmin,
                        Type: 'String',
                        Overwrite: true,
                        Value: JSON.stringify(adminUser),
                        Tier: "Standard"}).promise();
                    await UserPool.adminSetUserPassword({UserPoolId: config['UserPoolId'], Username:config['UserPoolAdminUser'], Password: adminPwd, Permanent: true}).promise();
                    AuthUtils.globalAdmin = adminUser as IFormsAppUser;

                    // Setup new test tenant and save in SSM
                    const tenantId = new Date().toISOString();
                    AuthUtils.accountAdmin = await AuthUtils.setupTenant("P@ssword1", `lib-forms-api ${config['Stage']} ${tenantId}`);
                    let {username, password} = AuthUtils.accountAdmin;
                    await ssm.putParameter({
                        Name: SSM.AccountAdmin,
                        Type: 'String',
                        Value: JSON.stringify(AuthUtils.accountAdmin),
                        Tier: "Standard"}).promise();
                    AuthUtils.accountEditor = await AuthUtils.inviteUser(username, password, 'Editor');
                    await ssm.putParameter({
                        Name: SSM.AccountEditor,
                        Type: 'String',
                        Value: JSON.stringify(AuthUtils.accountEditor),
                        Tier: "Standard"}).promise();
                    AuthUtils.accountViewer = await AuthUtils.inviteUser(username, password, 'Viewer');
                    await ssm.putParameter({
                        Name: SSM.AccountViewer,
                        Type: 'String',
                        Value: JSON.stringify(AuthUtils.accountViewer),
                        Tier: "Standard"}).promise();
                    await ssm.putParameter({
                        Name: SSM.State,
                        Type: 'String',
                        Value: "1",
                        Tier: "Standard"}).promise();
                    AuthUtils.initialized = true;
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        });
    }

    static async loadUserAttributes(user: CognitoUser) {
        return new Promise((resolve, reject) => {
            user.getUserAttributes((err, result: CognitoUserAttribute[]=[]) => {
                if(err) {
                    reject(err);
                } else {
                    let attributes = {};
                    result.map((a) => {
                        attributes[a.getName()] = a.getValue();
                    })
                    resolve(attributes);
                }
            })
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
                let attributes = AuthUtils.attributeListToMap(user.UserAttributes);
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
                let attributes = AuthUtils.attributeListToMap(res.User.Attributes);

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