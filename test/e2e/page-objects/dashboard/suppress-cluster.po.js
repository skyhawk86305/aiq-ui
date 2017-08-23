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

module.exports = class SuppressClusterForm {
  constructor() {
    this.el = element(by.css('suppress-cluster'));

    this.suppressClusterButton = element(by.id('suppress-cluster-button'));

    this.clusterIDInput = new TextInput('clusterID');
    this.durationSelect = new SelectInput('duration');
    this.customDurationInput = this.el.element(by.css('sf-date-time-selector input'));
    this.customDurationCalendarDays = this.el.all(by.css('sf-date-time-selector .calendar-day'))
      .filter( el => el.isDisplayed() );
    this.customDurationApplyButton = this.el.element(by.cssContainingText('sf-date-time-selector button', 'Apply'));

    this.nextButton = this.el.element(by.cssContainingText('button', 'Next'));
    this.suppressButton = this.el.element(by.cssContainingText('button', 'Suppress'));
    this.cancelButton = this.el.element(by.cssContainingText('button', 'Cancel'));

    this.successMessage = element(by.cssContainingText('sf-table-message-banner', 'successfully suppressed'));
    this.errorMessage = element(by.cssContainingText('sf-table-message-banner', 'Unable to suppress'));
  }
};
