/*jshint unused:false*/
'use strict';

var Hooks = function () {

  // Hooks execute before and after each scenario is executed
  // NOTE: if a scenario is to execute multiple hooks they will execute in their order on this file
  this.Before(function (scenario) {});
  this.After(function (scenario) {});

  // We can also build custom hooks for specific scenarios
  this.Before({tags:['@myTag']},function (scenario) {});
  this.After({tags:['@myTag']},function (scenario) {});

};

module.exports = Hooks;
