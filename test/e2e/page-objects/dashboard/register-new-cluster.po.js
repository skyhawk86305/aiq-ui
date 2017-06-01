'use strict';

class ConfirmationModal {
  constructor() {
    this.el = element(by.css('.register-new-cluster-confirmation-modal'));
    this.yes = this.el.element(by.css('.button-submit'));
    this.no = this.el.element(by.css('.button-cancel'));
  }
}

module.exports = class RegisterNewClusterPage {
  constructor() {
    this.el = element(by.css('.register-cluster-page'));

    this.clusterMVIP = this.el.element(by.css('input[name="clusterMVIP"]'));
    this.clusterUsername = this.el.element(by.css('input[name="clusterUsername"]'));
    this.clusterPassword = this.el.element(by.css('input[name="clusterPassword"]'));
    this.customerUID = this.el.element(by.css('input[name="customerUID"]'));

    this.nextButton = this.el.element(by.css('.button-next'));
    this.backButton = this.el.element(by.css('.button-back'));
    this.viewClusterButton = this.el.element(by.css('.button-view-cluster'));
    this.successMessage = this.el.element(by.css('.success-message'));
    this.errorMessage = this.el.element(by.css('.error-message'));
    this.confirmationModal = new ConfirmationModal();
  }
}
