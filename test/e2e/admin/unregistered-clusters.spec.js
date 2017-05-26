'use strict';

const support = require('../support.js');
const expect = support.expect;
const TableComponent = require('../page-objects/components/sf-components.po').table;
const table = new TableComponent('unregistered-clusters');
const fixture = mapFixture(support.fixture('ListUnregisteredClusters'));
const uniqueKey = 'clusterID';
const itemsPerPage = 25;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
const columns = [
  { label: 'Cluster ID', key: 'clusterID', format: { filter: 'aiqNumber', args: [0, true] } },
  { label: 'Cluster Name', key: 'clusterName' },
  { label: 'Cluster UUID', key: 'clusterUUID' },
  { label: 'Version', key: 'clusterVersion' },
  { label: 'Last Updated', key: 'lastUpdateTime', format: { filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss'] } },
  { label: 'Register with Customer', key: 'register', exclude: true },
];

function mapFixture(rawFixture) {
  return rawFixture.result.clusters;
}

describe('The Unregistered Clusters Page', function () {
  beforeAll(function() {
    support.login();
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function() {
    browser.get('#/admin/unregisteredClusters');
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display a table component on page load', function () {
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the correct columns and headers', function () {
    expect(table.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach(function(column) {
      expect(table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct API and properly format it in the table', function () {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture);
  });

  it('@any should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });

  it('@any should allow the user to open the register cluster modal', function() {
    const registerClusterButton = table.el.all(by.css('.register-cluster-button')).get(0);
    expect(registerClusterButton.isPresent()).to.eventually.be.true;
    registerClusterButton.click();
    const registerClusterModal = element(by.css('.register-cluster-modal'));
    expect(registerClusterModal.isPresent()).to.eventually.be.true;
  });
});
