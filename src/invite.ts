//# sourceMappingURL=./invite.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import * as _ from "lodash";
import {DBClient} from "./dbclient";
const uuid = require('uuid/v4');
import * as AWS from 'aws-sdk';
import { AdminGetUserRequest, AdminCreateUserRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";


const ServiceName = process.env.serviceName || 'dev-formsgraphql-invite';
const DDB_TABLE : string = process.env.table_app_data || 'formsgraphql_dev_masterdata';

const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}

export const handle = async (event : AWSLambda.APIGatewayEvent, context : any, callback : any) => {
    console.log(`${ServiceName} - invite.handle`, event);
    callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "it works"})});
}