'use strict';

class ConfirmationModal {
  constructor() {
    this.el = element(by.css('.register-cluster-confirmation-modal'));
    this.yes = this.el.element(by.css('.button-submit'));
    this.no = this.el.element(by.css('.button-cancel'));
  }
}

module.exports = class RegisterUnregisteredClusterModal {

  constructor() {
    this.el = element(by.css('.register-cluster-modal'));
    this.customerName = this.el.element(by.css('input[name="customerName"]'));
    this.registerButton = this.el.element(by.css('.button-submit'));
    this.errorMessage = this.el.element(by.css('.banner-message-error'));
    this.confirmationModal = new ConfirmationModal();
  }
}
