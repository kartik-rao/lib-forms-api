import Amplify from '@aws-amplify/core';
import Auth from "@aws-amplify/auth";

const config = require("../outputs/stack.dev.json");

export default {
    'aws_appsync_graphqlEndpoint': config['GraphQlApiUrl'],
    'aws_appsync_region': 'ap-southeast-2',
    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS',
    oauth: {
        // Domain name
        domain : 'dev-forms-li.auth.ap-southeast-2.amazoncognito.com',
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
        region: 'ap-southeast-2',
        mandatorySignIn: true
    }
}