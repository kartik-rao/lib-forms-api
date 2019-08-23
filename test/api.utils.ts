import Auth from "@aws-amplify/auth";
import * as url from 'url';
import {GraphQLResponse, GraphQLError} from "./types";

const config = require("../outputs/stack.dev.json");

export interface ParsedGraphQLResponse {
    raw: any,
    text: string,
    parsed: any,
    hasErrors: boolean,
    errors: GraphQLError[],
    status: number
}

export class ApiHelper {
    static apiConfig() : any {
        return {
            'aws_appsync_graphqlEndpoint': config['GraphQlApiUrl'],
            'aws_appsync_region': 'ap-southeast-2',
            'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS',
            oauth: {
                // Domain name
                domain : 'dev-auth-formsli.auth.ap-southeast-2.amazoncognito.com',
                // Authorized scopes
                scope : ['phone', 'email', 'profile', 'openid'],
                // Callback URL
                redirectSignIn : 'http://localhost:8085/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'
                // Sign out URL
                redirectSignOut : 'http://localhost:8085/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'
                responseType: 'code'
            },
            graphql_headers: async () => {
                try {
                const token = (await Auth.currentSession()).getIdToken().getJwtToken();
                return { Authorization: token }
                }
                catch (e) {
                console.error(e);
                return {};
                // Potentially you can retrieve it from local storage
                }
            },
            Auth: {
                userPoolId: config['UserPoolId'],
                userPoolWebClientId: config["UserPoolClientId"],
                identityPoolId: config['IdentityPoolId'],
                region: config['Region'],
                mandatorySignIn: true
            }
        }
    }

    static async makeRequest(name: string, payload: any, token: string) {
        return new Promise<ParsedGraphQLResponse>(async (resolve, reject) => {
            let res;
            try {
                const endpoint = url.parse(config["GraphQlApiUrl"]);
                const options = {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        host: endpoint.host,
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                };

                res = await fetch(endpoint.href, options);
                const responseText = await res.text();
                const response = JSON.parse(responseText) as GraphQLResponse;
                const hasErrors = response.errors && response.errors.length > 0;
                resolve({
                    raw: res,
                    text: responseText,
                    parsed: response.data && response.data[name] ? response.data[name] : null,
                    hasErrors: hasErrors,
                    errors: response.errors,
                    status: res.status
                });
            } catch (error) {
                console.error("ApiHelper.makeRequest - Error", error);
                resolve({
                    hasErrors: true,
                    errors: [error],
                    raw: null,
                    text: null,
                    parsed: null,
                    status: res && res.status ? res.status : 500
                });
            }
        });
    }
}

