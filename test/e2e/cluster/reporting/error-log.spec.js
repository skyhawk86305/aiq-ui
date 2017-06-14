'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('error-log');
var clusterSelect = new support.clusterSelectComponent();
var fixture = mapFixture(support.fixture('ListClusterFaults'));
var uniqueKey = 'clusterFaultID';
var itemsPerPage = 25;
var clusterId;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'clusterFaultID', label: 'Cluster Fault ID', format: {filter:'aiqNumber', args: [0, true]}},
  {key: 'date', label: 'Date', format: {filter: 'aiqDate'}},
  {key: 'severity', label: 'Severity', format: {filter: 'tableBadgeAlertSeverity'}, exclude: true},
  {key: 'type', label: 'Type', format: {filter:'string'}},
  {key: 'nodeID', label: 'Node ID', format: {filter:'aiqNumber', args: [0, true, true]}},
  {key: 'driveID', label: 'Drive ID', format: {filter:'aiqNumber', args: [0, true, true]}},
  {key: 'resolved', label: 'Resolved', format: {filter: 'tableBadgeBoolean'}, exclude: true},
  {key: 'resolvedDate', label: 'Resolution Time', format: {filter: 'aiqDate'}},
  {key: 'code', label: 'Error Code', format: {filter:'string'}},
  {key: 'details', label: 'Details', format: {filter:'string'}, exclude: true} // EXCLUDE: DOM selector strips trailing white space
];

function mapFixture(rawFixture) {
  return rawFixture.result.faults.map(function(fault) {
    return fault;
  });
}

describe('The Cluster Error Log Page', function () {
  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/reporting/errorLog').then(done);
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
    support.expect(table.content.row(0).data('resolved').element(by.css('.table-badge')).getAttribute('class')).to.eventually.contains('table-badge');
    support.expect(table.content.row(0).data('severity').element(by.css('.table-badge')).getAttribute('class')).to.eventually.contains('table-badge');
  });
});
