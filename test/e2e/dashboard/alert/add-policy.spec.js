/* jshint expr: true */
'use strict';

const support = require('../../support.js');
const expect = support.expect;
const mockBackend = support.mockBackend;
const AddAlertPolicyPage = require('../../page-objects/dashboard/add-alert-policy.po');

const page = new AddAlertPolicyPage();

describe('Add Alert Policy form', function() {

  beforeEach(function() {
    mockBackend.enable(browser);
    mockBackend.http.whenGET('/sessions').respond( () => [200, {}] );
    browser.get('#/dashboard/alerts/policies/add');
    browser.wait( protractor.ExpectedConditions.presenceOf(page.submitButton),
      5000, 'Element taking too long to appear in the DOM');
  });

  afterEach(function() {
    mockBackend.disable();
  });

  it('should disable the submit button if all fields are empty', function() {
    expect(page.submitButton.isEnabled()).to.eventually.be.false;
  });

  it('should show a success message upon successful alert policy creation', function() {
      mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, {}] );
      page.policyTypeSelect.choose('Cluster Fault');
      page.policyNameInput.enter('test');
      page.submitButton.click();
      expect(page.successMessage.isDisplayed()).to.eventually.be.true;
  });

  it('should show an error message if alert policy creation is unsuccessful due to an HTTP error', function() {
      mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [503, 'service unavailable'] );
      page.policyTypeSelect.choose('Cluster Fault');
      page.policyNameInput.enter('test');
      page.submitButton.click();
      expect(page.errorMessage.isDisplayed()).to.eventually.be.true;
      expect(page.errorMessage.getText()).to.eventually.equal('Error: service unavailable');
  });

  it('should show an error message if alert policy creation is unsuccessful due to a JSON RPC error', function() {
      mockBackend.http.whenPOST('/json-rpc/2.0').respond( () => [200, { error: { message: 'bad request' } }] );
      page.policyTypeSelect.choose('Cluster Fault');
      page.policyNameInput.enter('test');
      page.submitButton.click();
      expect(page.errorMessage.isDisplayed()).to.eventually.be.true;
      expect(page.errorMessage.getText()).to.eventually.equal('Error: bad request');
  });

  describe('Cluster Fault policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('Cluster Fault');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'clusterSelect', 'clusterFaultTypeSelect' ]);
    });

    it('should enable the submit button when a policy name is entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  describe('Event policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('Event');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'clusterSelect', 'eventTypeSelect' ]);
    });

    it('should enable the submit button when a policy name is entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  describe('Failed Drive policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('Failed Drive');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'clusterSelect' ]);
    });

    it('should enable the submit button when a policy name is entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  describe('Available Drive policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('Available Drive');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'clusterSelect' ]);
    });

    it('should enable the submit button when a policy name is entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  describe('Cluster Utilization policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('Cluster Utilization');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'clusterSelect', 'clusterUtilizationThresholdInput' ]);
    });

    it('should enable the submit button when a policy name and cluster utilization are entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      page.clusterUtilizationThresholdInput.enter('42');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  describe('Usable Space policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('Usable Space');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'clusterSelect', 'usableSpaceThresholdInput' ]);
    });

    it('should enable the submit button when a policy name and usable space threshold are entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      page.usableSpaceThresholdInput.enter('42');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  describe('Provisionable Space policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('Provisionable Space');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'clusterSelect', 'provisionableSpaceThresholdInput' ]);
    });

    it('should enable the submit button when a policy name and provisionable space threshold are entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      page.provisionableSpaceThresholdInput.enter('42');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  describe('Collector Not Reporting policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('Collector Not Reporting');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'clusterSelect', 'collectorNotReportingTimeInput' ]);
    });

    it('should enable the submit button when a policy name and collector not reporting threshold are entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      page.collectorNotReportingTimeInput.enter('60');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  describe('Drive Wear policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('Drive Wear');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'clusterSelect', 'driveWearThresholdInput', 'driveWearTypeSelect' ]);
    });

    it('should enable the submit button when policy name and drive wear threshold are entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      page.driveWearThresholdInput.enter('40');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  describe('iSCSI Sessions policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('iSCSI Sessions');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'clusterSelect', 'sessionsThresholdInput' ]);
    });

    it('should enable the submit button when policy name and sessions threshold are entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      page.sessionsThresholdInput.enter('10');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  describe('Capacity Licensing policy type', function() {
    beforeEach(function() {
      page.policyTypeSelect.choose('Capacity Licensing');
    });

    it('should only display the expected form inputs', function() {
      assertOnlyInputsPresent([ 'customerSelect', 'capacityLicensingThresholdInput' ]);
    });

    it('should enable the submit button when policy name and licensing threshold are entered', function() {
      expect(page.submitButton.isEnabled()).to.eventually.be.false;
      page.policyNameInput.enter('test');
      page.capacityLicensingThresholdInput.enter('60');
      expect(page.submitButton.isEnabled()).to.eventually.be.true;
    });
  });

  function assertOnlyInputsPresent(expectedInputs) {
    const expectedPresent = {
      clusterSelect: false,
      clusterFaultTypeSelect: false,
      customerSelect: false,
      eventTypeSelect: false,
      clusterUtilizationThresholdInput: false,
      usableSpaceThresholdInput: false,
      provisionableSpaceThresholdInput: false,
      collectorNotReportingTimeInput: false,
      driveWearThresholdInput: false,
      driveWearTypeSelect: false,
      sessionsThresholdInput: false,
      capacityLicensingThresholdInput: false,
    };
    expectedInputs.forEach( elName => {
      expectedPresent[elName] = true;
    });
    for (const elName in expectedPresent) {
      expect(page[elName].el.isPresent()).to.eventually.be[expectedPresent[elName]];
    }
  }
});

