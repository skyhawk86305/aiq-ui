exports.config = {

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  // seleniumAddress: 'http://192.168.129.176:4444/wd/hub',
  capabilities: {
    'browserName': 'firefox'
  },

  params: {
    withMocks: false,
    authUsername: 'admin',
    authPassword: 'admin',
    ip: '192.168.139.178',
    port: ':442',
    apiVersion: '#9.0',
    path: 'node/develop'
  },
   baseUrl : "https://admin:admin@192.168.139.178:442/node/develop/index.htm#",
  // baseUrl : "https://"+ exports.config.params.authUsername+":"+ exports.config.params.authPassword+"@"+ exports.config.params.ip+"/"+ exports.config.params.path+"/index.htm#",

  onPrepare: function() {
    browser.driver.manage().window().setSize(1680, 1050);
  },

  cucumberOpts: {
    require: [
      'features/step_definitions/**/*.js',
      'features/support/**/*.js'
    ],
    format: "json",
    tags: "~@ignore"
  }
};
