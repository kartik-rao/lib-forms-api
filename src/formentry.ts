//# sourceMappingURL=./formentry.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';

const Region   = process.env.region;
const QueueUrl = process.env.sqs_entry_url;
const ServiceName = process.env.serviceName;
const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json"
}

import * as AWS from "aws-sdk";

export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {
    let {requestId, stage, identity, requestTime} = event.requestContext;

    if(!event.body) {
        callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({message: "BadRequest"})});
        return;
    }

    let queueData = {
        stage: stage,
        requestId: requestId,
        requestTime: requestTime,
        ip : identity.sourceIp,
        userAgent: identity.userAgent,
        payload : event.body
    }

    if (event.queryStringParameters && event.queryStringParameters.echo) {
        callback(null, {statusCode: 201, headers: CORS_HEADERS, body: JSON.stringify(queueData)});
        return;
    }

    let entryQueue = new AWS.SQS({region: Region});
    try {
        await entryQueue.sendMessage({MessageBody: JSON.stringify(queueData),  QueueUrl: QueueUrl}).promise();
        callback(null, {statusCode: 201, headers: CORS_HEADERS, body: JSON.stringify({message: "OK"})});
    } catch (e) {
        console.log(`${ServiceName} - formrender.handle ERROR`, e);
        callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "InternalServerError"})});
    }
}