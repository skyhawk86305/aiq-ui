'use strict';

var LoginPage = function () {
  var page = this;
  
  page.el = element(by.css('.login-form'));

  page.loginAiqButton = element(by.css('.login-aiq-btn'));

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
  page.modal = {
    el: element(by.css('.modal.link-aiq-netapp-accounts-modal')),
    backdrop: element(by.css('.modal-backdrop')),
    closeButton: element(by.css('.aiq-modal-header .aiq-modal-close-button')),
    yesButton: element(by.css('.button-submit')),
    noButton: element(by.css('.button-cancel'))
  }
};

module.exports = LoginPage;
