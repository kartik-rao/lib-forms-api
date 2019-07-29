import {TestUtils} from "./test.utils";
import apiConfig from "./api.utils";

import Auth, { CognitoUser } from '@aws-amplify/auth';
import {CognitoIdentityServiceProvider} from 'aws-sdk';
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
const initiateAuth = async ({ clientId, username, password }) => cognitoIdentityServiceProvider.initiateAuth({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  }).promise();

import * as url from 'url';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
const config = require("../outputs/stack.dev.json");

Auth.configure(apiConfig.Auth);

describe("PlanType", () => {
    const endpoint = url.parse(config["GraphQlApiUrl"]);

    beforeAll(async (done) => {
        await TestUtils.setup();
        done();
    });

    afterAll(async (done) => {
        done();
    });

    describe("Queries", () => {
        let user: CognitoUser;
        let token: string;

        beforeAll(async(done) => {
            let {username, password} = TestUtils.accountAdmin;
            user = await Auth.signIn(username, password);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            done();
        });

        afterAll( async (done) => {
            await Auth.signOut();
            done();
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

                const response = await fetch(endpoint.href, options);
                expect(response.status).toEqual(200);
                const { data } = await response.json();
                console.log("List.Response Data", data);
                expect(data.listAllActivePlanTypes).toBeDefined();
                expect(data.listAllActivePlanTypes.items).toBeDefined();
                done();
            } catch (error) {
                fail(error);
            }
        });
    });

    describe("Mutations", () => {
        let user: CognitoUser;
        let token: string;
        let planId: string;
        let planVersion;
        beforeAll(async (done) => {
            user = await Auth.signIn(TestUtils.globalAdmin);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            done();
        });

        afterAll(async (done) => {
            // REMOVE THIS TEST PLAN
            await Auth.signOut();
            done();
        });

        it("Security", async (done) => {
            done();
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
                const options = {
                    method: 'POST',
                    body: JSON.stringify(addPlanType),
                    headers: {
                      host: endpoint.host,
                      'Content-Type': 'application/json',
                      Authorization: token,
                    },
                };

                const response = await fetch(endpoint.href, options);
                expect(response.status).toEqual(200);
                const { data } = await response.json();
                expect(data).toBeDefined();
                planId = data.addPlanType.planId;
                planVersion = data.addPlanType.planVersion;
                expect(data.addPlanType).toBeDefined();
                expect(data.addPlanType.name).toEqual(planName);
                expect(data.addPlanType.billingTerm).toEqual("Monthly");
                expect(data.addPlanType.cost).toEqual(50.0);
                expect(data.addPlanType.active).toBeFalsy();
                done();
            } catch (error) {
                fail(error);
            }
        });

        it("Update", async (done) => {
            let planName = `Test Plan - ${Math.random()}`
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

                const response = await fetch(endpoint.href, options);
                expect(response.status).toEqual(200);
                const { data } = await response.json();
                expect(data).toBeDefined();
                expect(data.updatePlanType).toBeDefined();
                expect(data.updatePlanType.billingTerm).toEqual("Quarterly");
                expect(data.addPlanType.cost).toEqual(150.0);
                expect(data.addPlanType.active).toBeTruthy();
                done();
            } catch (error) {
                fail(error);
            }
        });

        it("Delete", async (done) => {
            done();
        });

    });

})