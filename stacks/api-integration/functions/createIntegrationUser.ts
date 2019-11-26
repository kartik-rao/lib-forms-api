//# sourceMappingURL=./createIntegrationTenant.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import _AWS from 'aws-sdk';
import XRay from 'aws-xray-sdk';
import {generateClient} from "./gqlClient";
import gql from 'graphql-tag';

import AWSAppSyncClient from 'aws-appsync';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';

const uuid = require('uuid/v4');

const AWS = XRay.captureAWS(_AWS);

const Env                 = process.env.environment;
const Region              = process.env.region;
const ServiceName         = process.env.serviceName;
const GraphQlApiKey       = process.env.graphqlApiKey;
const GraphQlUrl          = process.env.graphqlApiUrl;
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

    isDebug && console.log(`${ServiceName} - createIntegrationTenant.handle get integration user`);

    let integrationUser : any;

    try {
        integrationUser = await dataApi.query({
            sql: `SELECT ac.name as 'accountName', ai.id, ai.externalId, ai.createdAt from AccountIntegration ai, Account ac WHERE ac.id = :tenantId AND ai.accountId = ac.id`,
            parameters: [
                { tenantId: event.pathParameters.tenantId }
            ]
        });
    } catch (error) {
        callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "ListAccountIntegrationError", status: 500, requestId: requestId})});
    }

    if (integrationUser && integrationUser.records && integrationUser.records.length > 0) {
        isDebug && console.log(`${ServiceName} - createIntegrationTenant.handle OK - UserExists`);
        let data = integrationUser.records[0];
        callback(null, {statusCode: 304, headers: CORS_HEADERS, body: JSON.stringify({
            id   : data.id,
            name: data.accountName,
            externalId : data.externalId
        })});
        return;
    } else {
        isDebug && console.log(`${ServiceName} - createIntegrationTenant.handle - CreateUser - loading account`);
        let accountResponse: any;
        try {
            accountResponse = await dataApi.query({
                sql: `SELECT ac.name, ac.id, ac.active from Account ac WHERE ac.id = :tenantId`,
                parameters: [
                    { tenantId: event.pathParameters.tenantId }
                ]
            });
        } catch (error) {
            callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "LoadAccountError", status: 500, requestId: requestId})});
            return;
        }

        if (accountResponse && accountResponse.records && accountResponse.records.length > 0) {
            let externalUser;
            try {
                let account = accountResponse.records[0];
                let vendorAdminClient = generateClient(VendorApiUrl, VendorApiToken);
                isDebug && console.log(`${ServiceName} - createIntegrationTenant.handle - CreateUser - creating vendor user`);
                let mutation = gql`
                    mutation {
                        createExternalUser(input: {name: "${account.name}", externalUserId: "${account.id}"}) {
                            userId
                        }
                }`;
                let createUserResponse = await vendorAdminClient.mutate({mutation});
                externalUser = createUserResponse.data["createExternalUser"];
            } catch (error) {
                callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "CreateExternalUserError", status: 500, requestId: requestId})});
                return;
            }

            try {
                isDebug && console.log(`${ServiceName} - createIntegrationTenant.handle - CreateUser - saving vendor user`);
                // Set up Apollo client
                const appsync = new AWSAppSyncClient({
                    url: GraphQlUrl,
                    region: Region,
                    auth: {
                        type: AUTH_TYPE.API_KEY,
                        apiKey: GraphQlApiKey
                    },
                    disableOffline: true
                });

                const variables = {input:{id: uuid(), accountId: tenantId, externalId: externalUser.userId}};
                const saveAccountIntegration = gql(`mutation SaveAccountIntegration($input: SaveAccountIntegrationInput!) {
                    saveAccountIntegration(input: $input) {
                    id
                    name
                    externalId
                    createdAt
                    }
                }`);

                let saveResponse = await appsync.mutate({mutation: saveAccountIntegration, variables: variables});
                isDebug && console.log(`${ServiceName} - createIntegrationTenant.handle - CreateUser - OK`);
                callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(saveResponse.data["saveAccountIntegration"])});
            } catch (error) {
                callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "SaveAccountIntegrationError", status: 500, requestId: requestId})});
                return;
            }
        } else {
            callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({message: "InvalidAccountError", status: 400, requestId: requestId})});
        }
    }
}