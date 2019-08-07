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
            await client.delete({TableName : config["FormEntriesTable"], Key: {id: planId, type: "PLANTYPE"}}).promise();
            await Auth.signOut();
            done();
        } catch (error) {
            console.error("spec.plan - afterAll - ERROR", error);
            done.fail(error);
        }
    });


    it("Add", async (done) => {
        let planName = `Test Plan - ${Math.random()}`

        const addPlanType = {query: `mutation {
            addPlan (input: {
                accountId: "${tenantId}",
                planTypeId: "${planTypeId}"
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
            planId = parsed.id;
            planVersion = parsed.version;
            expect(parsed).toBeDefined();
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });

    // it("List", async(done) => {
    //     const listAllActivePlanTypes = {
    //         query: `query {
    //             listAllActivePlanTypes {
    //                 items {
    //                 id,
    //                 name,
    //                 cost
    //                 },
    //                 nextToken
    //             }
    //         }`}

    //     try {
    //         let response = await ApiHelper.makeRequest("listAllActivePlanTypes", listAllActivePlanTypes, token);
    //         let {status, parsed, hasErrors, errors} = response;

    //         expect(status).toEqual(200);
    //         expect(hasErrors).toBeFalsy("Response should not have errors");
    //         hasErrors && done.fail(errors[0].message);
    //         expect(parsed).toBeDefined();
    //         expect(parsed.items).toBeDefined();

    //     } catch (error) {
    //         fail(error);
    //     }
    //     done();
    // });

    it("Update", async (done) => {
        const updatePlanType = {query: `mutation {
            updatePlanType (input: {
                id: "${planId}",
                billingTerm: "Quarterly",
                cost: 150,
                active: true,
                expectedVersion: ${planVersion}
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
            deletePlan (planId: "${planId}", accountId: "${tenantId}")
            {id, name, isDeleted, cost, billingTerm, active, updatedAt, version}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("deletePlan", deletePlanType, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);

            expect(parsed).toBeDefined("Response.data should exist");
            expect(parsed.cost).toEqual(150.0);
            expect(parsed.active).toBeFalsy();
            expect(parsed.isDeleted).toBeTruthy();
        } catch (error) {
            fail(error);
        }
        done();
    });
});