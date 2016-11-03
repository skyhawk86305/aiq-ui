'use strict';

var HttpBackend = require('httpbackend');
var chai = require('chai');
var request = require('request');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var supportObject = {
  expect: chai.expect,
  mockBackend: {
    http: null,
    enable: function(browser) {
      this.http = new HttpBackend(browser);
      this.http.whenGET(/tpl.html/).passThrough();
    },
    disable: function() {
      this.http.clear();
    }
  },
  getActiveElement: function() {
    return browser.driver.switchTo().activeElement();
  },
  logout: function (callback) {
    request.delete(browser.baseUrl + '/sessions', callback);
  },
  login: function (callback) {
    var params = {username: 'testuser@solidfire.com', password: new Buffer('password123').toString('base64')};
    return request({
      method: 'PUT',
      uri: browser.baseUrl + '/sessions',
      json: true,
      body: params
    }, callback());
  }
};

module.exports = supportObject;
