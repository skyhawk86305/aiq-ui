'use strict';

var support = require('../support.js');
var expect = support.expect;
var TableComponent = require('../page-objects/components/sf-components.po').table;
var table = new TableComponent('support-overview');
var clusterSelect = new support.clusterSelectComponent();
var fixture = mapFixture(support.fixture('SupportDashboard'));
var uniqueKey = 'id';
var itemsPerPage = 100;
var clusterId;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  { label: 'ID', key:'id', visible:false },
  { label: 'Include' },
  { label: 'Edit' },
  { label: 'Date', key: 'date' },
  { label: 'Alert', key: 'alert' },
  { label: 'Alert Type', key: 'alertType' },
  { label: 'Total Alerts', key: 'totalAlerts' },
  { label: 'Severity', key: 'severity', format: {filter: 'tableBadgeAlertSeverity'} },
  { label: 'Customer', key: 'customerName'},
  { label: 'Cluster', key: 'clusterName' },
  { label: 'Last updated', key: 'lastUpdateTime' },
  { label: 'Last Modified By', key: 'lastModifiedBy' },
  { label: 'Resolved', key: 'resolved', format: {filter: 'tableBadgeBoolean'}},
  { label: 'Notes', key: 'notes' },
  { label: 'Actions' }
];

function mapFixture(rawFixture) {
  return rawFixture.result.alerts.map(function(alert) {
    return alert;
  });
}

describe('The Support Dashboard Page', function () {
  beforeAll(function() {
    support.login();
  });

  beforeEach(function(){
    browser.get('#/supportDashboard/overview');
  })


  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display a table component on page load', function () {
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the correct columns and headers', function () {
    expect(table.content.columns.count()).to.eventually.equal(columns.length-1);
  });

  it('should display data from the correct API and properly format it in the table', function () {
    support.testTableData(table, maxRows, uniqueKey, fixture);
    support.expect(table.content.row(0).data('resolved').element(by.css('.table-badge')).getAttribute('class')).to.eventually.contains('table-badge');
    support.expect(table.content.row(0).data('severity').element(by.css('.table-badge')).getAttribute('class')).to.eventually.contains('table-badge');
  });
});
