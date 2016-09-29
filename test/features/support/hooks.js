/*jshint unused:false*/
'use strict';
var request = require('request');

var Hooks = function () {

  // Hooks execute before and after each scenario is executed
  // NOTE: if a scenario is to execute multiple hooks they will execute in their order on this file
  this.Before(function (scenario) {});
  this.After(function (scenario) {});

  // We can also build custom hooks for specific scenarios
  this.Before({tags:['@unauthenticatedUser, @login']},function (scenario, callback) {
    request.delete(browser.baseUrl + '/sessions', function() {
      callback();
    });
  });

  this.After({tags:['@unauthenticatedUser, @login, @logout']},function (scenario, callback) {
    var params = {username: 'testuser@solidfire.com', password: new Buffer('password123').toString('base64')};
    return request({
      method: 'PUT',
      uri: browser.baseUrl + '/sessions',
      json: true,
      body: params
    }, callback());
  });

  // We can also build custom hooks for specific scenarios
  this.Before({tags:['@mockBackend']},function (scenario) {
    this.mockBackend.enable(browser);
  });

  this.After({tags:['@mockBackend']},function (scenario) {
    this.mockBackend.disable();
  });

};

module.exports = Hooks;
