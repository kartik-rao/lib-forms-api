//# sourceMappingURL=./formentry.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

global['WebSocket'] = require('ws');
require('es6-promise').polyfill();
require('isomorphic-fetch');
import {AUTH_TYPE} from 'aws-appsync/lib/link/auth-link';
import  AWSAppSyncClient from 'aws-appsync';
import gql from 'graphql-tag';

import {APIGatewayEventRequestContext, SQSEvent, SQSRecord, SQSMessageAttributes, SQSMessageAttribute} from 'aws-lambda';
import _AWS from 'aws-sdk';
import XRay from 'aws-xray-sdk';
import { EntryMessageAttributeMap, EntryMessageBody } from './common/Entry';
const AWS = XRay.captureAWS(_AWS);

const GraphQlApiKey = process.env.graphqlApiKey;
const GraphQlUrl    = process.env.graphqlApiUrl;
const Region   = process.env.region;
const QueueUrl = process.env.sqs_entry_url;
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
    let entryQueue = new AWS.SQS({region: Region});
    let firehose = new AWS.Firehose({region: Region});

    // Set up Apollo client
    const client = new AWSAppSyncClient({
        url: GraphQlUrl,
        region: Region,
        auth: {
            type: AUTH_TYPE.API_KEY,
            apiKey: GraphQlApiKey
        },
        disableOffline: true
    });

    try {
        Env != "production" && console.log(`${ServiceName} - recordprocessor.handle - hydrated appsync client`);
        client.hydrated().then((client) => {
            const mutation = gql(`mutation AddFormEntry($input: AddFormEntryInput!) {
                addFormEntry(input: $input) {
                  id
                  formId
                  createdAt
                }
              }`);

            Env != "production" && console.log(`${ServiceName} - recordprocessor.handle - processing ${event.Records.length} entries`);
            event.Records.forEach(async (sqsRecord: SQSRecord) => {
                let Attributes = sqsRecord.messageAttributes as EntryMessageAttributeMap<SQSMessageAttribute>;
                let Entry = JSON.parse(sqsRecord.body) as EntryMessageBody;
                let {__RequestId, __RequestTimestamp} = Entry;

                let FormId = Attributes.FormId.stringValue;
                let StreamName = Attributes.StreamName.stringValue;
                let {receiptHandle} = sqsRecord;

                client.mutate({ mutation: mutation, variables: {input:{formId: FormId, data: Entry.Payload}}})
                .then(async (response) => {
                    let firehoseData = {...Entry, __EntryId : response.addFormEntry.id};

                    Env != "production" && console.log(`${ServiceName} - recordprocessor.handle - mutation complete, sending entry [${firehoseData.__EntryId}] to firehose`);
                    await firehose.putRecord({DeliveryStreamName: StreamName, Record: {Data : JSON.stringify(firehoseData) + "\n"}}).promise();

                    Env != "production" && console.log(`${ServiceName} - recordprocessor.handle - firehose delivery complete, deleting message [${receiptHandle}]`);
                    await entryQueue.deleteMessage({QueueUrl: QueueUrl, ReceiptHandle: receiptHandle}).promise();
                    callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "OK", status:202, id: __RequestId, timestamp: __RequestTimestamp, data: response.addFormEntry})});
                }).catch((error) => {
                    console.log(`${ServiceName} - recordprocessor.handle appsync.mutation handler ERROR`, error);
                    callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "InternalServerError", status: 500, requestId: __RequestId})});
                });
            });
        });
    } catch (error) {
        console.log(`${ServiceName} - recordprocessor.handle appsync.client hydration ERROR`, error);
    }
}