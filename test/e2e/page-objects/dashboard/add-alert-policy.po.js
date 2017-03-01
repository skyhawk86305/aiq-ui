'use strict';

class SelectInput {
  constructor(name) {
    this.el = element(by.css(`select[name="${name}"]`));
  }
  choose(label) {
    return this.el.element(by.cssContainingText('option', label)).click();
  }
}

class TextInput {
  constructor(name) {
    this.el = element(by.css(`input[name="${name}"]`));
  }
  enter(text) {
    return this.el.clear().then( () => {
      this.el.sendKeys(text);
      this.el.sendKeys('\t');
    });
  }
}

module.exports = class AddAlertPolicy {

  constructor() {
    this.el = element(by.css('.add-alert-policy-page'));

    this.policyTypeSelect = new SelectInput('policyType');
    this.policyNameInput = new TextInput('name');
    this.severitySelect = new SelectInput('severity');
    this.emailsInput = new TextInput('emails');

    this.clusterSelect = new SelectInput('clusterID');
    this.customerSelect = new SelectInput('customerID');

    this.clusterFaultTypeSelect = new SelectInput('clusterFaultType');
    this.eventTypeSelect = new SelectInput('eventType');
    this.clusterUtilizationThresholdInput = new TextInput('clusterUtilizationThreshold');
    this.usableSpaceThresholdInput = new TextInput('usableSpaceThreshold');
    this.provisionableSpaceThresholdInput = new TextInput('provisionableSpaceThreshold');
    this.collectorNotReportingTimeInput = new TextInput('collectorNotReportingTime');
    this.driveWearThresholdInput = new TextInput('driveWearThreshold');
    this.driveWearTypeSelect = new SelectInput('driveWearType');
    this.sessionsThresholdInput = new TextInput('sessionsThreshold');
    this.capacityLicensingThresholdInput = new TextInput('capacityLicensingThreshold');

    this.cancelButton = element(by.css('button.cancel'));
    this.submitButton = element(by.css('button[type="submit"]'));

    this.successMessage = element(by.css('.success-message'));
    this.errorMessage = element(by.css('.error-message'));
  }
};
