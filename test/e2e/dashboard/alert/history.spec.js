/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('alert-history');
var navbar = new support.navbarComponent();
var fixture = mapFixture(support.fixture('ListAlerts'));
var uniqueKey = 'id';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'id', label: 'Alert ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'created', label: 'Alert Triggered', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'lastNotified', label: 'Last Notification', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'isResolved', label: 'Resolved', format: {filter: 'tableBadgeBoolean'}, exclude: true},
  {key: 'resolved', label: 'Resolution Time', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'notificationName', label: 'Alert Policy Name'},
  {key: 'severity', label: 'Alert Severity', format: {filter: 'tableBadgeAlertSeverity'}, exclude: true},
  {key: 'value', label: 'Alert Value'},
  {key: 'destinationEmail', label: 'Destination'},
  {key: 'customerName', label: 'Customer'},
  {key: 'clusterName', label: 'Cluster'},
  {key: 'policyDescription', label: 'Alert Condition', exclude: true} // Data is manipulated using custom alert filter
];

function mapFixture(rawFixture) {
  return rawFixture.result.alerts.map(function(history) {
    history.notificationName = history.notification && history.notification.notificationName || '';
    history.destinationEmail = history.notification && history.notification.destinationEmail || '';
    return history;
  });
}

describe('The Alert History Page', function () {

  beforeEach(function(done) {
    support.login(function() {
      browser.get('#/');
      navbar.subNavbar.click('dashboard-alerts').then(function() {
        navbar.subNavMenu.click('dashboard-alerts-history').then(done);
      });
    });
  });

  afterEach(function(done) {
      support.logout(done);
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
    support.expect(table.content.row(0).data('isResolved').element(by.css('.table-badge')).getAttribute('class')).to.eventually.contains('table-badge');
    support.expect(table.content.row(0).data('severity').element(by.css('.table-badge')).getAttribute('class')).to.eventually.contains('table-badge');
  });

  it('should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});
