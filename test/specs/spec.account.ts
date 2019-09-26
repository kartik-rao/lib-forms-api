import Auth, { CognitoUser } from '@aws-amplify/auth';
import {loadConfiguration, SSMConfig} from "./common/config";
import { ApiHelper } from "./common/api.utils";
import { AuthUtils } from "./common/auth.utils";
import {IGetAccountQuery, IListAccountsQuery} from "../../client/index";

const TWO_MINS = 120000;
const TEN_SECONDS = 10000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = TEN_SECONDS;


describe("Account", () => {
    let config: SSMConfig;
    let token: string;
    let userAttributes: any;
    let tenantId: string;
    let tenantName: string;

    beforeAll(async (done) => {
        console.log("BEFORE ALL");
        try {
            config = await loadConfiguration();
            let apiConfig = ApiHelper.apiConfig(config);
            Auth.configure(apiConfig);
            await AuthUtils.setup();
            const user: CognitoUser = await Auth.signIn(AuthUtils.accountAdmin);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            userAttributes = await AuthUtils.loadUserAttributes(user);
            tenantId = userAttributes['custom:tenantId'];
            tenantName = userAttributes['custom:tenantName'];
            done();
        } catch (error) {
            console.error("spec.account - beforeAll - ERROR", error);
            done.fail(error);
        }
    }, TWO_MINS);

    afterAll(async (done) => {
        try {
            await Auth.signOut();
            done();
        } catch (error) {
            console.error("spec.account - afterAll - ERROR", error);
            done.fail(error);
        }
    }, TEN_SECONDS);

    it("Get", async (done) => {
        const getAccount = {query: `query {
            getAccount (accountId: "${tenantId}")
            {id, name, ownedBy {given_name, family_name}, numForms, numUsers}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest<IGetAccountQuery>(config, getAccount, token);
            let account = response.data.getAccount;
            let hasErrors = response.errors && response.errors.length > 0;

            expect(response.errors && response.errors.length > 0).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(response.errors[0].message);
            expect(account).toBeDefined();
            expect(account.id).toEqual(tenantId);
            expect(tenantName).toContain(account.name);
            expect(account.ownedBy).toBeDefined("Must include subfield ownedBy");
            expect(account.numForms).toBeDefined("Must include subfield numForms");
            expect(account.numUsers).toBeDefined("Must include subfield numUsers");
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });

    it("List (as AccountAdmin)", async(done) => {
        const listAccounts = {
            query: `query {
                listAccounts { id, name }
            }`}

        try {
            let response = await ApiHelper.makeRequest<IListAccountsQuery>(config, listAccounts, token);
            expect(response.errors).toBeTruthy();
            expect(response.errors[0].errorType).toBe("Unauthorized");
            done();
        } catch (error) {
            fail(error);
        } finally {
            await Auth.signOut();
        }
    });

    it("List (as Admin)", async(done) => {
        const listAccounts = {
            query: `query {
                listAccounts { id, name }
            }`}

        try {
            await Auth.signIn(AuthUtils.globalAdmin);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            let response = await ApiHelper.makeRequest<IListAccountsQuery>(config, listAccounts, token);
            let {errors} = response;
            let hasErrors = response.errors && response.errors.length > 0;
            hasErrors && done.fail(errors[0].message);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            expect(response.data).toBeDefined();
            expect(response.data.listAccounts).toBeDefined();
            expect(response.data.listAccounts.length).toBeGreaterThan(0);
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });
});