//# sourceMappingURL=./dbclient.js.map
require('source-map-support').install();

import * as AWS from "aws-sdk";
const DEFAULT_REGION : string = process.env.region || 'ap-southeast-2';

export class DBClient {
    static getInstance(options: any = {}): AWS.DynamoDB.DocumentClient {
        if (process.env.IS_OFFLINE) {
            options.region = "localhost";
            options.endpoint = "http://localhost:8000";
        } else {
            if(!options.region) {
                options.region = DEFAULT_REGION;
                options.endpoint = `dynamodb.${options.region}.amazonaws.com`;
            }
        }
        return new AWS.DynamoDB.DocumentClient(options);
    }
}