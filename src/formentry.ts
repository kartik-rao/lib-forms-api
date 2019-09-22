//# sourceMappingURL=./formentry.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import {EntryMessageAttributeMap, EntryMessageBody} from "./common/Entry";
import {parallel} from "async";

const Env                 = process.env.environment;
const ServiceName         = process.env.serviceName;
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

    let sqs = new AWS.SQS({region: Region});
    let baseMessage = {MessageBody: JSON.stringify(queueData),  MessageAttributes: attributes};

    let sendMessageAsync = (message: any) => {
        return async (callback) => {
            try {
                isDebug && console.log(`${ServiceName} - formentry.handle.sendMessageAsync SEND [${message.QueueUrl}]`);
                let response = await sqs.sendMessage(message).promise();
                callback(null, response);
            } catch (error) {
                console.log(`${ServiceName} - formentry.handle.sendMessageAsync ERROR [${message.QueueUrl}]`, error);
                callback(error);
            }
        }
    };

    parallel({
        entry: sendMessageAsync({...baseMessage,  QueueUrl: EntryQueueUrl}),
        firehose: sendMessageAsync({...baseMessage,  QueueUrl: FirehoseQueueUrl}),
        analytics: sendMessageAsync({...baseMessage,  QueueUrl: AnalyticsQueueUrl}),
        integration: sendMessageAsync({...baseMessage,  QueueUrl: IntegrationQueueUrl})
    }, (err) => {
        if(err) {
            console.log(`${ServiceName} - formentry.handle ERROR - SQS.parallel`, err);
            callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "InternalServerError", status: 500, requestId: requestId})});
        } else {
            callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "OK", status:202, id: requestId, timestamp: requestTime})});
        }
    });
}