'use strict';

var support = require('../../support.js');
var expect = support.expect;
var TableComponent = require('../../page-objects/components/sf-components.po').table;
var table = new TableComponent('event');
var clusterSelect = new support.clusterSelectComponent();
var fixture = mapFixture(support.fixture('ListEvents'));
var uniqueKey = 'eventID';
var itemsPerPage = 25;
var clusterId;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'eventID', label: 'ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'timeOfReport', label: 'Event Time', format: {filter: 'aiqDate'}},
  {key: 'eventInfoType', label: 'Type', format: {filter: 'string'}},
  {key: 'message', label: 'Message', format: {filter: 'string'}},
  {key: 'serviceID', label: 'Service ID', format: {filter: 'string'}},
  {key: 'nodeID', label: 'Node ID', format: {filter: 'aiqNumber', args: [0, true, true]}},
  {key: 'driveID', label: 'Drive ID', format: {filter: 'aiqNumber', args: [0, true, true]}},
  {key: 'details', label: 'Details', format: {filter: 'aiqJson'}, exclude: true} // EXCLUDE: JSON attributes get alphabetized when getting passed to browser.executeScript in $filter
];

function mapFixture(rawFixture) {
  return rawFixture.result.events.map(function(event) {
    return event;
  });
}

describe('The Cluster Events Page', function () {
  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/reporting/events').then(done);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display a table component on page load', function () {
    expect(table.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the correct columns and headers', function () {
    expect(table.content.columns.count()).to.eventually.equal(columns.length);
    columns.forEach(function(column) {
      expect(table.content.header(column.key).title.getText()).to.eventually.equal(column.label);
    });
  });

  it('should display data from the correct API and properly format it in the table', function () {
    support.testTableData(table, columns, maxRows, uniqueKey, fixture);
  });
});
