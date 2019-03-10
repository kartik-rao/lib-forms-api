//# sourceMappingURL=./append.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {Logger, SEVERITY} from "@adinfinity/ai-lambda-logging";
import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import * as _ from "lodash";
import {DBClient} from "./dbclient";
const uuid = require('uuid/v5');
import * as AWS from 'aws-sdk';


const ServiceName = process.env['serviceName'] || 'dev-formsgraphql-postconfirmation';
const DDB_TABLE : string = process.env.TBL_MASTER_DATA || 'formsgraphql_dev_masterdata';

export const handle = (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {

    const logger = new Logger(ServiceName, context.stage, SEVERITY.INFO);
    logger.setAPIGContext(event.requestContext);

    const cognitoReq : any = event["request"];
    const {userAttributes} = cognitoReq;
    const accountId = uuid(`${cognitoReq.userPoolId}.amazonaws.com`, uuid.DNS);
    const ddbClient = DBClient.getInstance({convertEmptyValues: true});

    // 1. Create Account with name as tenant + Create user with id as cognito sub
    ddbClient.batchWrite({
        RequestItems: {
            [DDB_TABLE] : [
                {
                    PutRequest : {
                        Item: {
                            partitionKey: accountId,
                            sortKey: 'ACCOUNT',
                            indexKey: 'FREE',
                            itemData: {
                                version: 1,
                                owner  : userAttributes.sub,
                                name   : userAttributes["custom:tenant"]
                            }
                        }
                    }
                },
                {
                    PutRequest : {
                        Item: {
                            partitionKey: userAttributes.sub,
                            sortKey : 'USER',
                            indexKey: `${accountId}:${userAttributes.sub}:Admin`,
                            itemData: {
                                accountId : accountId,
                                group: 'AccountAdmin',
                                ...userAttributes
                            }
                        }
                    }
                }
            ]
        }
    }, (err, data) => {
        if(err) {
            callback(err);
        } else {
            // Account and User created successfully in DDB
            let cognitoParams = {
                GroupName : 'Admin',
                UserPoolId: cognitoReq.userPoolId, /* required */
                Username  :  event["request"]["userName"]/* required */
            };
            // 2. Update the tenant (which had the name) with the account id
            var userPool = new AWS.CognitoIdentityServiceProvider();
            userPool.adminAddUserToGroup(cognitoParams, (err, data) => {
                let params = {
                    UserAttributes: [ /* required */
                      {
                        Name: 'custom:tenant', /* required */
                        Value: accountId
                      }
                    ],
                    UserPoolId: cognitoReq.userPoolId, /* required */
                    Username: cognitoReq.userName /* required */
                };
                // 3. Add User to 'Admin'
                userPool.adminUpdateUserAttributes(params, (err, data) => {
                    if(err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(null, {statusCode: 200});
                    }
                })
            });
        }
    })
}

/**
 * {
    "version": "1",
    "region": "eu-central-1",
    "userPoolId": "eu-central-1_45YtlkflA",
    "userName": "user4",
    "callerContext": {
        "awsSdkVersion": "aws-sdk-java-console",
        "clientId": "4736lckau64in48dku3rta0eqa"
    },
    "triggerSource": "PostConfirmation_ConfirmSignUp",
    "request": {
        "userAttributes": {
            "sub": "a2c21839-f9fc-49e3-be9a-16f5823d6705",
            "cognito:user_status": "CONFIRMED",
            "email_verified": "true",
            "email": "asdfsdfsgdfg@carbtc.net"
        }
    },
    "response": {}
}
 */