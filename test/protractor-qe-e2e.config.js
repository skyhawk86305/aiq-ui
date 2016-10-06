exports.config = {

  framework: 'jasmine',

  seleniumAddress:"http://127.0.0.1:4444/wd/hub",

  baseUrl:"http://localhost:3001",

  capabilities: {
    'browserName': 'chrome'
  },
  specs : ["e2e/*.js","e2e/**/*.js"],

  params: {
    withMocks: false
  },

  onPrepare: function() {
    console.log(__dirname);
    var SpecReporter = require('jasmine-spec-reporter');
    var JasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: 'report/junit',
      filePrefix: 'e2e'
    }));
    browser.driver.manage().window().maximize();
  },

  jasmineNodeOpts: {
    print: function() {}, // Override dots
    showColors: true
  }
};
