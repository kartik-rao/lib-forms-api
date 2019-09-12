//# sourceMappingURL=./formrender.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';
import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
const ServiceName  = process.env.serviceName;

const ENV = process.env.environment;
const STATIC_DOMAIN = process.env.staticDomain || "static.forms.li";
const API_DOMAIN = process.env.apiDomain || "api.forms.li";

const CORS_HEADERS = {
    "Access-Control-Allow-Headers"     : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin"      : "*",  // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type"                     : "text/html",
    "Cache-Control"                    : ENV == "development" ? "private, max-age=0" : "public, max-age=900"
}

export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {
    console.log(`${ServiceName} - formrender.handle`, event);
    let envPrefix = ENV == "dev" ? "dev-" : ENV == "staging" ? `staging-` : "";
    let apiDomain = `${envPrefix}${API_DOMAIN}`;
    let staticDomain = `${envPrefix}${STATIC_DOMAIN}`;
    let reactEnv = ENV == "production" ? "production" : "development";
    let staticPath = `//${staticDomain}/lib/lib-forms-core`;
    let response = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="${staticPath}/vendor~main.vendor~main.chunk.css" rel="stylesheet">
                <link href="${staticPath}/main.main.chunk.css" rel="stylesheet">
            </head>
        <body>
            <div id="root"></div>
            <script src="${staticPath}/public/react.${reactEnv}.js"></script>
            <script src="${staticPath}/public/react-dom.${reactEnv}.js"></script>
            <script src="${staticPath}/public/moment.min.js"></script>
            <script src="${staticPath}/public/moment-timezone-with-data-2012-2022.min.js"></script>
            <script src="${staticPath}/public/antd.min.js"></script>
            <script src="${staticPath}/runtime~main.bundle.js"></script>
            <script src="${staticPath}/vendor~main.chunk.js"></script>
            <script src="${staticPath}/main.chunk.js"></script>
            <script>
                Forms.renderForm("#root", "${event.pathParameters.formId}");
            </script>
        </body>
    </html>`;

    callback(null, {statusCode: 200, headers: CORS_HEADERS, body: response});
}