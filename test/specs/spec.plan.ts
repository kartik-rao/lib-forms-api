import Auth, { CognitoUser } from '@aws-amplify/auth';
import {loadConfiguration, SSMConfig} from "./common/config";
import { ApiHelper } from "./common/api.utils";
import { AuthUtils } from "./common/auth.utils";
import * as AWS from 'aws-sdk';
import { IAddPlanTypeMutation, IAddPlanMutation, IDeletePlanMutation } from '../../client';
import { IGetPlanQuery } from '../../client';
import { IUpdatePlanMutation } from '../../client';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("Plan", () => {
    let config: SSMConfig;
    let token: string;
    let planId: string;
    let planTypeId: string;
    let tenantId: string;

    beforeAll(async (done) => {
        try {
            config = await loadConfiguration();
            let apiConfig = ApiHelper.apiConfig(config);
            Auth.configure(apiConfig);
            await AuthUtils.setup();
            const user: CognitoUser = await Auth.signIn(AuthUtils.globalAdmin);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            tenantId = AuthUtils.accountAdmin.attributes["custom:tenantId"];
            let planName = `spec.plan`
            const addPlanType = {query: `mutation {
                addPlanType (input: {
                    name: "${planName}",
                    billingTerm: "Monthly",
                    cost: 50,
                    active: 1
                })
                {id, name, billingTerm, cost, createdAt, updatedAt}
                }
            `};
            let response = await ApiHelper.makeRequest<IAddPlanTypeMutation>(config, addPlanType, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);
            expect(response.data).toBeDefined();
            planTypeId = response.data.addPlanType.id;
            done();
        } catch (error) {
            console.error("spec.plan - beforeAll - ERROR", error);
            done.fail(error);
        }
    }, 60000);

    afterAll(async (done) => {
        try {
            const rdsCommonParams = {
                database: "formsli",
                resourceArn: config["rds/arn"],
                secretArn: config["rds/password/secret"]
            } as AWS.RDSDataService.ExecuteStatementRequest;
            let client = new AWS.RDSDataService({region: config["app/region"]});
            await client.executeStatement({
                ...rdsCommonParams, sql : `DELETE FROM Plan WHERE planTypeId='${planTypeId}'`
            }).promise();
            await client.executeStatement({
                ...rdsCommonParams, sql : "DELETE FROM PlanType WHERE `name` ='spec.plan'"
            }).promise();
            done();
        } catch (error) {
            console.error("spec.plan - afterAll - ERROR", error);
            done.fail(error);
        }
    }, 20000);


    it("Add", async (done) => {
        const addPlan = {query: `mutation {
            addPlan (input: {
                accountId: "${tenantId}",
                planTypeId: "${planTypeId}",
                active: 1
            })
            {id, startDate, endDate, active, planTypeId, accountId, createdAt, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest<IAddPlanMutation>(config, addPlan, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            expect(response.data).toBeDefined();
            let plan = response.data.addPlan;
            planId = plan.id;
            expect(plan.accountId).toEqual(tenantId);
            expect(plan.planTypeId).toEqual(planTypeId);
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });

    it("Get", async (done) => {
        if(!planId) {
            fail("No planId");
            done();
        }

        const getPlan = {query: `query {
            getPlan (planId: "${planId}")
            {id, planType {id name cost}, createdAt, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest<IGetPlanQuery>(config, getPlan, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            expect(response.data.getPlan).toBeDefined();
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });

    it("AttachPlan (as AccountAdmin)", async(done) => {
        const attachPlan = {
            query: `
            mutation {
                attachPlan(accountId: "${tenantId}",  planId: "${planId}") {}
            }`
        }
        done();
    }, 10000);

    it("Update", async (done) => {
        if(!planId) {
            fail("No planId");
            done();
        }
        const updatePlan = {query: `mutation {
            updatePlan (input: {
                planId: "${planId}",
                accountId: "${tenantId}",
                active: 0
            })
            {id, active, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest<IUpdatePlanMutation>(config, updatePlan, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            expect(response.data).toBeDefined("Response.data should exist");
            expect(response.data.updatePlan.active).toBeFalsy();
        } catch (error) {
            fail(error);
        }
        done();
    });

    it("Delete", async (done) => {
        if(!planId) {
            fail("No planId");
            done();
        }

        const deletePlan = {query: `mutation {
            deletePlan (planId: "${planId}", accountId: "${tenantId}")
            {id, isDeleted, active, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest<IDeletePlanMutation>(config, deletePlan, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            // Fetch again and check
        } catch (error) {
            fail(error);
        }
        done();
    });
});