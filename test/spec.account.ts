import Auth, { CognitoUser } from '@aws-amplify/auth';
import { ApiHelper } from "./api.utils";
import { AuthUtils } from "./auth.utils";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

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
            console.error("spec.plantypes - beforeAll - ERROR", error);
            done.fail(error);
        }
    });

    afterAll(async (done) => {
        try {
            await Auth.signOut();
            done();
        } catch (error) {
            console.error("spec.account - afterAll - ERROR", error);
            done.fail(error);
        }
    });

    it("Get", async (done) => {
        const getAccount = {query: `query {
            getAccount (accountId: "${tenantId}")
            {id, name}
            }
        `};

        try {
            let response = await ApiHelper.makeRequest("getAccount", getAccount, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            hasErrors && done.fail(errors[0].message);

            expect(parsed).toBeDefined();
            expect(parsed.name).toEqual(tenantName);
        } catch (error) {
            console.error(error);
            fail(error);
        }
        done();
    });

    it("List (as AccountAdmin)", async(done) => {
        const listAllAccounts = {
            query: `query {
                listAccounts {
                    items { id, name },
                    nextToken
                }
            }`}

        try {
            let response = await ApiHelper.makeRequest("listAccounts", listAllAccounts, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeTruthy("Should not succeed");
            expect(parsed == null).toBeTruthy();
        } catch (error) {
            fail(error);
        }
        done();
    });

    it("List (as Admin)", async(done) => {
        const listAllAccounts = {
            query: `query {
                listAccounts {
                    items { id, name },
                    nextToken
                }
            }`}

        try {
            const user: CognitoUser = await Auth.signIn(AuthUtils.globalAdmin);
            token = (await Auth.currentSession()).getIdToken().getJwtToken();
            let response = await ApiHelper.makeRequest("listAccounts", listAllAccounts, token);
            let {status, parsed, hasErrors, errors} = response;

            expect(status).toEqual(200);
            expect(hasErrors).toBeFalsy("Response should not have errors");
            expect(parsed).toBeDefined();
            expect(parsed.items).toBeDefined();
            expect(parsed.items.length).toBeGreaterThan(0);
        } catch (error) {
            fail(error);
        }
        done();
    });
});