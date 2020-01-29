//# sourceMappingURL=./screenshot.js.map
require('source-map-support').install();
process.env.TZ = 'UTC';

import {APIGatewayEventRequestContext, APIGatewayEvent} from 'aws-lambda';
import chrome from 'chrome-aws-lambda';

const ENV = process.env.environment;
const ServiceName  = process.env.serviceName;

const CORS_HEADERS = {
    "Access-Control-Allow-Headers"     : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin"      : "*",  // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    "Content-Type"                     : "image/png",
    "Cache-Control"                    : "private, max-age=900"
}

export const handle = async (event : APIGatewayEvent, context : APIGatewayEventRequestContext, callback : any) => {
    console.log(`${ServiceName} - screenshot.handle`, event);
    let envPrefix = ENV == "dev" ? "dev-" : ENV == "staging" ? `staging-` : "";

    try {
        const browser = await chrome.puppeteer.launch({
            args: chrome.args,
            executablePath: await chrome.executablePath,
            defaultViewport : {width: 1920, height: 1080}
        });

        let versionUrl = `https://${envPrefix}api.forms.li/app/view/${event.pathParameters.formId}/${event.pathParameters.versionId}`;
        const page = await browser.newPage();

        page.setJavaScriptEnabled(true);
        page.setExtraHTTPHeaders({"Authorization" : event.headers["Authorization"]});
        page.setDefaultNavigationTimeout(5000);
        await page.goto(versionUrl);
        page.waitFor(5000);
        const buffer = await page.screenshot({type: "png", fullPage: true});
        callback(null, {statusCode: 200, headers: CORS_HEADERS, body: buffer});
    } catch (error) {
        console.error(error);
        callback(error);
    }
}