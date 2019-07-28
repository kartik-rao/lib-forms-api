
const testsContext = require.context(".", true, /spec.plantypes.ts/);
testsContext.keys().forEach(testsContext);