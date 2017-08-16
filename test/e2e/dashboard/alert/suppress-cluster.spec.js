'use strict';

const support = require('../../support.js');
const expect = support.expect;
const SuppressClusterForm = require('../../page-objects/dashboard/suppress-cluster.po');
const page = new SuppressClusterForm();

describe('The suppress cluster form', function() {

  beforeAll(function() {
    support.login();
  });

  beforeEach(function() {
    browser.get('#/dashboard/alerts/suppressedClusters');
    browser.refresh();
    page.suppressClusterButton.click();
    expect(page.clusterIDInput.el.isDisplayed()).to.eventually.equal(true);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should handle the happy path of suppressing a cluster with the default duration', function() {
    expect(page.nextButton.isEnabled()).to.eventually.equal(false);
    page.clusterIDInput.enter('123');
    expect(page.nextButton.isEnabled()).to.eventually.equal(true);
    page.nextButton.click();
    expect(page.suppressButton.isDisplayed()).to.eventually.equal(true);
    expect(page.suppressButton.isEnabled()).to.eventually.equal(true);
    page.suppressButton.click();
    expect(page.successMessage.isDisplayed()).to.eventually.equal(true);
  });

  it('@any @smoke should handle suppressing a cluster with a non-default duration option', function() {
    page.clusterIDInput.enter('123');
    page.nextButton.click();
    page.durationSelect.choose('24 hours');
    page.suppressButton.click();
    expect(page.successMessage.isDisplayed()).to.eventually.equal(true);
  });

  it('@any @smoke should handle suppressing a cluster with a custom duration', function() {
    page.clusterIDInput.enter('123');
    page.nextButton.click();
    page.durationSelect.choose('Custom');
    expect(page.customDurationInput.isDisplayed()).to.eventually.equal(true);
    page.customDurationInput.click();
    page.customDurationCalendarDays.last().click();
    page.customDurationApplyButton.click();
    expect(page.suppressButton.isEnabled()).to.eventually.equal(true);
    page.suppressButton.click();
    expect(page.successMessage.isDisplayed()).to.eventually.equal(true);
  });

});
