'use strict';

var LogoutPage = function () {
  this.isLoaded = function() { return this.message.isPresent(); }
  this.message = element(by.id('message'));
  this.loginLink = element(by.css('.action > a'));
};

module.exports = LogoutPage;
