exports.config = {

  framework: 'jasmine',

  allScriptsTimeout: 5000000,

  capabilities: {
    'browserName': 'chrome'
  },

  params: {},

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
    var JasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      savePath: './report/e2e/',
      takeScreenshots: true,
      takeScreenshotsOnlyOnFailures: true
    }));
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
