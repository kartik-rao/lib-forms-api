import Auth from '@aws-amplify/auth';
import { ApiHelper } from "./api.utils";
import { AuthUtils } from "./auth.utils";
import { loadConfiguration, SSMConfig } from "./config";

export async function configure() : Promise<SSMConfig> {
    return new Promise(async (resolve, reject) => {
        try {
            let config = await loadConfiguration();
            let apiConfig = ApiHelper.apiConfig(config);
            Auth.configure(apiConfig);
            await AuthUtils.setup();
            resolve(config);
        } catch (error) {
            reject(error);
        }
    });
}