require('isomorphic-fetch');
import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
const config = require("../outputs/stack.json");

var crypto = require('crypto');

describe("Cognito", () => {
    beforeAll( async () => {
      Amplify.configure({
        Auth: {
          region: 'ap-southeast-2',
          userPoolId: config["UserPoolId"],
          userPoolWebClientId: config["UserPoolClientId"]
        }
      });

    })

    afterAll(async (done) => {
        await Auth.signOut();
        done();
    })

    it("can sign in as Admin user", async () => {
        const user = await Auth.signIn(config["UserPoolAdminUser"], "Pd8Ohek..");
        expect(user).toBeDefined();
    });

    it("can setup a new account", async () => {
        let prefix = `${Math.random() * 1e6}`.split(".")[0]
        let email = `${prefix}@mailinator.com`
        const response = await Auth.signUp({
            username: email,
            password: `P@ssword1`
        });

    })
});