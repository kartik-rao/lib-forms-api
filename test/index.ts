import {AuthUtils} from "./auth.utils";
(async () => {
    await AuthUtils.setup();
    const testsContext = require.context(".", true, /spec.plan.ts/);
    testsContext.keys().forEach(testsContext);
})();