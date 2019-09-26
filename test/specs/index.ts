import {AuthUtils} from "./common/auth.utils";
import {loadConfiguration} from "./common/config";

(async () => {
    console.log("Test Setup - SSM Config");
    console.log("Test Setup - Auth Utils");
    let configuration = await loadConfiguration();
    console.log(configuration);
    // await AuthUtils.setup();
    // const testsContext = require.context(".", true, /spec.*.ts/);
    // testsContext.keys().forEach(testsContext);
})();