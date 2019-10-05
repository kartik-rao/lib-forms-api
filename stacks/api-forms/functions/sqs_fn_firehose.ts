//# sourceMappingURL=./sqs_fn_firehose.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import { APIGatewayEventRequestContext, SQSEvent, SQSMessageAttribute, SQSRecord } from 'aws-lambda';
import _AWS from 'aws-sdk';
import XRay from 'aws-xray-sdk';
import { EntryMessageAttributeMap, EntryMessageBody } from './common';
const AWS = XRay.captureAWS(_AWS);

const Region   = process.env.region;
const QueueUrl = process.env.sqs_firehose_url;
const ServiceName = process.env.serviceName;
const Env = process.env.environment;

const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*",       // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json"
}

const firehose = new AWS.Firehose({region: Region});
const sqs = new AWS.SQS({region: Region});
const isDebug = Env != "production";

const processMessage = (sqsRecord: SQSRecord) => {
    let Attributes = sqsRecord.messageAttributes as EntryMessageAttributeMap<SQSMessageAttribute>;
    let StreamName = Attributes.StreamName.stringValue;

    // No need to delete, AWS handles message deletion
    let Entry = JSON.parse(sqsRecord.body) as EntryMessageBody;
    let {__RequestId} = Entry;
    let firehoseData = {...Entry, __EntryId : __RequestId};

    return Promise.all([
        firehose.describeDeliveryStream({DeliveryStreamName: StreamName}).promise(),
        firehose.putRecord({DeliveryStreamName: StreamName, Record: {Data : JSON.stringify(firehoseData) + "\n"}}).promise()
    ]);
}

export const handle = async (event : SQSEvent, context : APIGatewayEventRequestContext, callback : any) => {
    try {
        isDebug && console.log(`${ServiceName} - sqs_fn_firehose.handle - Processing [${event.Records.length}] records`);
        await Promise.all(event.Records.map(processMessage));
        isDebug && console.log(`${ServiceName} - sqs_fn_firehose.handle - OK`);
        callback(null, {statusCode: 200, body: JSON.stringify({message: `OK - ${context.requestId}`, status:200})});
    } catch (error) {
        console.log(`${ServiceName} - sqs_fn_firehose.handle SQS.event.Records iteration ERROR`, error);
        callback(error);
    }
}