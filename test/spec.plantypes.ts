import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ApiHelper } from "./api.utils";
import { AuthUtils } from "./auth.utils";
import * as AWS from 'aws-sdk';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const config = require("../outputs/stack.dev.json");

Auth.configure(ApiHelper.apiConfig().Auth);

describe("PlanType", () => {
    let token: string;
    let planTypeId: string;
    let planTypeVersion: number;

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
    });

    afterAll(async (done) => {
        // Hard delete from dynamo
        let client = new AWS.DynamoDB.DocumentClient();
        try {
            console.log(`DELETING [${planTypeId}]`)
            await client.delete({TableName : config["AppDataTable"], Key: {id: planTypeId, itemType: "PLANTYPE"}}).promise();
            await Auth.signOut();
            done();
        } catch (error) {
            console.error("spec.plantypes - afterAll - ERROR", error);
            done.fail(error);
        }
    });

    it("Add", async (done) => {
        let planName = `Test Plan - ${Math.random()}`
        const addPlanType = {query: `mutation {
            addPlanType (input: {
                name: "${planName}",
                billingTerm: "Monthly",
                cost: 50,
                active: false
            })
            {id, name, billingTerm, cost, version, createdAt, updatedAt}
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
            planTypeVersion = parsed.version;
            expect(parsed).toBeDefined();
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
                listPlanTypes(filter:{active: {eq: true}}) {
                    items {
                    id,
                    name,
                    cost
                    },
                    nextToken
                }
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
                active: true,
                expectedVersion: ${planTypeVersion}
            })
            {id, name, billingTerm, cost, active, updatedAt, version}
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
            {id, name, isDeleted, cost, billingTerm, active, updatedAt, version}
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