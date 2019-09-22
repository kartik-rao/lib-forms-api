//# sourceMappingURL=./formentry.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import {EntryMessageAttributeMap, EntryMessageBody} from "./common/Entry";

const Region        = process.env.region;
const QueueUrl      = process.env.sqs_entry_url;
const ServiceName   = process.env.serviceName;

const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json"
}

import _AWS from 'aws-sdk';
import XRay from 'aws-xray-sdk';
const AWS = XRay.captureAWS(_AWS);

import {getDeliveryStreamName} from "./common/firehose";
import { MessageAttributeValue } from 'aws-sdk/clients/sqs';

export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {
    let {requestId, stage, identity, requestTime} = event.requestContext;
    let {formId, tenantId} = event.pathParameters;

    if(!event.body) {
        callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({message: "BadRequest"})});
        return;
    }

    const streamName = getDeliveryStreamName(stage, tenantId, formId);
    let attributes: EntryMessageAttributeMap<MessageAttributeValue> = {
        "Region"     : {DataType: "String", StringValue: Region},
        "Service"    : {DataType: "String", StringValue: ServiceName},
        "Stage"      : {DataType: "String", StringValue: stage},
        "FormId"     : {DataType: "String", StringValue: formId},
        "TenantId"   : {DataType: "String", StringValue: tenantId},
        "StreamName" : {DataType: "String", StringValue: streamName}
    };

    let queueData: EntryMessageBody = {
        __RequestId: requestId,
        __RequestTimestamp: requestTime,
        __RequestIpAddress : identity.sourceIp,
        __RequestUserAgent: identity.userAgent,
        Payload : event.body
    }

    if (event.queryStringParameters && event.queryStringParameters.echo) {
        callback(null, {statusCode: 201, headers: CORS_HEADERS, body: JSON.stringify(queueData)});
        return;
    }

    let entryQueue = new AWS.SQS({region: Region});
    try {
        await entryQueue.sendMessage({MessageBody: JSON.stringify(queueData),  QueueUrl: QueueUrl, MessageAttributes: attributes}).promise();
        callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "OK", status:202, id: requestId, timestamp: requestTime})});
    } catch (e) {
        console.log(`${ServiceName} - formrender.handle ERROR`, e);
        callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "InternalServerError", status: 500, requestId: requestId})});
    }
}