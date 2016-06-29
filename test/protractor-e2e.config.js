exports.config = {

  framework: 'jasmine',

  allScriptsTimeout: 60000,

  capabilities: {
    'browserName': 'firefox'
  },

  params: {},

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      savePath: './report/e2e/',
      takeScreenshots: true,
      takeScreenshotsOnlyOnFailures: true
    }));
    browser.driver.manage().window().maximize();
  },

  jasmineNodeOpts: {
    print: function() {}, // Override dots
    showColors: true
  }
};
