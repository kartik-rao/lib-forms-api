//# sourceMappingURL=./postconfirmation.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {CognitoUserPoolTriggerEvent} from 'aws-lambda';
import * as _ from "lodash";
import {DBClient} from "./dbclient";
const uuid = require('uuid/v4');
import * as AWS from 'aws-sdk';
import { AdminGetUserRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";


const ServiceName = process.env.serviceName || 'dev-formsgraphql-postconfirmation';
const DDB_TABLE : string = process.env.table_app_data || 'formsgraphql_dev_masterdata';

export const handle = async (event : CognitoUserPoolTriggerEvent, context : any, callback : any) => {
    console.log(`${ServiceName} - postconfirmation.handle`, event);

    const cognitoReq = event.request;
    const {userAttributes} = cognitoReq;

    const ddbClient = DBClient.getInstance({convertEmptyValues: true});

    let source = userAttributes["custom:source"];
    let userId = userAttributes.sub;
    let userPool = new AWS.CognitoIdentityServiceProvider();

    if (!source) {
        // New Account Sign up
        // 1. Create Account with name as tenant + Create user with id as cognito sub
        let tenantName = userAttributes["custom:tenantName"];
        let accountId = uuid();
        let group = 'AccountAdmin';
        console.log(`${ServiceName} - New Account Flow - Init name=[${tenantName}] gen_id=[${accountId}]`);
        console.log(`${ServiceName} - New Account Flow - ddb.Put Account`);
        await ddbClient.put({
            TableName: DDB_TABLE,
            Item: {
                id   : accountId,
                type : "ACCOUNT",
                itemType : "ACCOUNT",
                owner: userId,
                name : tenantName,
                createdAt : new Date().toISOString()
            }
        }).promise();

        console.log(`${ServiceName} - New Account Flow - ddb.Put User`);
        await ddbClient.put({
            TableName: DDB_TABLE,
            Item: {
                id   : userId,
                type : "USER",
                meta : `${accountId}#${group}`,
                itemType : "USER",
                owner: userId,
                group: group,
                accountId: accountId,
                email: userAttributes["email"],
                phone_number: userAttributes["phone_number"],
                given_name: userAttributes["given_name"],
                family_name: userAttributes["family_name"],
                createdAt : new Date().toISOString()
        }}).promise();

        // 2. Set Cognito Group to Account Admin
        console.log(`${ServiceName} - New Account Flow - adminAddUserToGroup [AccountAdmin]`);
        let addUserToGroupParams = {
            GroupName : 'AccountAdmin',
            UserPoolId: event.userPoolId,
            Username  :  event.userName
        };
        await userPool.adminAddUserToGroup(addUserToGroupParams).promise();

        // 3. Update user attributes
        console.log(`${ServiceName} - New Account Flow - adminUpdateUserAttributes`);
        let updateUserAttributesParams = {
            UserAttributes: [
                {Name: "custom:group", Value: addUserToGroupParams.GroupName},
                {Name: "custom:region", Value: process.env.region},
                {Name: "custom:environment", Value: process.env.environment},
                {Name: "custom:tenantName",  Value: tenantName },
                {Name: "custom:tenantId",  Value: accountId }
            ],
            UserPoolId: event.userPoolId,
            Username: event.userName
        };
        await userPool.adminUpdateUserAttributes(updateUserAttributesParams).promise();
        callback(null, event);
    } else {
        // AccountAdmin initiated signup
        let group = userAttributes["custom:group"];
        if (group == 'Admin') {
            // Do not allow Admin as a group
            group = 'AccountAdmin';
        }
        // Owner's sub is in the source
        console.log(`${ServiceName} - AccountAdmin initiated flow - Init userId=[${userId}] group=[${group}]`);
        let accountAdmin: AWS.CognitoIdentityServiceProvider.AdminGetUserResponse;
        try {
            console.log(`${ServiceName} - AccountAdmin initiated flow - ${source}`);
            accountAdmin = await userPool.adminGetUser(<AdminGetUserRequest>{
                UserPoolId: event.userPoolId, Username: source
            }).promise();

            let accountId = accountAdmin.UserAttributes["custom:tenantId"];
            if(!accountId) {
                let err = new Error("InvalidUserCreateRequest")
                console.error(`${ServiceName} - Invalid user, no tenant on AccountAdmin`, err);
                throw err;
            }

            console.log(`${ServiceName} - AccountAdmin initiated flow - ddb.Put user=[${userId}] tenant=[${accountId}] group=[${group}]`);
            await ddbClient.put({
                TableName: DDB_TABLE,
                Item: {
                    id   : userId,
                    type : "USER",
                    meta : `${accountId}#${group}`,
                    itemType : "USER",
                    owner: source,
                    group: group,
                    accountId: accountId,
                    email: userAttributes["email"],
                    phone_number: userAttributes["phone_number"],
                    given_name: userAttributes["given_name"],
                    family_name: userAttributes["family_name"],
                    createdAt : new Date().toISOString()
                }
            }).promise();

            let cognitoSetGroupParams : AWS.CognitoIdentityServiceProvider.Types.AdminAddUserToGroupRequest = {
                GroupName : group,
                UserPoolId: event.userPoolId,
                Username  : event.userName
            };

            console.log(`${ServiceName} - AccountAdmin initiated flow - adminAddUserToGroup username=[${event.userName}] group=[${group}]`);
            await userPool.adminAddUserToGroup(cognitoSetGroupParams).promise();
            let cognitoUpdateAttributesParams : AWS.CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesRequest= {
                UserPoolId: event.userPoolId,
                Username  : event.userName,
                UserAttributes : [
                    {Name: "custom:region", Value: process.env.region},
                    {Name: "custom:environment", Value: process.env.environment},
                    {Name: "custom:tenant", Value: accountId},
                ]
            };
            await userPool.adminUpdateUserAttributes(cognitoUpdateAttributesParams).promise();
            callback(null, event);
        } catch (error) {
            console.error(`${ServiceName} - AccountAdmin initiated flow - Error [${userId}]`, error);
            callback(error)
        }
    }
}

/**
 * {
    "version": "1",
    "region": "eu-central-1",
    "userPoolId": "eu-central-1_45YtlkflA",
    "userName": "user4",
    "callerContext": {
        "awsSdkVersion": "aws-sdk-java-console",
        "clientId": "4736lckau64in48dku3rta0eqa"
    },
    "triggerSource": "PostConfirmation_ConfirmSignUp",
    "request": {
        "userAttributes": {
            "sub": "a2c21839-f9fc-49e3-be9a-16f5823d6705",
            "cognito:user_status": "CONFIRMED",
            "email_verified": "true",
            "email": "asdfsdfsgdfg@carbtc.net"
        }
    },
    "response": {}
}
 */