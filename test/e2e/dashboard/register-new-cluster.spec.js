'use strict';

const support = require('../support.js');
const mockBackend = support.mockBackend;
const expect = support.expect;
const RegisterNewClusterPage = require('../page-objects/dashboard/register-new-cluster.po');
const page = new RegisterNewClusterPage();

describe('The register new cluster page', function() {
  beforeEach(function() {
    mockBackend.enable(browser);
    mockBackend.http.whenGET('/sessions').respond( () => [200, {}] );
  });

  afterEach(function() {
    mockBackend.disable();
  });

  it('@any @smoke should handle the happy path of registering a new cluster', function() {
    mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, {
      result: {
        // GetUserInfo
        user: {
          userID: 12345,
          username: "john.doe@netapp.com",
          permissions: [ 'internalAdmin' ] ,
        },
        // GetCustomer
        customer: {
          customerName: 'testCustomer',
        },
        // RegisterCluster
        clusterID: 12345,
      }
    }]);
    mockBackend.http.whenPOST('https://1-2-3-4.ip.solidfire.net/json-rpc/2.0').respond( () => [200, {
      result: {
        clusterInfo: { name: 'testCluster', uuid: 'fake-cluster-uuid' },
      },
    }]);
    browser.get('#/dashboard/registerCluster');

    expect(page.clusterMVIP.isDisplayed()).to.eventually.be.true;
    expect(page.backButton.isDisplayed()).to.eventually.be.false;
    expect(page.nextButton.isEnabled()).to.eventually.be.false;
    page.clusterMVIP.sendKeys('1.2.3.4');
    expect(page.nextButton.isEnabled()).to.eventually.be.true;
    page.nextButton.click();

    expect(page.clusterUsername.isDisplayed()).to.eventually.be.true;
    expect(page.clusterPassword.isDisplayed()).to.eventually.be.true;
    expect(page.backButton.isDisplayed()).to.eventually.be.true;
    expect(page.nextButton.isEnabled()).to.eventually.be.false;
    page.clusterUsername.sendKeys('testUser');
    page.clusterPassword.sendKeys('testPassword');
    expect(page.nextButton.isEnabled()).to.eventually.be.true;
    page.nextButton.click();

    expect(page.customerUID.isDisplayed()).to.eventually.be.true;
    expect(page.backButton.isDisplayed()).to.eventually.be.true;
    expect(page.nextButton.isEnabled()).to.eventually.be.false;
    page.customerUID.sendKeys('fake-customer-uuid');
    expect(page.nextButton.isEnabled()).to.eventually.be.true;
    page.nextButton.click();

    expect(page.confirmationModal.el.isPresent()).to.eventually.be.true;
    page.confirmationModal.yes.click();

    expect(page.confirmationModal.el.isPresent()).to.eventually.be.false;
    expect(page.successMessage.isDisplayed()).to.eventually.be.true;
    expect(page.viewClusterButton.isDisplayed()).to.eventually.be.true;
    page.viewClusterButton.click();

    expect(browser.getCurrentUrl()).to.eventually.contain('/cluster/12345/reporting/overview');
  });

  it('@any @smoke should handle an inaccessible MVIP', function() {
    mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, {
      result: {
        // GetUserInfo
        user: {
          userID: 12345,
          username: "john.doe@netapp.com",
          permissions: [ 'internalAdmin' ] ,
        },
      }
    }]);
    mockBackend.http.whenPOST('https://1-2-3-4.ip.solidfire.net/json-rpc/2.0')
      .respond( () => [500, 'random error']);
    browser.get('#/dashboard/registerCluster');

    page.clusterMVIP.sendKeys('1.2.3.4');
    page.nextButton.click();

    expect(page.errorMessage.isDisplayed()).to.eventually.be.true;
    expect(page.errorMessage.getText()).to.eventually.include(
      'The cluster information was not retrievable. Ensure you have access to the cluster MVIP.'
    );
  });

  it('@any @smoke should handle a failure to authenticate to the cluster', function() {
    mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, {
      result: {
        // GetUserInfo
        user: {
          userID: 12345,
          username: "john.doe@netapp.com",
          permissions: [ 'internalAdmin' ] ,
        },
      }
    }]);
    mockBackend.http.whenPOST('https://1-2-3-4.ip.solidfire.net/json-rpc/2.0')
      .respond( () => [401, 'not authenticated']);
    browser.get('#/dashboard/registerCluster');

    page.clusterMVIP.sendKeys('1.2.3.4');
    page.nextButton.click();
    page.clusterUsername.sendKeys('testUser');
    page.clusterPassword.sendKeys('testPassword');
    page.nextButton.click();

    expect(page.errorMessage.isDisplayed()).to.eventually.be.true;
    expect(page.errorMessage.getText()).to.eventually.include(
      'The cluster information was not retrievable. Ensure you have entered the correct credentials.'
    );
  });

  it('@any @smoke should handle a cluster that is already registered', function() {
    mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, {
      result: {
        // GetUserInfo
        user: {
          userID: 12345,
          username: "john.doe@netapp.com",
          permissions: [ 'internalAdmin' ] ,
        },
        // GetCustomer
        customer: {
          customerName: 'testCustomer',
        },
        // RegisterCluster and FindCluster
        clusterID: 12345,
        // FindCluster
        customerID: 234,
      }
    }]);
    mockBackend.http.whenPOST('https://1-2-3-4.ip.solidfire.net/json-rpc/2.0').respond( () => [200, {
      result: {
        clusterInfo: { name: 'testCluster', uuid: 'fake-cluster-uuid' },
      },
    }]);
    browser.get('#/dashboard/registerCluster');

    page.clusterMVIP.sendKeys('1.2.3.4');
    page.nextButton.click();
    page.clusterUsername.sendKeys('testUser');
    page.clusterPassword.sendKeys('testPassword');
    page.nextButton.click();

    expect(page.errorMessage.isDisplayed()).to.eventually.be.true;
    expect(page.errorMessage.getText()).to.eventually.include('The cluster is already registered with a customer account.');
    expect(page.errorMessage.element(by.css('a')).getAttribute('href')).to.eventually.include('/cluster/12345/reporting/overview');
  });

});

