'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('binding');
var clusterSelect = new support.clusterSelectComponent();
var fixture = mapFixture(support.fixture('ListVirtualVolumeBindings-Guzzle'));
var uniqueKey = 'virtualVolumeBindingID';
var itemsPerPage = 25;
var clusterId;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {label: 'Host ID', key: 'virtualVolumeHostID', format: {filter: 'string'}},
  {label: 'Protocol Endpoint ID', key: 'protocolEndpointID', format: {filter: 'string'}},
  {label: 'Protocol Endpoint In Band ID', key: 'protocolEndpointInBandID', format: {filter: 'string'}},
  {label: 'Protocol Endpoint Type', key: 'protocolEndpointType', format: {filter: 'string'}},
  {label: 'VVol Binding ID', key: 'virtualVolumeBindingID', format: {filter: 'string'}},
  {label: 'VVol ID', key: 'virtualVolumeID', format: {filter: 'string'}},
  {label: 'VVol Secondary ID', key: 'virtualVolumeSecondaryID', format: {filter: 'string'}},
];

function mapFixture(rawFixture) {
  return rawFixture.bindings;
}

describe('The Cluster VVol Bindings Page', function () {

  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/vvols/bindings').then(done);
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

  it('should display data from the correct API and properly format it in the table', function (done) {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture, done);
  });

  it('should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });
});
