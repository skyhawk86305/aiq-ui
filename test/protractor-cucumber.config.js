exports.config = {

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  seleniumAddress:"http://127.0.0.1:4444/wd/hub",

  baseUrl:"http://localhost:3001",

  allScriptsTimeout: 60000,

  capabilities: {
    'browserName': 'chrome'
  },

  params: {},

  onPrepare: function() {
    browser.driver.manage().window().maximize();
  },

  cucumberOpts: {
    require: [
      'features/step_definitions/**/*.js',
      'features/cucumber-support/*.js',
      'features/support/**/*.js'
    ],
    format: "json",
    tags: "~@ignore"
  }
};
