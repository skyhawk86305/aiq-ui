'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('storage-container');
var clusterSelect = new support.clusterSelectComponent();
var fixture = mapFixture(support.fixture('ListStorageContainers'));
var uniqueKey = 'storageContainerID';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var clusterId;
var columns = [
  {key: 'accountID', label: 'Account ID', format: {filter: 'string'}},
  {key: 'name', label: 'Name', format: {filter: 'string'}},
  {key: 'status', label: 'Status', format: {filter: 'string'}},
  {key: 'protocolEndpointType', label: 'PE Type', format: {filter: 'string'}},
  {key: 'storageContainerID', label: 'Storage Container ID', format: {filter: 'string'}},
  {key: 'activeVirtualVolumesCount', label: 'Active Virtual Volumes', format: {filter: 'string'}},
];

function mapFixture(rawFixture) {
  return rawFixture.storageContainers.map(function(storageContainer) {
    storageContainer.activeVirtualVolumesCount = storageContainer.virtualVolumes.length;
    return storageContainer;
  });
}


// Skip Storage Container tests, pending the secret-scrubbing work
describe('The Cluster Storage Containers Page', function () {

  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/vvols/storage-containers').then(done);
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

