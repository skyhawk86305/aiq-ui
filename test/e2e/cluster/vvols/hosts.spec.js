/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('host');
var fixture = mapFixture(support.fixture('ListVirtualVolumeHosts'));
var uniqueKey = 'virtualVolumeHostID';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'virtualVolumeHostID', label: 'Host ID', format: {filter: 'string'}},
  {key: 'bindings', label: 'Bindings', format: {filter: 'string'}},
  {key: 'clusterID', label: 'ESX Cluster ID', format: {filter: 'string'}},
  {key: 'initiatorNames', label: 'Initiator IQNs', format: {filter: 'string'}},
  {key: 'visibleProtocolEndpointIDs', label: 'SolidFire Protocol Endpoint IDs', format: {filter: 'string'}}
];

function mapFixture(rawFixture) {
  return rawFixture.hosts;
}

describe('The Cluster Host Page', function () {
  it('should display a table component on page load', function () {
    browser.get('#/cluster/26/vvols/hosts');
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
