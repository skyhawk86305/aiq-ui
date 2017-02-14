/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('protocol-endpoint');
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();
var fixture = mapFixture(support.fixture('ListProtocolEndpoints'));
var uniqueKey = 'primaryProviderID';
var itemsPerPage = 25;
var clusterId;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'primaryProviderID', label: 'Primary Provider ID', format: {filter: 'string'}},
  {key: 'secondaryProviderID', label: 'Secondary Provider ID', format: {filter: 'string'}},
  {key: 'protocolEndpointID', label: 'Protocol Endpoint ID', format: {filter: 'string'}},
  {key: 'protocolEndpointState', label: 'Protocol Endpoint State', format: {filter: 'string'}},
  {key: 'providerType', label: 'Provider Type', format: {filter: 'string'}},
  {key: 'scsiNAADeviceID', label: 'SCSI NAA Device ID', format: {filter: 'string'}}
];

function mapFixture(rawFixture) {
  return rawFixture.protocolEndpoints;
}

describe('The Cluster Protocol Endpoint Page', function () {

  beforeAll(function(done) {
    support.manualLogin();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/vvols/protocol-endpoints').then(done);
  });

  afterAll(function() {
    support.manualLogout();
  });

  it('should display a table component on page load', function () {
    browser.get('#/cluster/26/vvols/protocol-endpoints');
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
