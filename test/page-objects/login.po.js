'use strict';

var LoginComponent = function () {
  this.el = element(by.css('.login-form'));
  this.usernameInput = {
    enter: function(input) {
      var usernameInput = element(by.id('username-input'));
      return usernameInput.clear().then(function() { usernameInput.sendKeys(input); });
    }
  };
  this.passwordInput = {
    enter: function(input) {
      var passwordInput = element(by.id('password-input'));
      return passwordInput.clear().then(function() { passwordInput.sendKeys(input); });
    }
  };
  this.loginButton = {
    el: element(by.css('.login-btn')),
    click: function() {
      element(by.css('.login-btn')).click();
    }
  };
  this.errorMessage = element(by.css('.login-error.error-message'));
};

module.exports = LoginComponent;