exports.config = {

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  allScriptsTimeout: 60000,

  capabilities: {
    'browserName': 'firefox'
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
