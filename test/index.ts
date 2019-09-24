import {AuthUtils} from "./auth.utils";
(async () => {
    await AuthUtils.setup();
    const testsContext = require.context(".", true, /spec.*.ts/);
    testsContext.keys().forEach(testsContext);
})();