'use strict';

module.exports = class AccountPage {

  constructor() {
    this.el = element(by.css('.account-page'));

    const currentPasswordInputEl = element(by.css('input[name="currentPassword"]'));
    this.currentPassword = {
      el: currentPasswordInputEl,
      enter(input) {
        return currentPasswordInputEl.clear().then( () => {
          currentPasswordInputEl.sendKeys(input);
          currentPasswordInputEl.sendKeys('\t');
        });
      },
    };
    this.currentPasswordRequiredError = element(by.id('current-password-required-error'));
    this.currentPasswordIncorrectError = element(by.id('current-password-incorrect-error'));

    const newPasswordInputEl = element(by.css('input[name="newPassword"]'));
    this.newPassword = {
      el: newPasswordInputEl,
      enter(input) {
        return newPasswordInputEl.clear().then( () => {
          newPasswordInputEl.sendKeys(input);
          newPasswordInputEl.sendKeys('\t');
        });
      },
    };
    this.newPasswordRequiredError = element(by.id('new-password-required-error'));
    this.newPasswordMinLengthError = element(by.id('new-password-min-length-error'));
    this.newPasswordMaxLengthError = element(by.id('new-password-max-length-error'));
    this.newPasswordUpperCaseError = element(by.id('new-password-upper-case-error'));
    this.newPasswordNumberError = element(by.id('new-password-number-error'));

    const reenterNewPasswordInputEl = element(by.css('input[name="reenterNewPassword"]'));
    this.reenterNewPassword = {
      el: reenterNewPasswordInputEl,
      enter(input) {
        return reenterNewPasswordInputEl.clear().then( () => {
          reenterNewPasswordInputEl.sendKeys(input);
          reenterNewPasswordInputEl.sendKeys('\t');
        });
      },
    };
    this.reenterNewPasswordMatchError = element(by.id('reenter-new-password-match-error'));

    this.changePasswordButton = element(by.css('.change-password-form button'));

    this.successMessage = element(by.css('.success-message'));
    this.errorMessage = element(by.css('.error-message'));
  }
};
