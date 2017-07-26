'use strict';

module.exports = class SSOLoginPage {
  constructor() {
    this.el = element(by.css('.login-form'));

    this.ssoLoginButton = element(by.cssContainingText('button', 'Sign in with NetApp'))

    this.aiqLoginButton = element(by.cssContainingText('button', 'Sign in with Active IQ'))

    this.pushModal = {
      el: element(by.css('.modal.sso-push-modal')),
      backdrop: element(by.css('.modal-backdrop')),
      closeButton: element(by.css('.aiq-modal-header .aiq-modal-close-button')),
      yesButton: element(by.css('.button-submit')),
      noButton: element(by.css('.button-cancel'))
    };
  }
}
