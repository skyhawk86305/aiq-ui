/* jshint expr: true */
'use strict';

var support = require('../support.js');
var expect = support.expect;
var TableComponent = require('../page-objects/components/sf-components.po').table;
var table = new TableComponent('drive');
var fixture = mergeFixtures(support.fixture('ListDrives'), support.fixture('GetDriveStats'));
var uniqueKey = 'driveID';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'driveID', label: 'ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'nodeID', label: 'Node ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'status', label: 'Status', format: {filter: 'string'}},
  {key: 'slot', label: 'Slot', format: {filter: 'driveSlot'}},
  {key: 'capacity', label: 'Capacity', format: {filter: 'bytes'}},
  {key: 'serial', label: 'Serial', format: {filter: 'string'}},
  {key: 'lifeRemainingPercent', label: 'Wear', format: {filter: 'drivesTableBadge', args: ['wear']}, exclude: true},
  {key: 'reserveCapacityPercent', label: 'Reserve', format: {filter: 'drivesTableBadge', args: ['reserve']}, exclude: true},
  {key: 'type', label: 'Type', format: {filter: 'string'}}
];


function mergeFixtures(fixture1, fixture2) {
    return fixture1.drives.map(function(drive) {
        fixture2.driveStats.forEach(function(drive2) {
            if (drive.driveID === drive2.driveID) {
                drive.lifeRemainingPercent = drive2.lifeRemainingPercent;
                drive.reserveCapacityPercent = drive2.reserveCapacityPercent;
            }
        });
        return drive;
    });
}

describe('The Cluster Drives Page', function () {
  it('should display a table component on page load', function () {
    browser.get('#/cluster/26/drives');
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


    it('should have an quick filter for table', function() {
        expect(table.controlBar.quickFilter.el.isPresent()).to.eventually.be.true;
    });

    it('should have the filter buttons for each valid status in the quick filter', function() {
        expect(table.controlBar.quickFilter.buttons.count()).to.eventually.equal(3);
        var buttonText = ['Active','Available','Failed'];
        for (var i=0; i < buttonText.length; i++) {
            expect(table.controlBar.quickFilter.buttons.get(i).getText()).to.eventually.equal(buttonText[i]);
        }
    });

    it('should have the Active button selected by default on the quick Filter', function() {
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
