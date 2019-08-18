import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ApiHelper } from "./api.utils";
import { AuthUtils } from "./auth.utils";
import * as AWS from 'aws-sdk';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
const config = require("../outputs/stack.dev.json");

Auth.configure(ApiHelper.apiConfig().Auth);

describe("Plan", () => {
    let token: string;
    let planId: string;
    let planTypeId: string;
    let tenantId: string;

    beforeAll(async (done) => {
        try {
            await AuthUtils.setup();
            const user: CognitoUser = await Auth.signIn(AuthUtils.globalAdmin);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            tenantId = AuthUtils.accountAdmin.attributes["custom:tenantId"];
            let planName = `Test PlanType - ${Math.random()}`
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
            let response = await ApiHelper.makeRequest("addPlanType", addPlanType, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy();
            hasErrors && done.fail(errors[0].message);
            expect(parsed).toBeDefined();
            planTypeId = parsed.id;
            done();
        } catch (error) {
            console.error("spec.plan - beforeAll - ERROR", error);
            done.fail(error);
        }
    }, 60000);

    afterAll(async (done) => {
        // Hard delete from dynamo
        let client = new AWS.DynamoDB.DocumentClient();
        try {
            const rdsCommonParams = {
                database: config['Service'],
                resourceArn: config['DBClusterId'],
                secretArn: config['DBSecretARN']
            };
            let client = new AWS.RDSDataService();
            await client.executeStatement({
                ...rdsCommonParams, sql : `DELETE FROM Plan where id='${planId}}'`
            }).promise();
            await client.executeStatement({
                ...rdsCommonParams, sql : `DELETE FROM PlanType where id='${planTypeId}}'`
            }).promise();
            done();
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
            let response = await ApiHelper.makeRequest("addPlan", addPlan, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);

            expect(parsed).toBeDefined();
            planId = parsed.id;
            expect(parsed.accountId).toEqual(tenantId);
            expect(parsed.planTypeId).toEqual(planTypeId);
            expect(parsed).toBeDefined();
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
            let response = await ApiHelper.makeRequest("updatePlan", updatePlan, token);
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
            let response = await ApiHelper.makeRequest("deletePlan", deletePlan, token);
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