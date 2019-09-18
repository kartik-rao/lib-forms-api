//# sourceMappingURL=./createstream.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda';
import * as AWS from "aws-sdk";
import {getDeliveryStreamName, getDeliveryStreamPrefix, getDeliveryStreamErrorPrefix} from "./common/firehose";
import { ExecuteStatementResponse } from 'aws-sdk/clients/rdsdataservice';

const Region        = process.env.region;
const ServiceName   = process.env.serviceName;
const UserBucket    = process.env.s3_user_bucket;
const LambdaRoleArn = process.env.lambdaRoleArn;
const DBClusterId   = process.env.dbClusterArn;
const DBSecretARN   = process.env.dbClusterSecretArn;

const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json"
}

export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {
    if (!event.requestContext.authorizer || !event.requestContext.authorizer.claims) {
        console.error(new Error("NoAuth"));
        callback(null, {statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({message: "Forbidden"})});
        return;
    }

    let claims: any = event.requestContext.authorizer.claims;
    console.log(`${ServiceName} - createstream.handle - auth claims`, JSON.stringify(claims));

    let tenantId = claims["custom:tenantId"];
    if (!tenantId || tenantId.length == 0) {
        console.error(new Error("NoTenantId"));
        callback(null, {statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({message: "Forbidden"})});
        return;
    }
    let group = claims["custom:group"];
    if (!group || group.length == 0) {
        console.error(new Error("NoGroup"));
        callback(null, {statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({message: "Forbidden"})});
        return;
    }

    if (group != "AccountEditor" || group !="Admin" || group !="AccountAdmin") {
        console.error(new Error(`Group ${group} is not authorized to create stream`));
        callback(null, {statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({message: "Forbidden"})});
        return;
    }

    let {requestId, stage, requestTime} = event.requestContext;
    let {formId} = event.pathParameters;

    try {
        const rds = new AWS.RDSDataService();
        const checkUserEmailSQL:AWS.RDSDataService.ExecuteStatementRequest = {
            database: ServiceName,
            resourceArn: DBClusterId,
            secretArn: DBSecretARN,
            sql: `SELECT COUNT(*) AS form_count FROM Form WHERE id=:id AND accountId=:accountId`,
            parameters: [
                {name: "id", value: {stringValue: formId}},
                {name: "accountId", value: {stringValue: tenantId}},
            ]
        };
        console.log(`${ServiceName} - createstream.handle - rds-checkEmailInUse REQ`);
        let countResponse: ExecuteStatementResponse = await rds.executeStatement(checkUserEmailSQL).promise();
        console.log(`${ServiceName} - createstream.handle - rds-checkEmailInUse RES`, JSON.stringify(countResponse.records));
        if(countResponse.records[0][0]['longValue'] == 0) {
            console.error(new Error("InvalidFormId"));
            callback(null, {statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({"message": `Form [${formId}] not found in tenant [${tenantId}]`})});
            return;
        }
    } catch (error) {
        console.error(error);
        callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "InternalServerError"})});
    }

    let firehose = new AWS.Firehose({region: Region});
    const streamName = getDeliveryStreamName(ServiceName, stage, tenantId, formId);
    const streamPrefix = getDeliveryStreamPrefix(tenantId, formId);
    const streamErrorPrefix = getDeliveryStreamErrorPrefix(tenantId, formId);

    try {
        let streams = await firehose.listDeliveryStreams({ExclusiveStartDeliveryStreamName: streamName}).promise();
        if (!streams.DeliveryStreamNames || streams.DeliveryStreamNames.length > 0) {
            await firehose.createDeliveryStream({
                DeliveryStreamName: streamName,
                DeliveryStreamType: "DirectPut",
                S3DestinationConfiguration: {
                    Prefix: streamPrefix,
                    ErrorOutputPrefix: streamErrorPrefix,
                    BucketARN : `arn:aws:s3:::${UserBucket}`,
                    RoleARN: LambdaRoleArn
                },
                Tags : [
                    { Key: "ServiceName",  Value: ServiceName},
                    { Key: "Stage",  Value: stage},
                    { Key: "TenantId",  Value: tenantId}
                ]
            }).promise();
            console.log(`${ServiceName} - createstream.handle created delivery stream ${streamName}`);
            callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "OK", status:202, id: requestId, timestamp: requestTime})});
        } else {
            console.log(`${ServiceName} - createstream.handle delivery stream already exists ${streamName}`);
            callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "OK", status:304, id: requestId, timestamp: requestTime})});
        }
    } catch (e) {
        console.log(`${ServiceName} - createstream.handle ERROR creating Stream ${streamName}`, e);
        callback(null, {statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({message: "InternalServerError", status: 500, requestId: requestId})});
    }
}