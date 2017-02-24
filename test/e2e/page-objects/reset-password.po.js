'use strict';

module.exports = class ResetPasswordPage {

  constructor() {
    this.el = element(by.css('.reset-password-page'));

    const emailInputEl = element(by.css('input[name="email"]'));
    this.emailInput = {
      el: emailInputEl,
      enter(input) {
        return emailInputEl.clear().then( () => {
          emailInputEl.sendKeys(input);
          emailInputEl.sendKeys('\t');
        });
      },
    };
    this.invalidEmailError = element(by.id('invalid-email-error'));

    this.sendEmailButton = element(by.id('send-email-button'));

    this.passwordResetEmailSentMessage = element(by.id('password-reset-email-sent-message'));
    this.passwordResetEmailErrorMessage = element(by.id('password-reset-email-error-message'));


    this.passwordResetUsernameNote = element(by.id('set-new-password-username-note'));

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

    this.setNewPasswordButton = element(by.id('set-new-password-button'));

    this.setNewPasswordSuccessMessage = element(by.id('set-new-password-success-message'));
    this.setNewPasswordErrorMessage = element(by.id('set-new-password-error-message'));
  }
};

