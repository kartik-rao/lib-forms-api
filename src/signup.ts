//# sourceMappingURL=./handler.signUp.map
require('source-map-support').install();
process.env.TZ = 'UTC';
import Auth from '@aws-amplify/auth';
import Amplify from 'aws-amplify';
import {Logger, SEVERITY} from "@adinfinity/ai-lambda-logging";
import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import * as _ from "lodash";

const HEADERS = {
    'Cache-Control': 'private, must-revalidate, proxy-revalidate',
    'Content-Type': 'application/json',
    'P3P': 'CP="Adinfinity does not have a P3P policy."',
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
};
const SERVICENAME = process.env['serviceName'];

Amplify.configure({
    Auth: {
        region: process.env['region'],
        userPoolId: process.env['cognitoUserPoolId'],
        userPoolWebClientId: process.env['cognitoUserPoolWebClientId']
    }
});

export const handle = (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {

    let {requestId, stage} = event.requestContext;
    let body : any = event.body;

    if (!body) {
        callback(null, {
            statusCode: 400,
            headers: HEADERS,
            body: JSON.stringify({error: `[${stage}] [${requestId}] - bad request - missing params`})
        });
        return;
    }

    let payload: any;

    try {
        payload = JSON.parse(body);
    } catch (error) {
        callback(null, {
            statusCode: 400,
            headers: HEADERS,
            body: JSON.stringify({error: `[${stage}] [${requestId}] - bad request - invalid request object`})
        });
    }

    const logger = new Logger(SERVICENAME, context.stage, SEVERITY.INFO);
    logger.setAPIGContext(event.requestContext);

    let { first_name, last_name, email, password, phone_number } = payload;

    Auth.signUp({
        username: email,
        password: password,
        attributes: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number ? phone_number : null
        }
    })
        .then((data) => {
            callback(null, {
                statusCode: 201,
                headers: HEADERS,
                body: JSON.stringify(data)
            })
        })
        .catch((err) => {
            callback(null, {
                statusCode: 500,
                headers: HEADERS,
                body: JSON.stringify({error: `[${stage}] [${requestId}] - ${err}`})
            });
        });
}