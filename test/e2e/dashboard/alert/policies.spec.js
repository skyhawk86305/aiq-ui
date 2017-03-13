'use strict';

const support = require('../../support.js');
const expect = support.expect;
const TableComponent = require('../../page-objects/components/sf-components.po').table;
const table = new TableComponent('alert-policy');
const fixture = mapFixture(support.fixture('ListNotifications'));
const uniqueKey = 'notificationName';
const itemsPerPage = 25;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
const columns = [
  {key: 'notificationName', label: 'Alert Policy Name', format: {filter: 'string'}},
  {key: 'destinationEmail', label: 'Destination', format: {filter:'string'}},
  {key: 'notificationSeverity', label: 'Severity', format: {filter:'string'}, exclude: true}, // Data is manipulated using custom severity filter
  {key: 'username', label: 'Creator', format: {filter:'string'}},
  {key: 'customerName', label: 'Customer', format: {filter:'string'}},
  {key: 'clusterName', label: 'Cluster', format: {filter:'string'}},
  {key: 'notificationFields', label: 'Alert Condition', format: {filter:'alert', args:['condition']} },
];

function mapFixture(rawFixture) {
  return rawFixture.result.notifications.map(function(policy) {
    return policy;
  });
}

describe('The Alert Policies Page', function () {
  beforeAll(function() {
    support.login();
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/overview');
  });


  beforeEach(function(done) {
    browser.get('#/dashboard/alerts/policies').then(done);
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
