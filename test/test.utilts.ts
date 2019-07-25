import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { MailSlurp } from "mailslurp-client";
import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';
import { Inbox } from 'mailslurp-swagger-sdk-ts';
import { reject } from 'async';
const config = require("../outputs/stack.json");
const mailSlurp = new MailSlurp({ apiKey: "85117a16750ebeb8c6e659c6e9984ac0290557c2dfa90df89d54fc72b170ac8a" })


const tenant = `Forms.li QA`;
const password = "P@ssword1";

class TestUtils {
    private static __instance : TestUtils;
    private static globalAdmin;
    private static accountAdmin;
    private static accountEditor;
    private static accountViewer;
    private static initialized: boolean = false;

    private constructor() {

    }

    static getInstance() {
        if(!TestUtils.__instance) {
            TestUtils.__instance = new TestUtils();
        }
        return TestUtils.__instance;
    }

    async initialized() {
        return new Promise(async (resolve, reject) => {
            try {

            } catch (error) {
                reject(error);
            }
        })
    }

    async setupTenant() : Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let inbox = await mailSlurp.createInbox();
                await Auth.signUp({
                    username: inbox.emailAddress,
                    password: password,
                    attributes : {
                        "custom:tenantName": tenant
                    }
                });
                const emails = await mailSlurp.getEmails(inbox.id, { minCount: 1 })
                let email = await mailSlurp.getEmail(emails[0].id);
                let verificationCode = email.body;
                await Auth.confirmSignUp(inbox.emailAddress, verificationCode, {
                    forceAliasCreation: true
                });
                resolve({username: inbox.emailAddress, password: password});
            } catch (error) {
                reject(error);
            }
        });
    }


}