'use strict';

const support = require('../support.js');
const expect = support.expect;
const CapacityLicensingDetails = require('../page-objects/dashboard/capacity-licensing-details.po');
const page = new CapacityLicensingDetails();
const clustersFixture = support.fixture('ListClusterLicensingInfo').result.clusters;
const nodesFixture = support.fixture('ListLicensedNodes').result.licensedNodes;
const nodeUniqueKey = 'serviceTag';
const clusterUniqueKey = 'clusterID';
const customerID = 1234;

const clusterColumns = [
  { label: 'Cluster ID', key: 'clusterID', format: { filter: 'string' } },
  { label: 'Cluster Name', key: 'clusterName' },
  { label: 'Provisioned Licensed Capacity', key: 'clusterProvisionedLicenseCapacity', format: { filter: 'bytes', args: [false, 2] } },
  { label: '% of Total Provisioned Licensed Capacity', key: 'clusterCapacityUtilization', format: { filter: 'percent', args: [ 1, true ] } },
];

const nodeColumns = [
  { label: 'Cluster Name', key: 'clusterName', format: { filter: 'string' } },
  { label: 'Service Tag', key: 'serviceTag' },
  { label: 'Model', key: 'nodeType', format: { filter: 'string' } },
  { label: 'Raw Capacity', key: 'rawCapacity', format: { filter: 'bytes', args: [false, 2] } },
];

describe('The Capacity Licensing Details Page', function() {

  beforeAll(function() {
    support.login();
  });

  beforeEach(function() {
    browser.get(`#/dashboard/capacityLicensing/${customerID}`);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display the info bar and table components on page load', function() {
    expect(page.infoBar.el.isDisplayed()).to.eventually.be.true;
    expect(page.nodesTable.el.isDisplayed()).to.eventually.be.true;
    expect(page.clustersTable.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the correct columns and headers on both tables', function() {
    expect(page.clustersTable.content.columns.count()).to.eventually.equal(clusterColumns.length);
    clusterColumns.forEach( column => {
      expect(page.clustersTable.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
    expect(page.nodesTable.content.columns.count()).to.eventually.equal(nodeColumns.length);
    nodeColumns.forEach( column => {
      expect(page.nodesTable.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct APIs and properly format it in the tables', function () {
    support.testTableData(page.clustersTable, clusterColumns, clustersFixture.length, clusterUniqueKey, clustersFixture);
    support.testTableData(page.nodesTable, nodeColumns, nodesFixture.length, nodeUniqueKey, nodesFixture);
  });

  it('@any should have an export button for each table', function() {
    expect(page.clustersTable.controlBar.export.button.isPresent()).to.eventually.be.true;
    expect(page.nodesTable.controlBar.export.button.isPresent()).to.eventually.be.true;
  });

  it('@any @smoke should display capacity licesning summary info in the info bar', function() {
    expect(page.infoBar.infoBox('customer-name').el.isDisplayed()).to.eventually.be.true;
    expect(page.infoBar.infoBox('entitled-license-capacity').el.isDisplayed()).to.eventually.be.true;
    expect(page.infoBar.infoBox('provisioned-license-capacity').el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke the info-boxes must be wider than its value text', function(){
    support.infoBoxSizeCheck(page.infoBar,'customer-name');
    support.infoBoxSizeCheck(page.infoBar,'entitled-license-capacity');
    support.infoBoxSizeCheck(page.infoBar,'provisioned-license-capacity');
  });
});

