/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('error-log');
var fixture = mapFixture(support.fixture('ListClusterFaults'));
var uniqueKey = 'id';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'id', label: 'ID', format: {filter:'aiqNumber', args: [0, true]}},
  {key: 'created', label: 'Date', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'severity', label: 'Severity', format: {filter:'string'}},
  {key: 'type', label: 'Type', format: {filter:'string'}},
  {key: 'nodeID', label: 'Node ID', format: {filter:'aiqNumber', args: [0, true, true]}},
  {key: 'driveID', label: 'Drive ID', format: {filter:'aiqNumber', args: [0, true, true]}},
  {key: 'resolved', label: 'Resolved', format: {filter: 'boolean', args:['Yes', 'No']}},
  {key: 'resolvedDate', label: 'Resolution Time', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'code', label: 'Error Code', format: {filter:'string'}},
  {key: 'details', label: 'Details', format: {filter:'string'}, exclude: true} // EXCLUDE: DOM selector strips trailing white space
];

function mapFixture(rawFixture) {
  return rawFixture.result.faults.map(function(fault) {
    return fault;
  });
}

describe('The Cluster Error Log Page', function () {
  it('should display a table component on page load', function () {
    browser.get('#/cluster/26/reporting/errorLog');
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });
  
  it('should have the correct columns and headers', function () {
    expect(table.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach(function(column) {
      expect(table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct API and properly format it in the table', function () {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture);
  });
});
