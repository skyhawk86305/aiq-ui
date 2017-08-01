'use strict';

module.exports = class AIQLoginPage {
  constructor() {
    this.el = element(by.css('.login-form'));

    this.usernameInput = {
      enter(input) {
        const usernameInput = element(by.id('username-input'));
        return usernameInput.clear().then(() => {
          usernameInput.sendKeys(input);
        });
      },
      click() {
        element(by.id('username-input')).click();
      }
    };

    this.passwordInput = {
      el: element(by.id('password-input')),
      enter(input) {
        const passwordInput = element(by.id('password-input'));
        return passwordInput.clear().then(() => {
          passwordInput.sendKeys(input);
        });
      },
      click() {
        element(by.id('password-input')).click();
      }
    };

    this.loginButton = {
      el: element(by.css('.login-btn')),
      click() {
        element(by.css('.login-btn')).click();
      }
    };

    this.errorMessage = element(by.css('.login-error.error-message'));
  }
}
