'use strict';

var Hooks = function () {

  // Hooks execute before and after each scenario is executed
  // NOTE: if a scenario is to execute multiple hooks they will execute in their order on this file
  this.Before(function (scenario) {});
  this.After(function (scenario) {});

  // We can also build custom hooks for specific scenarios
  this.Before({tags:['@getConfig']},function (scenario, callback) {
    var self = this;
    self.sdk.api.getConfig().then(function(response) {
      self.responses.getConfig = response ? response.result : false;
      callback();
    });
  });

  this.After({tags:['@setConfig']},function (scenario, callback) {
    var originalConfig = this.responses.getConfig.config;
    this.sdk.api.setConfig({cluster: originalConfig.cluster, network: originalConfig.network})
    .then(function() { callback(); }).catch(callback);
  });

  this.After({tags:['@nonAngular']},function (scenario) {
    browser.ignoreSynchronization = false;
  });
};

module.exports = Hooks;
