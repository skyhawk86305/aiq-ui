/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('clusterAlert');
var fixture = mapFixture(support.fixture('ListAlertsByCluster'));
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();
var uniqueKey = 'id';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var clusterId;
var columns = [
  {key: 'id', label: 'Alert ID', width: 100, format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'created', label: 'Alert Triggered', width: 190, format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'lastNotified', label: 'Last Notified', width: 190, format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'isResolved', label: 'Resolved', width: 160, format: {filter: 'tableBadgeBoolean'}, exclude: true},
  {key: 'severity', label: 'Severity', width: 160, format: {filter: 'tableBadgeAlertSeverity'}, exclude: true},
  {key: 'notificationName', label: 'Policy Name'},
  {key: 'value', label: 'Alert Value', width: 200},
  {key: 'destinationEmail', label: 'Destination'},
  {key: 'policyDescription', label: 'Alert Condition', exclude: true}
];

function mapFixture(rawFixture) {
  return rawFixture.result.alerts.map(function(alert) {
    alert.notificationName = alert.notification && alert.notification.notificationName || '';
    alert.destinationEmail = alert.notification && alert.notification.destinationEmail || '';
    return alert;
  });
}

describe('The Cluster Alerts Page', function () {

  beforeAll(function(done) {
    support.manualLogin();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/reporting/alerts').then(done);
  });

  afterAll(function() {
    support.manualLogout();
  });


  it('should display a table component on page load', function () {
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have the correct columns and headers', function () {
    expect(table.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach(function(column) {
      expect(table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct API and properly format it in the table', function (done) {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture, done);
  });
});
