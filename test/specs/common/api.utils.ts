import Auth from "@aws-amplify/auth";
import * as url from 'url';
import { SSMConfig } from "./config";

export interface GraphQLError {
    path: any[];
    data: any;
    errorType: string;
    errorInfo: any;
    locations: any[];
    message: string
}

export interface TypedGraphQLResult<T> {
    data?: T;
    errors?: GraphQLError[];
    extensions?: {
        [key: string]: any;
    };
}

export class ApiHelper {
    static apiConfig(config: SSMConfig) {
        return {
            'aws_appsync_graphqlEndpoint': `https://${config["graphql/api/endpoint"]}/graphql`,
            'aws_appsync_region': config["app/region"],
            'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS',
            oauth: {
                // Domain name
                domain : `dev-auth-formsli.auth.${config["app/region"]}.amazoncognito.com`,
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
                }
            },
            Auth: {
                userPoolId: config["cognito/userpool/id"],
                userPoolWebClientId: config["cognito/userpool/clientId"],
                // identityPoolId: config["cognito/identitypool/id"],
                region: config["app/region"],
                mandatorySignIn: true
            }
        }
    }

    static async makeRequest<T>(config: SSMConfig, queryOrMutation: any, token: string) : Promise<TypedGraphQLResult<T>> {
        return new Promise(async (resolve, reject) => {
            let res;
            try {
                const endpoint = url.parse(`https://${config["graphql/api/endpoint"]}/graphql`);
                const options = {
                    method: 'POST',
                    body: JSON.stringify(queryOrMutation),
                    headers: {
                        host: endpoint.host,
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                };

                res = await fetch(endpoint.href, options);
                const responseText = await res.text();
                const response = JSON.parse(responseText);
                resolve(response as TypedGraphQLResult<T>);
            } catch (error) {
                console.error("ApiHelper.makeRequest - Error", error);
                reject(error);
            }
        });
    }
}
