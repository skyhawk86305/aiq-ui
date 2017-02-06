/* jshint expr: true */
'use strict';

var support = require('../support.js');
var expect = support.expect;
var TableComponent = require('../page-objects/components/sf-components.po').table;
var table = new TableComponent('volume');
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();
var fixture = mapFixture(support.fixture('ListActiveVolumes'));
var uniqueKey = 'volumeID';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'volumeID', label: 'ID', format: {filter: 'string'}},
  {key: 'accountID', label: 'Account ID', format: {filter: 'string'}},
  {key: 'totalSize', label: 'Volume Size', format: {filter: 'bytes'}},
  {key: 'enable512e', label: '512e', format: {filter: 'boolean', args: ['Yes', 'No']}},
  {key: 'access', label: 'Access', format: {filter: 'access'}},
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

  beforeEach(function(done) {
      support.login(function() {
          browser.get('#/');
          clusterSelect.open().clustersList().selectClusterByIndex(0);
          navbar.subNavbar.click('cluster-volumes').then(done);
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
  });

  it('should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});
