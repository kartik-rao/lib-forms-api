//# sourceMappingURL=./formentry.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import * as AWS from "aws-sdk";

const Region   = process.env.region;
const QueueUrl = process.env.sqs_entry_url;
const ServiceName = process.env.serviceName;
const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*",       // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json"
}

export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {
    let entryQueue = new AWS.SQS({region: Region});
    let firehose = new AWS.Firehose({region: Region});
    try {
        let messages = await entryQueue.receiveMessage({
            VisibilityTimeout: 120, 
            MaxNumberOfMessages:10, 
            QueueUrl: QueueUrl, 
            AttributeNames : ["StreamName"] }).promise();

        messages.Messages.forEach(async (message) => {
            let {StreamName} = message.Attributes;
            try {
                await firehose.putRecord({DeliveryStreamName: StreamName, Record: {Data : message.Body}}).promise();
                await entryQueue.deleteMessage({QueueUrl: QueueUrl, ReceiptHandle: message.ReceiptHandle}).promise();
                callback(null, {statusCode: 200, body: JSON.stringify({status: "OK"}), headers: CORS_HEADERS})
            } catch (error) {
                console.log(`${ServiceName} - recordprocessor.handle message ERROR`, error);
            }
        })
    } catch (error) {
        console.log(`${ServiceName} - recordprocessor.handle queue ERROR`, error);
    }
}