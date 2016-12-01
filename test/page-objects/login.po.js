'use strict';

var LoginPage = function () {
  var page = this;
  
  page.el = element(by.css('.login-form'));
  page.usernameInput = {
    enter: function(input) {
      var usernameInput = element(by.id('username-input'));
      return usernameInput.clear().then(function() { usernameInput.sendKeys(input); });
    },
    click: function() {
      element(by.id('username-input')).click();
    }
  };
  page.passwordInput = {
    el: element(by.id('password-input')),
    enter: function(input) {
      var passwordInput = element(by.id('password-input'));
      return passwordInput.clear().then(function() { passwordInput.sendKeys(input); });
    },
    click: function() {
      element(by.id('password-input')).click();
    }
  };
  page.loginButton = {
    el: element(by.css('.login-btn')),
    click: function() {
      element(by.css('.login-btn')).click();
    }
  };
  page.errorMessage = element(by.css('.login-error.error-message'));
};

module.exports = LoginPage;
