import * as AWS from 'aws-sdk';
import {existsSync, readFileSync, writeFileSync} from 'fs';

const credentials = new AWS.SharedIniFileCredentials({profile: 'fl-infrastructure'});
AWS.config.region = "ap-northeast-1";
AWS.config.credentials = credentials;

export enum SSMPath  {
    "prefix/domain" = "prefix/domain",
    "prefix/key" = "prefix/key",
    "prefix/name" = "prefix/name",
    "app/name" = "app/name",
    "app/stage" = "app/stage",
    "app/region" = "app/region",
    "app/qa/globalAdmin" = "app/qa/globalAdmin",
    "app/qa/tenantAccountAdmin" = "app/qa/tenantAccountAdmin",
    "app/qa/tenantAccountEditor" = "app/qa/tenantAccountEditor",
    "app/qa/tenantAccountViewer" = "app/qa/tenantAccountViewer",
    "app/qa/tenantState" = "app/qa/tenantState",
    "apig/authorizerId" = "apig/authorizerId",
    "apig/resource/form" = "apig/resource/form",
    "apig/resource/server" = "apig/resource/server",
    "apig/resource/stream" = "apig/resource/stream",
    "apig/resource/user" = "apig/resource/user",
    "apig/restApiId" = "apig/restApiId",
    "apig/restApiEndpoint" = "apig/restApiEndpoint",
    "apig/rootResourceId" = "apig/rootResourceId",
    "cognito/identitypool/id" = "cognito/identitypool/id",
    "cognito/userpool/adminUser" = "cognito/userpool/adminUser",
    "cognito/userpool/adminClientId" = "cognito/userpool/adminClientId",
    "cognito/userpool/arn" = "cognito/userpool/arn",
    "cognito/userpool/clientId" = "cognito/userpool/clientId",
    "cognito/userpool/endpoint" = "cognito/userpool/endpoint",
    "cognito/userpool/id" = "cognito/userpool/id",
    "domain/tld" = "domain/tld",
    "graphql/api/endpoint" = "graphql/api/endpoint",
    "graphql/api/id" = "graphql/api/id",
    "graphql/api/key" = "graphql/api/key",
    "graphql/api/url" = "graphql/api/url",
    "kinesis/accessRoleArn" = "kinesis/accessRoleArn",
    "queue/analytics/arn" = "queue/analytics/arn",
    "queue/analytics/url" = "queue/analytics/url",
    "queue/entry/arn" = "queue/entry/arn",
    "queue/entry/url" = "queue/entry/url",
    "queue/firehose/arn" = "queue/firehose/arn",
    "queue/firehose/url" = "queue/firehose/url",
    "queue/integration/arn" = "queue/integration/arn",
    "queue/integration/url" = "queue/integration/url",
    "rds/endpoint" = "rds/endpoint",
    "rds/id" = "rds/id",
    "rds/password" = "rds/password",
    "rds/password/secret" = "rds/password/secret",
    "rds/username" = "rds/username",
    "rds/arn" = "rds/arn",
    "s3/buckets/app/arn" = "s3/buckets/app/arn",
    "s3/buckets/app/id" = "s3/buckets/app/id",
    "s3/buckets/app/name" = "s3/buckets/app/name",
    "s3/buckets/user/arn" = "s3/buckets/user/arn",
    "s3/buckets/user/id" = "s3/buckets/user/id",
    "s3/buckets/user/name" = "s3/buckets/user/name",
    "sftp/arn" = "sftp/arn",
    "sftp/id" = "sftp/id",
    "sftp/userRoleArn" = "sftp/userRoleArn"
};

const MILLIS_ONE_DAY = 24 * 60 * 60 * 1000;
export type SSMConfig = {[key in SSMPath] : string}

const configLocalPath = "./ssm-config.json";

function readLocalConfig() {
    if (existsSync(configLocalPath)) {
        return JSON.parse(readFileSync(configLocalPath, {encoding: 'utf8'}).toString()) as {timestamp: number, config: SSMConfig};
    } else {
        return null;
    }
}

function writeLocalConfig(config: SSMConfig) {
    writeFileSync(configLocalPath, JSON.stringify({timestamp: new Date().getTime(), config: config}), 'utf8');
}

export async function loadConfiguration(rootPath: string = "/dev/formsli") : Promise<SSMConfig> {
    const ssm = new AWS.SSM();
    return new Promise(async (resolve, reject) => {
        try {
            if (rootPath.lastIndexOf("/") == rootPath.length -1) {
                rootPath = rootPath.substring(rootPath.length - 1);
            }
            let cache = readLocalConfig();
            if (cache && (new Date().getTime() - cache.timestamp < MILLIS_ONE_DAY)) {
                resolve(cache.config);
                return;
            }

            let count = 0;
            let ssmParameters = [];
            let nextToken = null;
            console.log("loadConfiguration - cache is empty");
            while (!!nextToken || count == 0) {
                let batchResponse = await ssm.getParametersByPath({Path: rootPath, WithDecryption: true, Recursive: true, NextToken: nextToken}).promise();
                count++;
                nextToken = batchResponse.NextToken;
                ssmParameters = ssmParameters.concat(batchResponse.Parameters);
            }
            console.log(`loadConfiguration fetched [${ssmParameters.length}] params`);
            let params = {} as SSMConfig;
            ssmParameters.forEach((param) => {
                let namespace = param.Name.replace(`${rootPath}/`, "");
                params[namespace] = param.Value;
            });
            writeLocalConfig(params);
            resolve(params);
        } catch (error) {
            console.error("config.loadConfiguration", error);
            reject(error);
        }
    });
}