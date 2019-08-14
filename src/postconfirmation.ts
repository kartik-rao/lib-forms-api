//# sourceMappingURL=./postconfirmation.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import { CognitoUserPoolTriggerEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { AdminGetUserRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";

const uuid = require('uuid/v4');

const DBClusterARN = process.env.dbClusterArn;
const DBSecretARN = process.env.dbClusterSecretArn;
const ServiceName  = process.env.serviceName;

export const handle = async (event : CognitoUserPoolTriggerEvent, context : any, callback : any) => {
    console.log(`${ServiceName} - postconfirmation.handle`, event);

    const cognitoReq = event.request;
    const {userAttributes} = cognitoReq;
    const rds = new AWS.RDSDataService();

    // const ddbClient = DBClient.getInstance({convertEmptyValues: true});

    let source = userAttributes["custom:source"];
    let userId = userAttributes.sub;
    let userPool = new AWS.CognitoIdentityServiceProvider();
    const rdsCommonParams = {
        database: ServiceName,
        resourceArn: DBClusterARN,
        secretArn: DBSecretARN
    };

    if (!source) {
        // New Account Sign up
        // 1. Create Account with name as tenant + Create user with id as cognito sub
        let tenantName = userAttributes["custom:tenantName"];
        let accountId = uuid();
        let group = 'AccountAdmin';
        console.log(`${ServiceName} - New Account Flow - Init name=[${tenantName}] gen_id=[${accountId}]`);

        let transaction = await rds.beginTransaction(rdsCommonParams).promise();
        let {transactionId} = transaction;
        try {
            const addAccountSQL:AWS.RDSDataService.ExecuteStatementRequest = {
                ...rdsCommonParams,
                transactionId: transactionId,
                sql: `INSERT INTO Account(id, ownerId, name) VALUES(:id, :ownerId, :name)`,
                parameters: [
                    {name: "id", value: {stringValue: accountId}},
                    {name: "ownerId", value: {stringValue: userId}},
                    {name: "name", value: {stringValue: tenantName}}
                ]
            }

            const addUserSQL:AWS.RDSDataService.ExecuteStatementRequest = {
                ...rdsCommonParams,
                transactionId: transactionId,
                sql: `INSERT INTO User(id, ownerId, group, accountId, email, phone_number, given_name, family_name)
                    VALUES(:id, :ownerId, :group, :accountId, :email, :phone_number, :given_name, :family_name)`,
                parameters: [
                    {name: "id", value: {stringValue: userId}},
                    {name: "ownerId", value: {stringValue: userId}},
                    {name: "userGroup", value: {stringValue: group}},
                    {name: "accountId", value: {stringValue: accountId}},
                    {name: "email", value: {stringValue: userAttributes["email"]}},
                    {name: "phone_number", value: {stringValue: userAttributes["phone_number"]}},
                    {name: "given_name", value: {stringValue: userAttributes["given_name"]}},
                    {name: "family_name", value: {stringValue: userAttributes["family_name"]}}
                ]
            }
            await rds.executeStatement({
                ...rdsCommonParams,
                sql: "SET foreign_key_checks=0"
            }).promise();
            console.log(`${ServiceName} - New Account Flow - RDS.Insert Account`);
            await rds.executeStatement(addAccountSQL).promise();
            console.log(`${ServiceName} - New Account Flow - RDS.Insert User`);
            await rds.executeStatement(addUserSQL).promise();
            await rds.commitTransaction({transactionId: transactionId, ...rdsCommonParams}).promise();
        } catch (error) {
            // TODO: We should send an SNS notification or capture this error somewhere
            console.error(`${ServiceName} - AccountAdmin initiated flow - RDS Error [${userId}]`, error);
            await rds.rollbackTransaction({transactionId: transactionId, ...rdsCommonParams}).promise();
            callback(error);
        }

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

            console.log(`${ServiceName} - AccountAdmin initiated flow - RDS.Insert user=[${userId}] tenant=[${accountId}] group=[${group}]`);
            const addUserSQL:AWS.RDSDataService.ExecuteStatementRequest = {
                database: ServiceName,
                resourceArn: DBClusterARN,
                secretArn: DBSecretARN,
                sql: `INSERT INTO User(id, ownerId, group, accountId, email, phone_number, given_name, family_name)
                    VALUES(:id, :ownerId, :group, :accountId, :email, :phone_number, :given_name, :family_name)`,
                parameters: [
                    {name: "id", value: {stringValue: userId}},
                    {name: "ownerId", value: {stringValue: userId}},
                    {name: "userGroup", value: {stringValue: group}},
                    {name: "accountId", value: {stringValue: accountId}},
                    {name: "email", value: {stringValue: userAttributes["email"]}},
                    {name: "phone_number", value: {stringValue: userAttributes["phone_number"]}},
                    {name: "given_name", value: {stringValue: userAttributes["given_name"]}},
                    {name: "family_name", value: {stringValue: userAttributes["family_name"]}}
                ]
            }
            await rds.executeStatement(addUserSQL).promise();

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
                    {Name: "custom:group", Value: cognitoSetGroupParams.GroupName},
                    {Name: "custom:region", Value: process.env.region},
                    {Name: "custom:tenantName",  Value: accountAdmin.UserAttributes["custom:tenantName"] },
                    {Name: "custom:environment", Value: process.env.environment},
                    {Name: "custom:tenantId", Value: accountId}
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