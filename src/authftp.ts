//# sourceMappingURL=./authftp.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda';
import AWS from 'aws-sdk';
import { AttributeType } from "aws-sdk/clients/cognitoidentityserviceprovider";

const CORS_HEADERS = {
    "Access-Control-Allow-Headers"     : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin"      : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type"                     : "application/json"
}

const ServiceName  = process.env.serviceName;
const UserPoolId = process.env.userPoolId;
const UserPoolClientId = process.env.userPoolAdminClientId;
const S3Bucket = process.env.s3_user_bucket;
const SftpRoleArn = process.env.sftp_role_arn;
const SftpServerId = process.env.sftp_server_id;

const readOnlyActions = ["s3:GetObject","s3:GetObjectVersion"];
const allActions = ["s3:DeleteObjectVersion","s3:PutObject","s3:DeleteObject"].concat(readOnlyActions);

const groupActionsMap = {
    "AccountAdmin"  : readOnlyActions,
    "AccountEditor" : readOnlyActions,
    "AccountViewer" : readOnlyActions,
    "Admin"         : allActions
}

const attributeListToMap = (attrs: AttributeType[]) : any => {
    let attributes = {}
    attrs.forEach((a) => {
        attributes[a.Name] = a.Value;
    });
    return attributes;
}

const getPolicyResponse = (tenantId: string, group: string) => {
    let homeDirectory = group == "Admin" ? `/${S3Bucket}/home/` : `/${S3Bucket}/home/${tenantId}/`; 
    let listBucketCondition = group == "Admin" ? "" : `,
    "Condition": {
        "StringLike": {
            "s3:prefix": [
                "home/${tenantId}/*",
                "home/${tenantId}"
            ]
        }
    }`;

    return {
        body: JSON.stringify({
            Role: SftpRoleArn,
            Policy: `{
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "AllowListingOfUserFolder",
                        "Action": [
                            "s3:ListBucket"
                        ],
                        "Effect": "Allow",
                        "Resource": [
                            "arn:aws:s3:::\${transfer:HomeBucket}"
                        ]
                        ${listBucketCondition}
                    },
                    {
                        "Sid": "AWSTransferRequirements",
                        "Effect": "Allow",
                        "Action": [
                            "s3:ListAllMyBuckets",
                            "s3:GetBucketLocation"
                        ],
                        "Resource": "*"
                    },
                    {
                        "Sid": "HomeDirObjectAccess",
                        "Effect": "Allow",
                        "Action": ${JSON.stringify(groupActionsMap[group])},
                        "Resource": "arn:aws:s3:::\${transfer:HomeDirectory}*"
                     }
                ]
            }`,
            HomeBucket : S3Bucket,
            HomeDirectory: homeDirectory
        }),
        statusCode: 200
    }
};

export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {
    console.log(`${ServiceName} - authftp.handle - initialize - head=[${JSON.stringify(event.headers||{})}] path=[${JSON.stringify(event.pathParameters||{})}] query=[${JSON.stringify(event.queryStringParameters||{})}]`);
    let {serverId} = event.pathParameters;
    let parts = event.headers.Password.split(" ");
    let username = parts[0];
    let password = parts[1];

    if(SftpServerId != serverId) {
        callback(null, {body: JSON.stringify({message: "UnauthorizedResource"}), statusCode:200, headers: CORS_HEADERS});
        return;
    }

    const authenticationData = {
        Username: username,
        Password: password
    };

    console.log(`${ServiceName} - authftp.handle - initialize - [${username}] [${serverId}]`);

    let userPool = new AWS.CognitoIdentityServiceProvider();

    try {
        await userPool.adminInitiateAuth({
            AuthFlow: "ADMIN_NO_SRP_AUTH", 
            ClientId: UserPoolClientId, 
            UserPoolId: UserPoolId, 
            AuthParameters : {USERNAME : authenticationData.Username, PASSWORD: authenticationData.Password}}).promise();
        let user = await userPool.adminGetUser({UserPoolId: UserPoolId, Username: authenticationData.Username}).promise();
        let attributes = attributeListToMap(user.UserAttributes);
        const tenantId = attributes["custom:tenantId"];
        const group    = attributes["custom:group"];
        if(!group || !groupActionsMap[group] || (group !== "Admin" && !tenantId) ) {
            callback(null, {body: JSON.stringify({message: "InvalidTenantOrGroup"}), statusCode:200, headers: CORS_HEADERS});
            return;
        }
        console.log("${ServiceName} - authftp.handle - response", JSON.stringify(getPolicyResponse(tenantId, group)));
        callback(null, getPolicyResponse(tenantId, group));
    } catch (error) {
        console.log(`${ServiceName} - authftp.handle - user.initiateAuth ERROR - ${error.message}`);
        callback(null, {body: JSON.stringify({message: "AuthError"}), statusCode:200, headers: CORS_HEADERS});
    }
}