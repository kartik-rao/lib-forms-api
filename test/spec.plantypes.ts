import Auth, { CognitoUser } from '@aws-amplify/auth';
import * as url from 'url';
import { ApiHelper } from "./api.utils";
import { AuthUtils } from "./auth.utils";
import {GraphQLResponse} from "./types";
import * as AWS from 'aws-sdk';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
const config = require("../outputs/stack.dev.json");

Auth.configure(ApiHelper.apiConfig().Auth);

describe("PlanType", () => {
    const endpoint = url.parse(config["GraphQlApiUrl"]);
    let token: string;
    let planId: string;
    let planVersion: number;

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
            await client.delete({TableName : config["FormEntriesTable"], Key: {id: planId, type: "PLANTYPE"}}).promise();
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

        const options = {
            method: 'POST',
            body: JSON.stringify(addPlanType),
            headers: {
                host: endpoint.host,
                'Content-Type': 'application/json',
                Authorization: token,
            },
        };


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
            expect(parsed.name).toEqual(planName);
            expect(parsed.billingTerm).toEqual("Monthly");
            expect(parsed.cost).toEqual(50.0);
            expect(parsed.active).toBeFalsy();
            done();
        } catch (error) {
            console.error(error);
            fail(error);
        }
    });

    it("List", async(done) => {
        const listPlanTypes = {
            query: `query {
                listAllActivePlanTypes {
                    items {
                    id,
                    name,
                    cost
                    },
                    nextToken
                }
            }`}

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify(listPlanTypes),
                headers: {
                    host: endpoint.host,
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            };

            const res = await fetch(endpoint.href, options);
            expect(res.status).toEqual(200);
            const responseText = await res.text();
            const response = JSON.parse(responseText) as GraphQLResponse;
            const hasErrors = response.errors && response.errors.length > 0;
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(response.errors[0].message);

            let {data} = response;

            expect(data.listAllActivePlanTypes).toBeDefined();
            expect(data.listAllActivePlanTypes.items).toBeDefined();
            done();
        } catch (error) {
            fail(error);
        }
    });

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
            const options = {
                method: 'POST',
                body: JSON.stringify(updatePlanType),
                headers: {
                    host: endpoint.host,
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            };

            const res = await fetch(endpoint.href, options);
            expect(res.status).toEqual(200);

            const responseText = await res.text();
            const response = JSON.parse(responseText) as GraphQLResponse;
            const hasErrors = response.errors && response.errors.length > 0;
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(response.errors[0].message);

            let {data} = response;
            expect(data).toBeDefined("Response.data should exist");
            expect(data.updatePlanType).toBeDefined();
            expect(data.updatePlanType.billingTerm).toEqual("Quarterly");
            expect(data.updatePlanType.cost).toEqual(150.0);
            expect(data.updatePlanType.active).toBeTruthy();
            done();
        } catch (error) {
            done.fail(error);
        }
    });

    it("Delete", async (done) => {
        const deletePlanType = {query: `mutation {
            deletePlanType (id: "${planId}")
            {id, name, isDeleted, cost, billingTerm, active, updatedAt, version}
            }
        `};
        const options = {
            method: 'POST',
            body: JSON.stringify(deletePlanType),
            headers: {
                host: endpoint.host,
                'Content-Type': 'application/json',
                Authorization: token,
            },
        };

        try {
            const res = await fetch(endpoint.href, options);
            expect(res.status).toEqual(200);

            const responseText = await res.text();
            const response = JSON.parse(responseText) as GraphQLResponse;

            const hasErrors = response.errors && response.errors.length > 0;
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(response.errors[0].message);

            let {data} = response;
            expect(data).toBeDefined("Response.data should exist");
            expect(data.deletePlanType).toBeDefined();
            expect(data.deletePlanType.billingTerm).toEqual("Quarterly");
            expect(data.deletePlanType.cost).toEqual(150.0);
            expect(data.deletePlanType.active).toBeFalsy();
            expect(data.deletePlanType.isDeleted).toBeTruthy();
            done();
        } catch (error) {
            fail(error);
        }
    });
});