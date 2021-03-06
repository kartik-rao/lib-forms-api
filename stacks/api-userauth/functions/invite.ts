//# sourceMappingURL=./invite.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import _AWS from 'aws-sdk';
import XRay from 'aws-xray-sdk';
const AWS = XRay.captureAWS(_AWS);

import { AdminAddUserToGroupRequest, AdminCreateUserRequest, AdminCreateUserResponse } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { ExecuteStatementResponse } from 'aws-sdk/clients/rdsdataservice';

const DatabaseName = process.env.databaseName;
const DBClusterId = process.env.dbClusterArn;
const DBSecretARN = process.env.dbClusterSecretArn;
const ServiceName  = process.env.serviceName;

const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json"
}

const AllowedGroups = ['AccountAdmin', 'AccountEditor', 'AccountViewer'];

/**
"custom:region": "ap-southeast-2",
"sub": "51538dda-c557-49d7-b8b4-d28650ba2c92",
"cognito:groups": "AccountAdmin",
"email_verified": "true",
"iss": "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_Cnjjlmsxh",
"custom:group": "AccountAdmin",
"cognito:username": "51538dda-c557-49d7-b8b4-d28650ba2c92",
"given_name": "John",
"custom:tenantName": "Doe Corp",
"custom:tenantId": "d823522d-62a9-4bdb-b6d2-bfdc5db3499a",
"aud": "5uh5s9bfv5m9gk7ndt9e718da6",
"event_id": "c5685688-4963-11e9-b147-11ca7af91d44",
"token_use": "id",
"auth_time": "1552902847",
"exp": "Tue Mar 19 03:03:45 UTC 2019",
"iat": "Tue Mar 19 02:03:45 UTC 2019",
"family_name": "Doe",
"custom:environment": "dev",
"email": "john.doe@mailinator.com"
*/

export const handle = async (event : AWSLambda.APIGatewayEvent, context : AWSLambda.APIGatewayEventRequestContext, callback : any) => {
    const rds = new AWS.RDSDataService();
    console.log(`${ServiceName} - invite.handle - initialize`, JSON.stringify(event.requestContext));
    if (!event.requestContext.authorizer || !event.requestContext.authorizer.claims) {
        console.error(new Error("NoAuth"));
        callback(null, {statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({message: "Forbidden"})});
        return;
    }

    let claims: any = event.requestContext.authorizer.claims;
    console.log(`${ServiceName} - invite.handle - auth claims`, JSON.stringify(claims));

    if(claims["custom:group"] != 'AccountAdmin') {
        console.error(new Error("InvalidAuthData"));
        callback(null, {statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({message: "Unauthorized"})});
        return;
    }

    let poolId: string;
    let region: string = claims["custom:region"];
    let matches = claims.iss.match(new RegExp(`\/(${region}.*)`));
    // TODO: Match iss with userPoolId in process.env
    if (matches && matches.length > 0) {
        poolId = matches[1];
    } else {
        console.error(new Error("MissingPoolId"));
        callback(null, {statusCode: 400, headers: CORS_HEADERS, body:JSON.stringify({"message": "Invalid configuration"})});
        return;
    }

    let payload;
    try {
        payload = JSON.parse(event.body);
        console.log(`${ServiceName} - invite.handle - payload`, payload);
    } catch (error) {
        console.error(error);
        callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({"message": "Invalid payload"})});
        return;
    }

    if(claims["sub"] != payload["custom:source"]) {
        console.warn(`${ServiceName} - invite.handle - payload["custom:source"] did not match claims["sub"]`);
    }

    let ownerId = claims["sub"];
    let accountId = claims["custom:tenantId"];
    let group = payload["custom:group"];

    if(group == 'Admin') {
        group = 'AccountAdmin';
    }

    if(!group || AllowedGroups.indexOf(group) == -1) {
        console.error(new Error(`InvalidGroup - [${group}]`));
        callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({message: `InvalidGroup - [${group}]`})});
        return;
    }

    if (!payload.email || !payload.given_name || !payload.family_name) {
        console.error(new Error("InvalidPayload"));
        callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({"message": "Invalid payload"})});
    } else {
        const checkUserEmailSQL:AWS.RDSDataService.ExecuteStatementRequest = {
            database: DatabaseName,
            resourceArn: DBClusterId,
            secretArn: DBSecretARN,
            sql: `SELECT COUNT(*) AS num_existing FROM User WHERE email=:email`,
            parameters: [
                {name: "email", value: {stringValue: payload["email"]}}
            ]
        };
        console.log(`${ServiceName} - invite.handle - rds-checkEmailInUse REQ`);
        let countResponse: ExecuteStatementResponse = await rds.executeStatement(checkUserEmailSQL).promise();
        console.log(`${ServiceName} - invite.handle - rds-checkEmailInUse RES`, JSON.stringify(countResponse.records));
        if(countResponse.records[0][0]['longValue'] > 0) {
            console.error(new Error("EmailAlreadyExists"));
            callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({"message": "EmailAlreadyExists"})});
            return;
        }
        let userPool = new AWS.CognitoIdentityServiceProvider();
        let createUserRequest: AdminCreateUserRequest = {
            UserPoolId: poolId,
            UserAttributes : [
                {Name: "custom:group", Value: group},
                {Name: "custom:source", Value: ownerId},
                {Name: "given_name", Value: payload.given_name},
                {Name: "family_name", Value: payload.family_name},
                {Name: "custom:region", Value: process.env.region},
                {Name: "custom:tenantName",  Value: claims["custom:tenantName"] },
                {Name: "custom:environment", Value: process.env.environment},
                {Name: "custom:tenantId", Value: accountId},
                {Name: "email", Value: payload.email},
                {Name: "email_verified", Value: "True"}
            ],
            DesiredDeliveryMediums: ["EMAIL"],
            Username : payload.email
        }

        if (payload.phone_number) {
            createUserRequest.UserAttributes.push({Name: "phone_number", Value: payload.phone_number})
        }

        if (event.queryStringParameters && event.queryStringParameters["resend"] == "1") {
            createUserRequest.MessageAction = "RESEND"
        }

        console.log(`${ServiceName} - invite.handle - cognito-idp REQ`, createUserRequest);

        try {
            let timestamp = new Date().toISOString();
            let createUserResponse: AdminCreateUserResponse = await userPool.adminCreateUser(createUserRequest).promise();
            console.log(`${ServiceName} - invite.handle - cognito-idp RES`, createUserResponse);
            let cognitoSetGroupParams : AdminAddUserToGroupRequest = {
                GroupName : group,
                UserPoolId: poolId,
                Username  : createUserResponse.User.Username
            };
            await userPool.adminAddUserToGroup(cognitoSetGroupParams).promise();
            console.log(`${ServiceName} - invite.handle - RDS.Insert User`);
            const addUserSQL:AWS.RDSDataService.ExecuteStatementRequest = {
                database: DatabaseName,
                resourceArn: DBClusterId,
                secretArn: DBSecretARN,
                sql: `INSERT INTO User(id, ownerId, userGroup, accountId, email, phone_number, given_name, family_name, createdAt)
                    VALUES(:id, :ownerId, :userGroup, :accountId, :email, :phone_number, :given_name, :family_name, :createdAt)`,
                parameters: [
                    {name: "id", value: {stringValue: createUserResponse.User.Username}},
                    {name: "ownerId", value: {stringValue: ownerId}},
                    {name: "userGroup", value: {stringValue: group}},
                    {name: "accountId", value: {stringValue: accountId}},
                    {name: "email", value: {stringValue: payload["email"]}},
                    {name: "phone_number", value: payload.phone_number ? {stringValue: payload["phone_number"]}: {isNull: true}},
                    {name: "given_name", value: {stringValue: payload["given_name"] || null}},
                    {name: "family_name", value: {stringValue: payload["family_name"]}},
                    {name: "createdAt", value: {stringValue: timestamp}}

                ]
            };
            await rds.executeStatement(addUserSQL).promise();
            callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(createUserResponse)});
        } catch (error) {
            console.log(`${ServiceName} - invite.handle - cognito-idp RES`, error.message);
            callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: error.toString()})});
        }
    }
}