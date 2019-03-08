var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

var reporter = new SpecReporter({
    customProcessors: []
});

jasmine.getEnv().addReporter(reporter);