import Auth, { CognitoUser } from '@aws-amplify/auth';
import * as AWS from 'aws-sdk';
import { IAddFormMutation, IAddFormVersionMutation, IDeleteFormMutation, IGetFormQuery, IUpdateFormMutation } from '../../client';
import { ApiHelper } from "./common/api.utils";
import { AuthUtils } from "./common/auth.utils";
import { loadConfiguration, SSMConfig } from "./common/config";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;


describe("Form", () => {
    let config: SSMConfig;
    let token: string;
    let tenantId: string;
    let formId: string;
    let formVersionId: string;

    beforeAll(async (done) => {
        try {
            config = await loadConfiguration();
            let apiConfig = ApiHelper.apiConfig(config);
            Auth.configure(apiConfig);
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
                    database: "formsli",
                    resourceArn: config["rds/arn"],
                    secretArn: config["rds/password/secret"]
                } as AWS.RDSDataService.ExecuteStatementRequest;
                let client = new AWS.RDSDataService({region: config["app/region"]});
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
            let response = await ApiHelper.makeRequest<IAddFormMutation>(config, addForm, token);
            let {errors} = response;

            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);

            expect(response.data.addForm).toBeDefined();
            let form = response.data.addForm;
            formId = form.id;
            expect(form.accountId).toEqual(tenantId);
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

        const getForm = {query: `query {
            getForm (formId: "${formId}")
            {id createdAt updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest<IGetFormQuery>(config, getForm, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);
            expect(response.data.getForm).toBeDefined();
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });

    it("Update", async (done) => {
        if(!formId) {
            fail("No formId");
            done();
        }

        const updateForm = {query: `mutation {
            updateForm (input: {id: "${formId}", name: "lib-forms-api-updated"})
            {id, name, createdAt, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest<IUpdateFormMutation>(config, updateForm, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);
            expect(response.data.updateForm).toBeDefined();
            expect(response.data.updateForm.name).toEqual("lib-forms-api-updated");
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
                displayName: "v1"
                formId: "${formId}"
                accountId: "${tenantId}"
                notes: "Test Form Version"
                formData: "{}"
            })
            {id createdAt versionId version {id notes displayName createdAt}}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest<IAddFormVersionMutation>(config, addFormVersion, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);
            expect(response.data.addFormVersion).toBeDefined("data.addFormVersion should exist");
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
            let response = await ApiHelper.makeRequest<IDeleteFormMutation>(config, deleteForm, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);
            expect(response.data.deleteForm).toBeDefined("data.deleteForm should exist");
            done();
            // Fetch again and check
        } catch (error) {
            fail(error);
        }
        done();
    });
});