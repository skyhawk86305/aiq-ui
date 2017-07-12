'use strict';

const support = require('../support.js');
const expect = support.expect;
const TableComponent = require('../page-objects/components/sf-components.po').table;
const table = new TableComponent('archived-clusters');
const fixture = mapFixture(support.fixture('ListArchivedClusters'));
const uniqueKey = 'clusterID';
const itemsPerPage = 25;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
const columns = [
  { label: 'ClusterID', key: 'clusterID', format: { filter: 'aiqNumber', args: [0, true] } },
  { label: 'Customer', key: 'customerName' },
  { label: 'Cluster Name', key: 'clusterName' },
  { label: 'Last Update', key: 'lastUpdateTime', format: { filter: 'aiqDate' } },
  { label: 'Archive Time', key: 'archiveTime', format: { filter: 'aiqDate' } },
];

function mapFixture(rawFixture) {
  rawFixture.result.clusters.forEach((val)=>{
    val.lastUpdateTime = val.lastUpdateTime * 1000;
    val.archiveTime = val.archiveTime * 1000;
  });
  return rawFixture.result.clusters;
}

describe('The Archived Clusters Page', function () {
  beforeAll(function() {
    support.login();
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function() {
    browser.get('#/admin/archivedClusters');
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

});
