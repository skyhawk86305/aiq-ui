'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('virtual-network');
var fixture = mapFixture(support.fixture('ListVirtualNetworks-Guzzle'));
var uniqueKey = 'virtualNetworkID';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var clusterSelect = new support.clusterSelectComponent();
var clusterId;
var columns = [
  {key: 'virtualNetworkID', label: 'ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'name', label: 'Name', format: {filter: 'string'}},
  {key: 'virtualNetworkTag', label: 'VLAN Tag', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'svip', label: 'SVIP', format: {filter: 'string'}},
  {key: 'netmask', label: 'Netmask', format: {filter: 'string'}},
  {key: 'gateway', label: 'Gateway', format: {filter: 'string'}},
  {key: 'namespace', label: 'VRF Enabled', format: {filter: 'boolean', args:['Yes','No']}},
  {key: 'addressBlocks', label: 'IPs Used', format: {filter: 'ipsUsed'}}
];

function mapFixture(rawFixture) {
  return rawFixture.virtualNetworks.map(function(network) {
    return network;
  });
}

describe('The Cluster Virtual Networks Page', function () {

  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/reporting/virtualNetworks').then(done);
  });

  afterAll(function() {
    support.logout();
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

  it('should display data from the correct API and properly format it in the table', function () {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture);
  });

  it('should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});
