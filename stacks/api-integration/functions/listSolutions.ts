//# sourceMappingURL=./listUserIntegrations.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import {generateClient, getNodesAt} from "./gqlClient";
import gql from 'graphql-tag';

const Env                 = process.env.environment;
const ServiceName         = process.env.serviceName;
const VendorApiUrl        = process.env.vendorApiUrl;
const VendorApiToken      = process.env.vendorApiToken;

const isDebug = Env !== "production";

const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json"
}

export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {

    isDebug && console.log(`${ServiceName} - listSolutions.handle init`);
    if (!event.requestContext.authorizer || !event.requestContext.authorizer.claims) {
        console.error(new Error("NoAuth"));
        callback(null, {statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({message: "Forbidden"})});
        return;
    }

    let {requestId} = event.requestContext;
    let payload;

    try {
        payload = JSON.parse(event.body);
        console.log(`${ServiceName} - listSolutions.handle - payload`, payload);
        if(!payload.tags) {
            payload.tags = [];
        }
        if(!payload.after) {
            // https://tray.io/documentation/embedded/intro-to-the-apis/pagination/
            payload.after = null;
        }
    } catch (error) {
        console.error(error);
        callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({"message": "Invalid payload"})});
        return;
    }

    // https://tray.io/documentation/embedded/full-api-ref/list-solutions/

    isDebug && console.log(`${ServiceName} - listSolutions.handle list vendor solutions`);
    let vendorAdminClient = generateClient(VendorApiUrl, VendorApiToken);
    let query = gql`
        query {
            viewer {
                solutions (criteria: {tags: payload.tags}, after: payload.after){
                    edges {
                        node {
                            id
                            title
                            description
                            configSlots {
                                externalId
                                title
                                defaultValue
                            }
                            tags
                            customFields {
                                key
                                value
                            }
                        }
                        cursor
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
    }`;

    try {
        let solutions = await vendorAdminClient.query({query});
        callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(getNodesAt(solutions, 'data.viewer.solutions.edges'))})
    } catch (error) {
        callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "ListSolutionsError", status: 500, requestId: requestId})});
    }
}