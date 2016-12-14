/* jshint expr: true */
'use strict';

var support = require('../support.js');
var expect = support.expect;
var TableComponent = require('../page-objects/components/sf-components.po').table;
var table = new TableComponent('volume');
var fixture = mapFixture(support.fixture('ListActiveVolumes'));
var uniqueKey = 'volumeID';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'volumeID', label: 'ID', format: {filter: 'string'}},
  {key: 'accountID', label: 'Account ID', format: {filter: 'string'}},
  {key: 'totalSize', label: 'Volume Size', format: {filter: 'bytes'}},
  {key: 'enable512e', label: '512e', format: {filter: 'boolean', args: ['Yes', 'No']}},
  {key: 'access', label: 'Access', format: {filter: 'string'}},
  {key: 'minIOPS', label: 'Min IOPS', format: {filter: 'aiqNumber', args: [0, false, true]}},
  {key: 'maxIOPS', label: 'Max IOPS', format: {filter: 'aiqNumber', args: [0, false, true]}},
  {key: 'burstIOPS', label: 'Burst IOPS', format: {filter: 'aiqNumber', args: [0, false, true]}},
  {key: 'paired', label: 'Paired', format: {filter: 'boolean', args: ['Yes', 'No']}},
  {key: 'configuredAccessProtocols', label: 'Configured Access Protocols', format: {filter: 'string'}}
];

function mapFixture(rawFixture) {
  return rawFixture.result.volumes.map(function(volume) {
    volume.minIOPS = volume.qos.minIOPS;
    volume.maxIOPS = volume.qos.maxIOPS;
    volume.burstIOPS = volume.qos.burstIOPS;
    volume.paired = volume.volumePairs.length ? true : false;
    return volume;
  });
}

describe('The Cluster Volumes Page', function () {
  it('should display a table component on page load', function () {
    browser.get('#/cluster/26/volumes');
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
