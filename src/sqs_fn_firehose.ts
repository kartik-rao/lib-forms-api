//# sourceMappingURL=./sqs_fn_firehose.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, SQSEvent, SQSRecord, SQSMessageAttributes, SQSMessageAttribute} from 'aws-lambda';
import _AWS from 'aws-sdk';
import XRay from 'aws-xray-sdk';
import { EntryMessageAttributeMap, EntryMessageBody } from './common/Entry';
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

const asMap = (attrs: SQSMessageAttributes) : {[name: string] : string} => {
    let map = {};
    Object.keys(attrs).map((key) => {
        map[key] = attrs[key].stringValue;
    });
    return map;
}

export const handle = async (event : SQSEvent, context : APIGatewayEventRequestContext, callback : any) => {
    let sqs = new AWS.SQS({region: Region});
    let firehose = new AWS.Firehose({region: Region});

    try {
        Env != "production" && console.log(`${ServiceName} - putfirehose.handle - processing ${event.Records.length} entries`);
        event.Records.forEach(async (sqsRecord: SQSRecord) => {
            let Attributes = sqsRecord.messageAttributes as EntryMessageAttributeMap<SQSMessageAttribute>;
            let StreamName = Attributes.StreamName.stringValue;

            let Entry = JSON.parse(sqsRecord.body) as EntryMessageBody;
            let {__RequestId, __RequestTimestamp} = Entry;
            let firehoseData = {...Entry, __EntryId : __RequestId};
            try {
                let response = await firehose.putRecord({DeliveryStreamName: StreamName, Record: {Data : JSON.stringify(firehoseData) + "\n"}}).promise();
                await sqs.deleteMessage({QueueUrl: QueueUrl, ReceiptHandle: sqsRecord.receiptHandle}).promise();
                callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "OK", status:202, id: __RequestId, timestamp: __RequestTimestamp, data: response})});
            } catch (error) {
                console.error(error, JSON.stringify({stream: StreamName, sqsRequestId: __RequestId}) )
            }
        });
        callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: `OK - ${context.requestId}`, status:200})});
    } catch (error) {
        console.log(`${ServiceName} - putfirehose.handle SQS.event.Records iteration ERROR`, error);
    }
}