//# sourceMappingURL=./createstream.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda';
import _AWS from 'aws-sdk';
import { ExecuteStatementResponse } from 'aws-sdk/clients/rdsdataservice';
import XRay from 'aws-xray-sdk';
import { getDeliveryStreamErrorPrefix, getDeliveryStreamName, getDeliveryStreamPrefix } from "./common";
const AWS = XRay.captureAWS(_AWS);

const Region        = process.env.region;
const ServiceName   = process.env.serviceName;
const UserBucket    = process.env.s3_user_bucket;
const RoleArn       = process.env.kinesisAccessRole;
const DBClusterId   = process.env.dbClusterArn;
const DBSecretARN   = process.env.dbClusterSecretArn;
const DatabaseName  = process.env.databaseName;

const CORS_HEADERS = {
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json"
}

export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {
    if (!event.requestContext.authorizer || !event.requestContext.authorizer.claims) {
        console.error(new Error("NoAuth"));
        callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "Unauthorized", status:401})});
        return;
    }

    let claims: any = event.requestContext.authorizer.claims;
    console.log(`${ServiceName} - createstream.handle - auth claims`, JSON.stringify(claims));

    let group = claims["custom:group"];
    if (!group || group.length == 0) {
        console.error(new Error("NoGroup"));
        callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "Forbidden", status:403})});
        return;
    }

    if (!(group == "AccountEditor" || group == "Admin" || group == "AccountAdmin")) {
        console.error(new Error(`Group ${group} is not authorized to create stream`));
        callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "Forbidden", status:403})});
        return;
    }

    let tenantId = group == "Admin" ? event.queryStringParameters.tenantId : claims["custom:tenantId"];
    if (!tenantId) {
        console.error(new Error(`NoTenantId`));
        callback(null, {statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({message: "BadRequest", status:400})});
        return;
    }

    let {requestId, stage, requestTime} = event.requestContext;
    let {formId} = event.pathParameters;

    try {
        const rds = new AWS.RDSDataService();
        const checkFormInTenant:AWS.RDSDataService.ExecuteStatementRequest = {
            database: DatabaseName,
            resourceArn: DBClusterId,
            secretArn: DBSecretARN,
            sql: `SELECT COUNT(*) AS form_count FROM Form WHERE id=:id AND accountId=:accountId`,
            parameters: [
                {name: "id", value: {stringValue: formId}},
                {name: "accountId", value: {stringValue: tenantId}},
            ]
        };
        console.log(`${ServiceName} - createstream.handle - rds-checkForm REQ`);
        let countResponse: ExecuteStatementResponse = await rds.executeStatement(checkFormInTenant).promise();
        console.log(`${ServiceName} - createstream.handle - rds-checkForm RES`, JSON.stringify(countResponse.records));
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
    const streamName = getDeliveryStreamName(stage, tenantId, formId);
    const streamPrefix = getDeliveryStreamPrefix(tenantId, formId);
    const streamErrorPrefix = getDeliveryStreamErrorPrefix(tenantId, formId);

    try {
        let streams = await firehose.listDeliveryStreams({ExclusiveStartDeliveryStreamName: streamName}).promise();
        if (!streams.DeliveryStreamNames || streams.DeliveryStreamNames.length == 0) {
            await firehose.createDeliveryStream({
                DeliveryStreamName: streamName,
                DeliveryStreamType: "DirectPut",
                S3DestinationConfiguration: {
                    Prefix: streamPrefix,
                    ErrorOutputPrefix: streamErrorPrefix,
                    BucketARN : `arn:aws:s3:::${UserBucket}`,
                    RoleARN: RoleArn
                },
                Tags : [
                    { Key: "Stage",  Value: stage},
                    { Key: "ServiceName",  Value: ServiceName},
                    { Key: "TenantId",  Value: tenantId},
                    { Key: "FormId",  Value: formId}
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