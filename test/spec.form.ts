import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ApiHelper } from "./api.utils";
import { AuthUtils } from "./auth.utils";
import * as AWS from 'aws-sdk';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
const config = require("../outputs/stack.dev.json");

Auth.configure(ApiHelper.apiConfig().Auth);

describe("Form", () => {
    let token: string;
    let tenantId: string;
    let formId: string;
    let formVersionId: string;

    beforeAll(async (done) => {
        try {
            await AuthUtils.setup();
            const user: CognitoUser = await Auth.signIn(AuthUtils.globalAdmin);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            tenantId = AuthUtils.accountAdmin.attributes["custom:tenantId"];
            done();
        } catch (error) {
            console.error("spec.form - beforeAll - ERROR", error);
            done.fail(error);
        }
    }, 60000);

    afterAll(async (done) => {
        try {
            if(formId) {
                const rdsCommonParams = {
                    database: config['Service'],
                    resourceArn: config['DBClusterArn'],
                    secretArn: config['DBSecretArn']
                };
                let client = new AWS.RDSDataService();
                await client.executeStatement({
                    ...rdsCommonParams, sql : `UPDATE Form set versionId=NULL WHERE description='spec.form'`
                }).promise();
                await client.executeStatement({
                    ...rdsCommonParams, sql : `DELETE FROM FormVersion WHERE id='${formVersionId}}'`
                }).promise();
                await client.executeStatement({
                    ...rdsCommonParams, sql : `DELETE FROM Form WHERE description='spec.form'`
                }).promise();
            }
            done();
        } catch (error) {
            console.error("spec.form - afterAll - ERROR", error);
            done.fail(error);
        }
    }, 20000);


    it("Add", async (done) => {
        const addForm = {query: `mutation {
            addForm (input: {
                accountId: "${tenantId}",
                name: "lib-forms-api",
                description: "spec.form"
            })
            {id, name, accountId, createdAt, description}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("addForm", addForm, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);

            expect(parsed).toBeDefined();
            formId = parsed.id;
            expect(parsed.accountId).toEqual(tenantId);
            expect(parsed).toBeDefined();
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });

    it("Get", async (done) => {
        if(!formId) {
            fail("No formId");
            done();
        }

        const getPlan = {query: `query {
            getForm (formId: "${formId}")
            {id, formData {id createdAt notes}, createdAt, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("getPlan", getPlan, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            expect(parsed).toBeDefined();
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });

    it("Attach Version", async (done) => {
        if(!formId) {
            fail("No formId");
            done();
        }
        const addFormVersion = {query: `mutation {
            addFormVersion (input: {
                accountId: "${tenantId}",
                formId: "${tenantId}",
                notes: "Test Form Version",
                formData: "{}"
            })
            {id, formId, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("addFormVersion", addFormVersion, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            expect(parsed).toBeDefined("Response.data should exist");
            expect(parsed.active).toBeTruthy();
        } catch (error) {
            fail(error);
        }
        done();
    });

    it("Delete", async (done) => {
        if(!formId) {
            fail("No formId");
            done();
        }

        const deleteForm = {query: `mutation {
            deleteForm (input: {id:"${formId}", accountId: "${tenantId}"})
                {id, isDeleted, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("deleteForm", deleteForm, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            // Fetch again and check
        } catch (error) {
            fail(error);
        }
        done();
    });
});