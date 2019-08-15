import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ApiHelper } from "./api.utils";
import { AuthUtils } from "./auth.utils";
import * as AWS from 'aws-sdk';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
const config = require("../outputs/stack.dev.json");

Auth.configure(ApiHelper.apiConfig().Auth);

describe("PlanType", () => {
    let token: string;
    let planTypeId: string;

    beforeAll(async (done) => {
        try {
            await AuthUtils.setup();
            const user: CognitoUser = await Auth.signIn(AuthUtils.globalAdmin);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            done();
        } catch (error) {
            console.error("spec.plantypes - beforeAll - ERROR", error);
            done.fail(error);
        }
    }, 60000);

    afterAll(async (done) => {
        // Hard delete from dynamo
        const rdsCommonParams = {
            database: config['Service'],
            resourceArn: config['DBClusterId'],
            secretArn: config['DBSecretARN']
        };
        let client = new AWS.RDSDataService();
        await client.executeStatement({
            ...rdsCommonParams, sql : `DELETE FROM PlanType where id='${planTypeId}}'`
        }).promise();
        done();
    }, 10000);

    it("Add", async (done) => {
        let planName = `Test Plan - ${Math.random()}`
        const addPlanType = {query: `mutation {
            addPlanType (input: {
                name: "${planName}",
                billingTerm: "Monthly",
                cost: 50,
                active: 0
            })
            {id, name, billingTerm, cost, active, createdAt, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("addPlanType", addPlanType, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            expect(parsed).toBeDefined();
            planTypeId = parsed.id;
            expect(parsed.id).toBeDefined();
            expect(parsed.name).toEqual(planName);
            expect(parsed.billingTerm).toEqual("Monthly");
            expect(parsed.cost).toEqual(50.0);
            expect(parsed.active).toBeFalsy();
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });

    it("List", async(done) => {
        const listPlanTypes = {
            query: `query {
                listPlanTypes {id name ownedBy {id}}
            }`}

        try {
            let response = await ApiHelper.makeRequest("listPlanTypes", listPlanTypes, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            expect(parsed).toBeDefined();
            expect(parsed.items).toBeDefined();

        } catch (error) {
            fail(error);
        }
        done();
    });

    it("Update", async (done) => {
        const updatePlanType = {query: `mutation {
            updatePlanType (input: {
                id: "${planTypeId}",
                billingTerm: "Quarterly",
                cost: 150,
                active:1
            })
            {id, name, billingTerm, cost, active, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("updatePlanType", updatePlanType, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);

            expect(parsed).toBeDefined("Response.data should exist");
            expect(parsed.billingTerm).toEqual("Quarterly");
            expect(parsed.cost).toEqual(150.0);
            expect(parsed.active).toBeTruthy();
        } catch (error) {
            fail(error);
        }
        done();
    });

    it("Delete", async (done) => {
        const deletePlanType = {query: `mutation {
            deletePlanType (planTypeId: "${planTypeId}")
            {id, name, isDeleted, cost, billingTerm, active, updatedAt}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("deletePlanType", deletePlanType, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);

            expect(parsed).toBeDefined("Response.data should exist");
            expect(parsed.billingTerm).toEqual("Quarterly");
            expect(parsed.cost).toEqual(150.0);
            expect(parsed.active).toBeFalsy();
            expect(parsed.isDeleted).toBeTruthy();
        } catch (error) {
            fail(error);
        }
        done();
    });
});