import Auth from '@aws-amplify/auth';
import * as AWS from 'aws-sdk';
import { IDeletePlanTypeMutation, IUpdatePlanTypeMutation } from '../../client';
import { IAddPlanTypeMutation, IListPlanTypesQuery } from '../../client/lib';
import { ApiHelper } from "./common/api.utils";
import { AuthUtils } from "./common/auth.utils";
import { loadConfiguration, SSMConfig } from "./common/config";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("PlanType", () => {
    let token: string;
    let planTypeId: string;
    let config: SSMConfig;

    beforeAll(async (done) => {
        try {
            config = await loadConfiguration();
            let apiConfig = ApiHelper.apiConfig(config);
            Auth.configure(apiConfig);
            await AuthUtils.setup();
            await Auth.signIn(AuthUtils.globalAdmin);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            done();
        } catch (error) {
            console.error("spec.plantypes - beforeAll - ERROR", error);
            done.fail(error);
        }
    }, 60000);

    afterAll(async (done) => {
        // Hard delete from rds
        const rdsCommonParams = {
            database: "formsli",
            resourceArn: config["rds/arn"],
            secretArn: config["rds/password/secret"]
        } as AWS.RDSDataService.ExecuteStatementRequest;
        let client = new AWS.RDSDataService({region: config["app/region"]});
        await client.executeStatement({
            ...rdsCommonParams, sql : `DELETE FROM PlanType where name = 'spec.plantype'`
        }).promise();
        done();
    }, 10000);

    it("Add", async (done) => {
        let planName = `spec.plantype`
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
            let response = await ApiHelper.makeRequest<IAddPlanTypeMutation>(config, addPlanType, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);
            expect(response.data.addPlanType).toBeDefined();
            let planType = response.data.addPlanType;
            expect(planType.id).toBeDefined();
            planTypeId = planType.id;
            expect(planType.name).toEqual(planName);
            expect(planType.billingTerm).toEqual("Monthly");
            expect(planType.cost).toEqual(50.0);
            expect(planType.active).toBeFalsy();
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
            let response = await ApiHelper.makeRequest<IListPlanTypesQuery>(config, listPlanTypes, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);
            expect(response.data.listPlanTypes).toBeDefined();
            expect(response.data.listPlanTypes.length).toBeGreaterThan(0);
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
            let response = await ApiHelper.makeRequest<IUpdatePlanTypeMutation>(config, updatePlanType, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);
            let planType = response.data.updatePlanType;
            expect(planType).toBeDefined("Response.data should exist");
            expect(planType.billingTerm).toEqual("Quarterly");
            expect(planType.cost).toEqual(150.0);
            expect(planType.active).toBeTruthy();
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
            let response = await ApiHelper.makeRequest<IDeletePlanTypeMutation>(config, deletePlanType, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);
            expect(response.data.deletePlanType).toBeDefined("Response.data should exist");
            // TODO : Get the item again and check isDeleted and active
        } catch (error) {
            fail(error);
        }
        done();
    });
});