/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var navbar = new support.navbarComponent();
var table = new TableComponent('alert-policy');
var fixture = mapFixture(support.fixture('ListNotifications'));
var uniqueKey = 'notificationName';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'notificationName', label: 'Alert Policy Name', format: {filter: 'string'}},
  {key: 'destinationEmail', label: 'Destination', format: {filter:'string'}},
  {key: 'notificationSeverity', label: 'Severity', format: {filter:'string'}},
  {key: 'username', label: 'Creator', format: {filter:'string'}},
  {key: 'customerName', label: 'Customer', format: {filter:'string'}},
  {key: 'clusterName', label: 'Cluster', format: {filter:'string'}},
  {key: 'policyDescription', label: 'Alert Condition', exclude: true} // Data is manipulated using custom alert filter
];

function mapFixture(rawFixture) {
  return rawFixture.result.notifications.map(function(policy) {
    return policy;
  });
}

describe('The Alert Policies Page', function () {

  beforeEach(function(done) {
    support.login(function() {
      browser.get('#/');
      navbar.subNavbar.click('dashboard-alerts').then(function() {
        navbar.subNavMenu.click('dashboard-alerts-policies').then(done);
      });
    });
  });

  afterEach(function(done) {
      support.logout(done);
  });

  it('should display a table component on page load', function () {
    browser.get('#/dashboard/alerts/policies');
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

  it('should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});
