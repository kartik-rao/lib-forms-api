//# sourceMappingURL=./updateSolutionInstance.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import {generateClient, getNodesAt} from "./gqlClient";
import gql from 'graphql-tag';

const Env                 = process.env.environment;
const ServiceName         = process.env.serviceName;
const VendorApiUrl        = process.env.vendorApiUrl;
const VendorApiToken      = process.env.vendorApiToken;
const DBClusterArn        = process.env.dbClusterArn;
const DBSecretARN         = process.env.dbClusterSecretArn;
const DatabaseName        = process.env.databaseName;
const PartnerId           = process.env.vendorAccountId;

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

    let payload;
    try {
        payload = JSON.parse(event.body);
        console.log(`${ServiceName} - invite.handle - payload`, payload);
    } catch (error) {
        console.error(error);
        callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({"message": "Invalid payload"})});
        return;
    }

    isDebug && console.log(`${ServiceName} - updateSolutionInstance.handle init`);
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

    isDebug && console.log(`${ServiceName} - updateSolutionInstance.handle getExternalId`);
    let integrationUser : any;
    // Check if we have already created a tenant in the vendor
    try {
        integrationUser = await dataApi.query({
            sql: `SELECT ac.name as 'accountName', ai.id, ai.externalId, ai.createdAt from AccountIntegration ai, Account ac WHERE ac.id = :tenantId AND ai.accountId = ac.id`,
            parameters: [
                { tenantId: tenantId }
            ]
        });
    } catch (error) {
        callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "GetIntegrationUserError", status: 500, requestId: requestId})});
        return;
    }

    if (integrationUser && integrationUser.records && integrationUser.records.length > 0) {
        let vendorAdminClient = generateClient(VendorApiUrl, VendorApiToken);
        let userId = integrationUser.records[0].externalId;
        let accessToken;

        try {
            // This is used to authorize the updateSolutionInstance mutation on behalf of the tenant
            // https://tray.io/documentation/embedded/full-api-ref/user-actions/authorize-user/
            isDebug && console.log(`${ServiceName} - updateSolutionInstance.handle requestAccessToken`);
            let accessTokenMutation = gql`
            mutation {
                authorize(input: {userId: "${userId}"}) {
                    accessToken
                }
            }`;

            let tokenResponse = await vendorAdminClient.mutate({mutation: accessTokenMutation});
            accessToken = tokenResponse.data.authorize.accessToken;
        } catch (error) {
            callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "GenerateAccessTokenError", status: 500, requestId: requestId})});
            return;
        }

        try {
            // Create a tenant specific client
            let vendorUserClient = generateClient(VendorApiUrl, accessToken);
            // Create the solution
            // https://tray.io/documentation/embedded/full-api-ref/create-solution-instance/
            isDebug && console.log(`${ServiceName} - updateSolutionInstance.handle updateSolutionInstance`);
            let updateSolutionInstanceMutation = gql`
                mutation {
                    updateSolutionInstance(input: {
                        solutionInstanceId: "${payload.instanceId}",
                        instanceName: "${payload.instanceName}",
                        enabled: true
                    }) {
                        solutionInstance {
                            id
                            name
                            enabled
                            created
                        }
                    }
                }`;
            let response = await vendorUserClient.mutate({mutation: updateSolutionInstanceMutation});
            callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(response.data.updateSolutionInstance)})
        } catch (error) {
            callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "CreateSolutionInstanceError", status: 500, requestId: requestId})});
        }
    } else {
        callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({message: "NoIntegrationUserError", status: 400, requestId: requestId})});
    }
}