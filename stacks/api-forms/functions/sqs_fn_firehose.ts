//# sourceMappingURL=./sqs_fn_firehose.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, SQSEvent, SQSRecord, SQSMessageAttributes, SQSMessageAttribute} from 'aws-lambda';
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

    return new Promise(async (resolve, reject) => {
        try {
            let Entry = JSON.parse(sqsRecord.body) as EntryMessageBody;
            let {__RequestId} = Entry;
            let firehoseData = {...Entry, __EntryId : __RequestId};
            let fhResponse = await firehose.putRecord({DeliveryStreamName: StreamName, Record: {Data : JSON.stringify(firehoseData) + "\n"}}).promise();
            await sqs.deleteMessage({QueueUrl: QueueUrl, ReceiptHandle: sqsRecord.receiptHandle}).promise();
            isDebug && console.log(`${ServiceName} - sqs_fn_firehose.process - record [${__RequestId}] stream [${StreamName}] trace [${fhResponse.RecordId}] OK`);
        } catch (error) {
            console.error(error, JSON.stringify({stream: StreamName, sqsReceiptHandle: sqsRecord.receiptHandle}));
        }
        resolve();
    });
}

export const handle = async (event : SQSEvent, context : APIGatewayEventRequestContext, callback : any) => {
    try {
        isDebug && console.log(`${ServiceName} - sqs_fn_firehose.handle - Processing [${event.Records.length}] records`);
        await Promise.all(event.Records.map(processMessage));
        isDebug && console.log(`${ServiceName} - sqs_fn_firehose.handle - OK`);
        callback(null, {statusCode: 200, body: JSON.stringify({message: `OK - ${context.requestId}`, status:200})});
    } catch (error) {
        callback(error);
        console.log(`${ServiceName} - sqs_fn_firehose.handle SQS.event.Records iteration ERROR`, error);
    }
}