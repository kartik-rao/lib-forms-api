//# sourceMappingURL=./formrender.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';
import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import dayjs from 'dayjs';

const DBClusterArn = process.env.dbClusterArn;
const DBSecretARN = process.env.dbClusterSecretArn;
const ServiceName  = process.env.serviceName;

const dataApi = require('data-api-client')({
    secretArn: DBSecretARN,
    resourceArn: DBClusterArn,
    database: ServiceName
});

const CORS_HEADERS = {
    "Access-Control-Allow-Headers"     : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin"      : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type"                     : "application/json"
}

export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {
    console.log(`${ServiceName} - formrender.handle`, event);
    try {

        let response : any = await dataApi.query({
            sql: `SELECT f.name, f.description, f.startDate, f.endDate, f.redirectHasEnded, f.redirectNotStarted, fv.formData from Form f, FormVersion fv
            WHERE f.id = :formId AND fv.id = f.versionId AND f.isPaused = 0 AND f.isDeleted = 0`,
            parameters: [
                { formId: event.pathParameters.formId }
            ]
        });
        console.log(`${ServiceName} - formrender.handle - QUERY ${event.pathParameters.formId} RES`, response);
        if (response && response.records && response.records.length > 0) {
            let starts;
            let ends;
            let now = dayjs();
            let data = response.records[0];
            if (data.startDate) {
                starts = dayjs(data.startDate);
            }
            if (data.endDate) {
                ends = dayjs(data.endDate);
            }

            let allowed = !ends || now.isBefore(ends) && !starts || now.isAfter(starts);
            if (allowed) {
                if(data.formData) {
                    callback(null, {statusCode: 200, headers: CORS_HEADERS, body: data.formData});
                } else {
                    callback(null, {statusCode: 204, headers: CORS_HEADERS, body: JSON.stringify({error: "NotPublished"})});
                }
            } else {
                callback(null, {statusCode: 204, headers: CORS_HEADERS, body: JSON.stringify({
                    error: "InactiveForm",
                    data : {
                        name: data.name,
                        description: data.description,
                        redirectNotStarted: data.redirectNotStarted,
                        redirectHasEnded  : data.redirectHasEnded
                    }
                })});
            }
        } else {
            console.log(`${ServiceName} - formrender.handle WARN - Form [${event.pathParameters.formId}] - 404`);
            callback(null, {stautusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({error: "NotFound"})});
        }
    } catch(e) {
        console.log(`${ServiceName} - formrender.handle ERROR`, e);
        callback(null, {stautusCode: 200, headers: CORS_HEADERS, body: {error: e.message}});
    }
}