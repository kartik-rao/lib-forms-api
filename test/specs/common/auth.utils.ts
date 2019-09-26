import Auth from '@aws-amplify/auth';
import { CognitoUser, CognitoUserSession, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AdminCreateUserResponse, AdminDisableUserRequest, AdminDeleteUserRequest, AdminGetUserRequest, AttributeType, AdminConfirmSignUpRequest, AdminSetUserPasswordRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { MailSlurp } from "mailslurp-client";
const pwdGenerator = require('generate-password');
import * as AWS from 'aws-sdk';
const mailSlurp = new MailSlurp({ apiKey: "85117a16750ebeb8c6e659c6e9984ac0290557c2dfa90df89d54fc72b170ac8a" })

import {loadConfiguration, SSMPath} from "./config";

interface IFormsAppUser {
    username: string,
    usersub: string,
    password: string,
    tenantName: string,
    group: string,
    attributes: any
}

var credentials = new AWS.SharedIniFileCredentials({profile: 'fl-infrastructure'});
AWS.config.credentials = credentials;
let UserPool = new AWS.CognitoIdentityServiceProvider();

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
            let config = await loadConfiguration();
            AWS.config.region = config['Region'];
            const ssm = new AWS.SSM();
            if (AuthUtils.initialized == true) {
                resolve();
                return;
            }
            try {
                // console.log("\n   AuthUtils.checking tenant state");
                if (!config["app/qa/tenantState"] || config["app/qa/tenantState"] != "1") {
                    throw new Error("NotSetup");
                }
                AuthUtils.globalAdmin = JSON.parse(config["app/qa/globalAdmin"]) as IFormsAppUser;
                AuthUtils.accountAdmin = JSON.parse(config["app/qa/tenantAccountAdmin"]) as IFormsAppUser;
                AuthUtils.accountEditor = JSON.parse(config["app/qa/tenantAccountEditor"]) as IFormsAppUser;
                AuthUtils.accountViewer = JSON.parse(config["app/qa/tenantAccountViewer"]) as IFormsAppUser;
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
                        Name: SSMPath["app/qa/globalAdmin"],
                        Type: 'String',
                        Value: JSON.stringify(adminUser),
                        Tier: "Standard"}).promise();
                    await UserPool.adminSetUserPassword({UserPoolId: config['UserPoolId'], Username:config['UserPoolAdminUser'], Password: adminPwd, Permanent: true}).promise();
                    AuthUtils.globalAdmin = adminUser as IFormsAppUser;
                    console.log("\n   AuthUtils.checking tenant state - Global Admin OK");
                    // Setup new test tenant and save in SSM
                    const tenantId = new Date().toISOString();
                    AuthUtils.accountAdmin = await AuthUtils.setupTenant("P@ssword1", `lib-forms-api ${config['Stage']} ${tenantId}`);
                    console.log("\n   AuthUtils.checking tenant state - AccountAdmin OK");
                    let {username, password} = AuthUtils.accountAdmin;
                    await ssm.putParameter({
                        Name: SSMPath["app/qa/tenantAccountAdmin"],
                        Type: 'String',
                        Value: JSON.stringify(AuthUtils.accountAdmin),
                        Tier: "Standard"}).promise();
                    AuthUtils.accountEditor = await AuthUtils.inviteUser(username, password, 'AccountEditor');
                    console.log("\n   AuthUtils.checking tenant state - AccountEditor OK");
                    await ssm.putParameter({
                        Name: SSMPath["app/qa/tenantAccountEditor"],
                        Type: 'String',
                        Value: JSON.stringify(AuthUtils.accountEditor),
                        Tier: "Standard"}).promise();
                    AuthUtils.accountViewer = await AuthUtils.inviteUser(username, password, 'AccountViewer');
                    console.log("\n   AuthUtils.checking tenant state - AccountViewer OK");
                    await ssm.putParameter({
                        Name: SSMPath["app/qa/tenantAccountViewer"],
                        Type: 'String',
                        Value: JSON.stringify(AuthUtils.accountViewer),
                        Tier: "Standard"}).promise();
                    await ssm.putParameter({
                        Name: SSMPath["app/qa/tenantState"],
                        Type: 'String',
                        Value: "1",
                        Tier: "Standard"}).promise();
                        console.log("\n   AuthUtils.checking tenant state - New Tenant Setup DONE");
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
                let config = await loadConfiguration();
                let inbox = await mailSlurp.createNewEmailAddress();
                let signupResult = await Auth.signUp({
                    username: inbox.emailAddress,
                    password: password,
                    attributes : {
                        given_name: "Formsli",
                        family_name: "AccountAdmin",
                        "custom:tenantName": tenantName
                    }
                });

                await UserPool.adminConfirmSignUp(<AdminConfirmSignUpRequest>{
                    Username: signupResult.userSub,
                    UserPoolId: config["cognito/userpool/id"]
                }).promise();

                let user = await UserPool.adminGetUser({UserPoolId:config["cognito/userpool/id"], Username: signupResult.userSub} as AdminGetUserRequest).promise();
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
                let config = await loadConfiguration();
                let inbox = await mailSlurp.createNewEmailAddress();
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

                let inviteResponse = await fetch(`${config["apig/restApiEndpoint"]}}/invite`, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(invitePayload)
                });

                let res: AdminCreateUserResponse = await inviteResponse.json();
                if(!res) {
                    throw new Error("UserInviteError");
                }

                let password = pwdGenerator.generate({length:8, numbers: true, symbols: true, uppercase: true, strict: true});
                await UserPool.adminSetUserPassword(<AdminSetUserPasswordRequest>{
                    Username: res.User.Username,
                    UserPoolId: config["cognito/userpool/id"],
                    Password: password,
                    Permanent: true
                }).promise();

                let attributes = AuthUtils.attributeListToMap(res.User.Attributes);
                resolve({
                    username: attributes['email'],
                    usersub: res.User.Username,
                    password: password,
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
                let config = await loadConfiguration();
                await UserPool.adminDisableUser(<AdminDisableUserRequest>{
                    Username: user.usersub,
                    UserPoolId: config["cognito/userpool/id"]
                }).promise();
                await UserPool.adminDeleteUser(<AdminDeleteUserRequest>{
                    Username: user.usersub,
                    UserPoolId: config["cognito/userpool/id"]
                }).promise();
                resolve();
            } catch (error) {
                reject(error)
            }
        });
    }
}