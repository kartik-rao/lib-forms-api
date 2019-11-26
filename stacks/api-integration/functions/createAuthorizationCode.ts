//# sourceMappingURL=./createAuthorizationCode.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';

import gql from 'graphql-tag';
import {generateClient} from "./gqlClient";

const Env                 = process.env.environment;
const ServiceName         = process.env.serviceName;
const VendorApiUrl        = process.env.vendorApiUrl;
const VendorApiToken      = process.env.vendorApiToken;
const DBClusterArn        = process.env.dbClusterArn;
const DBSecretARN         = process.env.dbClusterSecretArn;
const DatabaseName        = process.env.databaseName;

const dataApi = require('data-api-client')({
    secretArn: DBSecretARN,
    resourceArn: DBClusterArn,
    database: DatabaseName
});

const isDebug = Env !== "production";

const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json"
}


export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {
    let {requestId, stage, identity, requestTime} = event.requestContext;
    let {tenantId} = event.pathParameters;

    isDebug && console.log(`${ServiceName} - createAuthorizationCode.handle init`);
    if (!event.requestContext.authorizer || !event.requestContext.authorizer.claims) {
        console.error(new Error("NoAuth"));
        callback(null, {statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({message: "Forbidden"})});
        return;
    }
    let claims: any = event.requestContext.authorizer.claims;
    let isAdmin = claims["group"] == "Admin";

    if(claims["custom:tenantId"] !== tenantId && !isAdmin) {
        console.error(new Error("TenantMismatchError"));
        callback(null, {statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({message: "Forbidden"})});
        return;
    }

    isDebug && console.log(`${ServiceName} - createAuthorizationCode.handle get integration user`);
    let integrationUser : any;

    // Check if we have already created a tenant in the vendor
    try {
        integrationUser = await dataApi.query({
            sql: `SELECT ac.name as 'accountName', ai.id, ai.externalId, ai.createdAt from AccountIntegration ai, Account ac WHERE ac.id = :tenantId AND ai.accountId = ac.id`,
            parameters: [
                { tenantId: event.pathParameters.tenantId }
            ]
        });
    } catch (error) {
        callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "ListAccountIntegrationError", status: 500, requestId: requestId})});
        return;
    }

    if (integrationUser && integrationUser.records && integrationUser.records.length > 0) {
        isDebug && console.log(`${ServiceName} - createAuthorizationCode.handle getAuthorizationCode`);
        let vendorAdminClient = generateClient(VendorApiUrl, VendorApiToken);
        let userId = integrationUser.records[0].externalId;
        let mutation = gql`
        mutation {
            generateAuthorizationCode(input: {userId: "${userId}"}) {
                authorizationCode
            }
        }`;
        let codeResponse = await vendorAdminClient.mutate({mutation});
        callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(codeResponse.data["generateAuthorizationCode"])});
    } else {
        callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({message: "InvalidAccountError", status: 400, requestId: requestId})});
    }
}