/* jshint expr: true */
'use strict';

var support = require('../support.js');
var expect = support.expect;
var TableComponent = require('../page-objects/components/sf-components.po').table;
var table = new TableComponent('drive');
var fixture = mapFixture(support.fixture('ListActiveDrives'));
var uniqueKey = 'driveID';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'driveID', label: 'ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'nodeID', label: 'Node ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'slot', label: 'Slot', format: {filter: 'driveSlot'}},
  {key: 'capacity', label: 'Capacity', format: {filter: 'bytes'}},
  {key: 'serial', label: 'Serial', format: {filter: 'string'}},
  {key: 'lifeRemainingPercent', label: 'Wear', format: {filter: 'aiqNumber'}},
  {key: 'reserveCapacityPercent', label: 'Reserve', format: {filter: 'aiqNumber'}},
  {key: 'type', label: 'Type', format: {filter: 'string'}}
];

function mapFixture(rawFixture) {
  return rawFixture.result.drives.map(function(drive) {
    drive.lifeRemainingPercent = drive.driveStats && drive.driveStats.lifeRemainingPercent || '';
    drive.reserveCapacityPercent  = drive.driveStats && drive.driveStats.reserveCapacityPercent || '';
    return drive;
  });
}

describe('The Cluster Drives Page', function () {
  it('should display a table component on page load', function () {
    browser.get('#/cluster/26/drives');
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
