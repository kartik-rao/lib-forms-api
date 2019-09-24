import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ApiHelper } from "./api.utils";
import { AuthUtils } from "./auth.utils";

const TWO_MINS = 120000;
const TEN_SECONDS = 10000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = TEN_SECONDS;

Auth.configure(ApiHelper.apiConfig().Auth);

describe("Account", () => {
    let token: string;
    let userAttributes: any;
    let tenantId: string;
    let tenantName: string;

    beforeAll(async (done) => {
        try {
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
            let response = await ApiHelper.makeRequest("getAccount", getAccount, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            expect(parsed).toBeDefined();
            expect(parsed.id).toEqual(tenantId);
            expect(tenantName).toContain(parsed.name);
            expect(parsed.ownedBy).toBeDefined("Must include subfield ownedBy")
            expect(parsed.numForms).toBeDefined("Must include subfield numForms")
            expect(parsed.numUsers).toBeDefined("Must include subfield numUsers")
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
            let response = await ApiHelper.makeRequest("listAccounts", listAccounts, token);
            let {status, parsed, hasErrors, errors} = response;
            expect(status).toEqual(200);
            expect(hasErrors).toBeTruthy("Should not succeed");
            expect(errors[0]['errorType']).toEqual("Unauthorized")
            expect(parsed == null).toBeTruthy();
        } catch (error) {
            fail(error);
        } finally {
            await Auth.signOut();
        }
        done();
    });

    it("List (as Admin)", async(done) => {
        const listAccounts = {
            query: `query {
                listAccounts { id, name }
            }`}

        try {
            const user: CognitoUser = await Auth.signIn(AuthUtils.globalAdmin);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            let response = await ApiHelper.makeRequest("listAccounts", listAccounts, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);
            expect(parsed).toBeDefined();
            expect(parsed).toBeDefined();
            expect(parsed.length).toBeGreaterThan(0);
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });
});