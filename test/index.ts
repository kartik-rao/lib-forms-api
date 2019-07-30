import {AuthUtils} from "./auth.utils";
(async () => {
    await AuthUtils.setup();
    const testsContext = require.context(".", true, /spec.plantypes.ts/);
    testsContext.keys().forEach(testsContext);
})();