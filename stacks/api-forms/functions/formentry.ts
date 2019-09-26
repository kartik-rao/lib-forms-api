//# sourceMappingURL=./formentry.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import {EntryMessageAttributeMap, EntryMessageBody} from "./common";

const Env                 = process.env.environment;
const ServiceName         = process.env.databaseName;
const Region              = process.env.region;
const EntryQueueUrl       = process.env.sqs_entry_url;
const FirehoseQueueUrl    = process.env.sqs_firehose_url;
const IntegrationQueueUrl = process.env.sqs_integration_url;
const AnalyticsQueueUrl   = process.env.sqs_integration_url;

const isDebug = Env !== "production";

const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json"
}

import _AWS from 'aws-sdk';
import XRay from 'aws-xray-sdk';
const AWS = XRay.captureAWS(_AWS);
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

import {getDeliveryStreamName} from "../../api-streams/functions/common";
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

    const utcTimestamp = dayjs(requestTime, 'DD/MMM/YYYY:HH:mm:ss ZZ').utc().format();
    let queueData: EntryMessageBody = {
        __RequestId: requestId,
        __RequestTimestamp: utcTimestamp,
        __RequestIpAddress : identity.sourceIp,
        __RequestUserAgent: identity.userAgent,
        Payload : event.body
    }

    if (event.queryStringParameters && event.queryStringParameters.echo) {
        callback(null, {statusCode: 201, headers: CORS_HEADERS, body: JSON.stringify(queueData)});
        return;
    }

    let sqs = new AWS.SQS({region: Region});
    let baseMessage = {MessageBody: JSON.stringify(queueData),  MessageAttributes: attributes};
    isDebug && console.log(`${ServiceName} - formentry.handle.sendMessageAsync SEND`);

    try {
        await Promise.all([
            sqs.sendMessage({...baseMessage,  QueueUrl: EntryQueueUrl}).promise(),
            sqs.sendMessage({...baseMessage,  QueueUrl: FirehoseQueueUrl}).promise(),
            sqs.sendMessage({...baseMessage,  QueueUrl: AnalyticsQueueUrl}).promise(),
            sqs.sendMessage({...baseMessage,  QueueUrl: IntegrationQueueUrl}).promise()
        ]);
        callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "OK", status:202, id: requestId, timestamp: utcTimestamp})});
    } catch (error) {
        console.log(`${ServiceName} - formentry.handle ERROR - SQS.parallel`, error);
        callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "InternalServerError", status: 500, requestId: requestId})});
    }
}