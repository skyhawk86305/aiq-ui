'use strict';

var _ = require('lodash');
var support = require('../support.js');
var expect = support.expect;
var TableComponent = require('../page-objects/components/sf-components.po').table;
var table = new TableComponent('drive');
var fixture = mergeFixtures(support.fixture('ListDrives-Guzzle'), support.fixture('GetDriveStats-Guzzle'), support.fixture('GetClusterHardwareInfo-Guzzle'));
var uniqueKey = 'driveID';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var clusterSelect = new support.clusterSelectComponent();
var clusterId;
var columns = [
  {key: 'driveID', label: 'ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'nodeID', label: 'Node ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'slot', label: 'Slot', format: {filter: 'driveSlot'}},
  {key: 'capacity', label: 'Capacity', format: {filter: 'bytes'}},
  {key: 'version', label: 'Firmware Version', format: {filter: 'string'}},
  {key: 'serial', label: 'Serial', format: {filter: 'string'}},
  {key: 'lifeRemainingPercent', label: 'Wear Remaining', format: {filter: 'drivesTableBadge', args: ['wear']}, exclude: true},
  {key: 'reserveCapacityPercent', label: 'Reserve', format: {filter: 'drivesTableBadge', args: ['reserve']}, exclude: true},
  {key: 'type', label: 'Type', format: {filter: 'string'}}
];


function mergeFixtures(fixture1, fixture2, fixture3) {
  return fixture1.drives.map( function(drive) {
    const stats = _.find(fixture2.driveStats, ['driveID', drive.driveID]) || {};
    const hardwareInfo = _.get(fixture3.clusterHardwareInfo, 'drives[' + drive.driveID + ']', {});

    return Object.assign({}, drive, {
      lifeRemainingPercent: !isNaN(parseFloat(stats.lifeRemainingPercent)) ? stats.lifeRemainingPercent : '',
      reserveCapacityPercent: !isNaN(parseFloat(stats.reserveCapacityPercent)) ? stats.reserveCapacityPercent : '',
      type: drive.type === 'volume' ? 'metadata' : drive.type,
      version: (hardwareInfo && hardwareInfo.version) ? hardwareInfo.version : '-'
    });
  });
}

describe('The Cluster Drives Page', function () {

  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/drives').then(done);
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

  it('@any should have an export button for the table', function() {
    expect(table.controlBar.export.button.isPresent()).to.eventually.be.true;
  });


  it('@any should have an quick filter for table', function() {
    expect(table.controlBar.quickFilter.el.isPresent()).to.eventually.be.true;
  });

  it('@any should have the filter buttons for each valid status in the quick filter', function() {
    expect(table.controlBar.quickFilter.buttons.count()).to.eventually.equal(3);
    var buttonText = ['Active','Available','Failed'];
    for (var i=0; i < buttonText.length; i++) {
      expect(table.controlBar.quickFilter.buttons.get(i).getText()).to.eventually.equal(buttonText[i]);
    }
  });

  it('@any should have the Active button selected by default on the quick Filter', function() {
    var buttonText = ['Active','Available','Failed'];
    for (var i=0; i < buttonText.length; i++) {
      if (i < 1 ) {
        expect(table.controlBar.quickFilter.buttons.get(i).getAttribute('class')).to.eventually.contain('active');
      }
      else {
        expect(table.controlBar.quickFilter.buttons.get(i).getAttribute('class')).to.eventually.not.contain('active');
      }
    }
  });

});
