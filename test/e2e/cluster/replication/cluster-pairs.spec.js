'use strict';

const _ = require('lodash');
const support = require('../../support.js');
const expect = support.expect;
const TableComponent = require('../../page-objects/components/sf-components.po').table;
const table = new TableComponent('cluster-pairs');
const fixture = mapFixtures(
  support.fixture('ListClusterPairs-Guzzle'),
  support.fixture('ListActivePairedVolumes-Guzzle')
);
const uniqueKey = 'clusterPairID';
const itemsPerPage = 25;
const maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;

const columns = [
  { label: 'Cluster Pair ID', key: 'clusterPairID', format: { filter: 'string' } },
  { label: 'Remote Cluster Name', key: 'clusterName', },
  { label: 'Remote MVIP', key: 'mvip' },
  { label: 'Replicating Volumes', key: 'replicatingVolumes', format: { filter: 'string' } },
  { label: 'Status', key: 'status' },
  { label: 'UUID', key: 'clusterPairUUID' },
];

function mapFixtures({ clusterPairs = [] }, { volumes = [] }) {
  const volumePairCounts = _(volumes).flatMap('volumePairs').countBy('clusterPairID').value();
  return clusterPairs.map( clusterPair => {
    const replicatingVolumes = volumePairCounts[clusterPair.clusterPairID];
    return Object.assign({}, clusterPair, { replicatingVolumes });
  });
}

describe('The Cluster Pairs Page', function() {
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
    browser.get(`#/cluster/${clusterID}/replication/clusterPairs`);
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
