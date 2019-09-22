//# sourceMappingURL=./sqs_fn_appsync.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

global['WebSocket'] = require('ws');
require('es6-promise').polyfill();
require('isomorphic-fetch');

import AWSAppSyncClient from 'aws-appsync';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { APIGatewayEventRequestContext, SQSEvent, SQSMessageAttribute, SQSRecord } from 'aws-lambda';
import _AWS from 'aws-sdk';
import XRay from 'aws-xray-sdk';
import gql from 'graphql-tag';
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

const isDebug = Env !== "production";

export const handle = async (event : SQSEvent, context : APIGatewayEventRequestContext, callback : any) => {
    let entryQueue = new AWS.SQS({region: Region});
    let firehose = new AWS.Firehose({region: Region});

    // Set up Apollo client
    const appsync = new AWSAppSyncClient({
        url: GraphQlUrl,
        region: Region,
        auth: {
            type: AUTH_TYPE.API_KEY,
            apiKey: GraphQlApiKey
        },
        disableOffline: true
    });

    const mutation = gql(`mutation AddFormEntry($input: AddFormEntryInput!) {
        addFormEntry(input: $input) {
          id
          formId
          createdAt
        }
    }`);

    try {

        isDebug && console.log(`${ServiceName} - sqs_fn_appsync.handle - processing ${event.Records.length} entries`);
        let client = await appsync.hydrated();

        let writeRowAndDeleteMessage = (sqsRecord: SQSRecord) : Promise<any>  => {
            let Attributes = sqsRecord.messageAttributes as EntryMessageAttributeMap<SQSMessageAttribute>;
            let Body = JSON.parse(sqsRecord.body) as EntryMessageBody;
            let {__RequestId} = Body;
            let FormId = Attributes.FormId.stringValue;
            const variables = {input:{id:__RequestId, formId: FormId, data: Body.Payload}};

            return Promise.all([
                client.mutate({mutation: mutation, variables: variables}),
                entryQueue.deleteMessage({QueueUrl: QueueUrl, ReceiptHandle: sqsRecord.receiptHandle}).promise()
            ]);
        };

        let rowPromises : Promise<any>[] = event.Records.map((r) => {
            return writeRowAndDeleteMessage(r)
        });

        await Promise.all(rowPromises);
        callback(null, {statusCode: 200, body: JSON.stringify({message:"OK", requestId: context.requestId})});

    } catch (error) {
        console.log(`${ServiceName} - sqs_fn_appsync.handle ERROR`, error);
        callback(null, {statusCode: 500, body: JSON.stringify({message: "InternalServerError", status: 500, requestId: context.requestId})});
    }
}