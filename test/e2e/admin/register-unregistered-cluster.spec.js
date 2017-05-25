'use strict';

const support = require('../support.js');
const expect = support.expect;
const RegisterUnregisteredClusterModal = require('../page-objects/admin/register-unregistered-cluster.po');
const modal = new RegisterUnregisteredClusterModal();

describe('The register unregistered cluster modal', function() {
  beforeAll(function() {
    support.login();
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function() {
    browser.get('#/admin/unregisteredClusters');
    const registerClusterButton = element(by.css('.register-cluster-button'));
    expect(registerClusterButton.isPresent()).to.eventually.be.true;
    registerClusterButton.click();
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should allow registration with a valid customer', function() {
    expect(modal.customerName.isPresent()).to.eventually.be.true;
    expect(modal.registerButton.isEnabled()).to.eventually.be.false;
    modal.customerName.sendKeys('Solid\t'); // should autocomplete from ListCustomers fixture
    expect(modal.customerName.getAttribute('value')).to.eventually.equal('SolidFire Internal');
    expect(modal.registerButton.isEnabled()).to.eventually.be.true;
    modal.registerButton.click();
    expect(modal.confirmationModal.el.isPresent()).to.eventually.be.true;
    modal.confirmationModal.yes.click();
    expect(modal.confirmationModal.el.isPresent()).to.eventually.be.false;
    expect(modal.el.isPresent()).to.eventually.be.false;
  });

  it('@any @smoke should show an error if the entered customer is not valid', function() {
    modal.customerName.sendKeys('not a real customer');
    expect(modal.registerButton.isEnabled()).to.eventually.be.true;
    modal.registerButton.click();
    expect(modal.confirmationModal.el.isPresent()).to.eventually.be.false;
    expect(modal.errorMessage.isDisplayed()).to.eventually.be.true;
    expect(modal.errorMessage.getText()).to.eventually.include('Customer not found');
  });
});
