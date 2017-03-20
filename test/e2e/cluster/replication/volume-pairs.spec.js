'use strict';

const _ = require('lodash');
const support = require('../../support.js');
const expect = support.expect;
const TableComponent = require('../../page-objects/components/sf-components.po').table;
const table = new TableComponent('volume-pairs');
const fixture = mapFixtures(
  support.fixture('ListActivePairedVolumes'),
  support.fixture('ListClusterPairs-Guzzle')
);
const uniqueKey = 'volumeID';
const itemsPerPage = 25;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;

const columns = [
  { label: 'Volume ID', key: 'volumeID', format: { filter: 'string' } },
  { label: 'Account ID', key: 'accountID', format: { filter: 'string' } },
  { label: 'Volume Status', key: 'volumeStatus' },
  { label: 'Replication Mode', key: 'replicationMode' },
  { label: 'Direction', key: 'direction' },
  { label: 'Async Delay', key: 'asyncDelay', format: { filter: 'string' } },
  { label: 'Remote Cluster', key: 'remoteClusterName' },
  { label: 'Remote Volume ID', key: 'remoteVolumeID', format: { filter: 'string' } },
];

function mapFixtures({ volumes = [] }, { clusterPairs = [] }) {
  return _.flatMap(volumes, volume => {
    const { volumeID, accountID, volumePairs } = volume;
    return volumePairs.map( vp => {
      const clusterPair = _.find(clusterPairs, ['clusterPairID', vp.clusterPairID]);
      return Object.assign({}, {
        volumeID,
        accountID,
        volumeStatus: _.get(volume, 'status'),
        replicationMode: _.get(vp, 'remoteReplication.mode'),
        direction: volume.access === 'replicationTarget' ? 'Target' : 'Source',
        asyncDelay: _.get(volume, 'volumeStats.asyncDelay'),
        remoteClusterName: _.get(clusterPair, 'clusterName'),
        remoteVolumeID: vp.remoteVolumeID,
      });
    });
  })
}

describe('The Volume Pairs Page', function() {
  let clusterID;

  beforeAll(function() {
    support.login();
    const clusterSelect = new support.clusterSelectComponent();
    const openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect)
      .then( firstClusterID => {
        clusterID = firstClusterID;
      });
  });

  beforeEach(function() {
    browser.get(`#/cluster/${clusterID}/replication/volumePairs`);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display a table component on page load', function() {
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the correct columns and headers', function() {
    expect(table.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach( column => {
      expect(table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct API and properly format it in the table', function() {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture);
  });

  it('@any should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});
