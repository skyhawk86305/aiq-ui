'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var snapshotTable = new TableComponent('snapshot');
var clusterSelect = new support.clusterSelectComponent();
var fixture = mapFixture(support.fixture('ListActiveVolumes-Guzzle'), support.fixture('ListSnapshots-Guzzle'));
var itemsPerPage = 25;
var uniqueKey = 'snapshotID';
var clusterId;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'snapshotID', label: 'ID', width: 100, format: {filter: 'string'}},
  {key: 'snapshotUUID', label: 'UUID', format: {filter: 'string'}},
  {key: 'totalSize', label: 'Size', format: {filter: 'bytes'}},
  {key: 'volumeID', label: 'Volume ID', width: 100, format: {filter: 'string'}},
  {key: 'accountID', label: 'Account ID', width: 100, format: {filter: 'string'}},
  {key: 'volumeSize', label: 'Volume Size', format: {filter: 'bytes'}},
  {key: 'createTime', label: 'Create Time', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'retainUntil', label: 'Retain Until', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'groupID', label: 'Group SnapshotID', format: {filter: 'string'}},
  {key: 'enableRemoteReplication', label: 'Remote Replication', format: {filter: 'boolean', args: ['Yes', 'No']}},
  {key: 'replicated', label: 'Replicated'}
];

function mapFixture(volumeRawFixture, snapshotRawFixture) {
  return snapshotRawFixture.snapshots.filter(function(snapshot) {
    if (snapshot.volumeID === volumeRawFixture.volumes[0].volumeID) {
      snapshot.volumeID = volumeRawFixture.volumes[0].volumeID;
      snapshot.accountID = volumeRawFixture.volumes[0].accountID;
      snapshot.volumeSize = volumeRawFixture.volumes[0].totalSize;
      snapshot.replicated = '';
      return snapshot;
    }
  });
}

describe('The Snapshots Page', function() {
  beforeAll(function() {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect)
      .then( firstClusterId => {
        clusterId = firstClusterId;
      });
  });

  beforeEach(function() {
    browser.get('#/cluster/' + clusterId + '/volumes/snapshots');
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display a snapshots table component on page load', function () {
    expect(snapshotTable.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the correct columns and headers', function () {
    expect(snapshotTable.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach(function(column) {
      expect(snapshotTable.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct API and properly format it in the table', function () {
    support.testTableData(snapshotTable, columns, maxRows, uniqueKey, fixture);
  });

  it('@any should have an export button for the table', function() {
    expect(snapshotTable.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});

