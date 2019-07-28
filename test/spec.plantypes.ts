import {TestUtils} from "./test.utils";
import * as apiConfig from "./api.utils";
import Amplify from '@aws-amplify/core';

Amplify.configure(apiConfig);
import  API, {graphqlOperation } from "@aws-amplify/api";

describe("PlanType", () => {
    beforeAll(async (done) => {
        await TestUtils.setup();
        done();
    });

    describe("mutation.add", () => {
        expect(true).toBeTruthy();

    });

    afterAll(async (done) => {
        await TestUtils.teardown();
    })
})