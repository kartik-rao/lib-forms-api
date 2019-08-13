import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ApiHelper } from "./api.utils";
import { AuthUtils } from "./auth.utils";
import * as AWS from 'aws-sdk';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const config = require("../outputs/stack.dev.json");

Auth.configure(ApiHelper.apiConfig().Auth);

describe("Plan", () => {
    let token: string;
    let planId: string;
    let planVersion: number;
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
                    active: true
                })
                {id, name, billingTerm, cost, version, createdAt, updatedAt}
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
    });

    afterAll(async (done) => {
        // Hard delete from dynamo
        let client = new AWS.DynamoDB.DocumentClient();
        try {
            await client.delete({TableName : config["AppDataTable"], Key: {id: planTypeId, itemType: "PLANTYPE"}}).promise();
            await Auth.signOut();
            done();
        } catch (error) {
            console.error("spec.plan - afterAll - ERROR", error);
            done.fail(error);
        }
    });


    it("Add", async (done) => {
        const addPlan = {query: `mutation {
            addPlan (input: {
                accountId: "${tenantId}",
                planTypeId: "${planTypeId}"
            })
            {id, startDate, endDate, active, planTypeId, accountId, createdAt, updatedAt, version}
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
            planVersion = parsed.version;
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
            {id, planType {id name cost}, version, createdAt, updatedAt}
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
                id: "${planId}",
                active: false,
                expectedVersion: ${planVersion}
            })
            {id, version, active, updatedAt, version}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("updatePlan", updatePlan, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            expect(parsed).toBeDefined("Response.data should exist");
            expect(parsed.active).toBeFalsy();
            expect(parsed.version).toBeGreaterThan(planVersion);
            planVersion = parsed.version;
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
            {id, isDeleted, active, updatedAt, version}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("deletePlan", deletePlan, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);

            expect(parsed).toBeDefined("Response.data should exist");
            expect(parsed.isDeleted).toBeTruthy();
        } catch (error) {
            fail(error);
        }
        done();
    });
});