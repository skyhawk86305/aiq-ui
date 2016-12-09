/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = support.expect;
var ClusterOverviewComponent = require('../../page-objects/cluster/reporting/overview.po');
var clusterOverviewPage = new ClusterOverviewComponent();
var fixture = mapFixture(support.fixture('ListAlertsByCluster'));
var uniqueKey = 'id';
var itemsPerPage = 25;
var maxRows = fixture.length > itemsPerPage ? itemsPerPage : fixture.length;
var columns = [
  {key: 'id', label: 'Alert ID', format: {filter: 'aiqNumber', args: [0, true]}},
  {key: 'created', label: 'Alert Triggered', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'lastNotified', label: 'Last Notified', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
  {key: 'isResolved', label: 'Resolved', format: {filter: 'boolean', args:['YES', 'NO']}},
  {key: 'severity', label: 'Severity', exclude: true}, // UI value is wrapped in a colored badge
  {key: 'notificationName', label: 'Policy Name'},
  {key: 'value', label: 'Alert Value'},
  {key: 'destinationEmail', label: 'Destination'},
  {key: 'policyDescription', label: 'Alert Condition', exclude: true} // Data is manipulated using custom alert filter
];

function mapFixture(rawFixture) {
  return rawFixture.result.alerts.map(function(history) {
    history.notificationName = history.notification && history.notification.notificationName || '';
    history.destinationEmail = history.notification && history.notification.destinationEmail || '';
    return history;
  });
}

describe('Cluster Overview Page', function () {
  it('should have the performance graph', function () {
    browser.get('#/cluster/26/reporting/overview');
    expect(clusterOverviewPage.graphs.clusterPerformance.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have the utilization graph', function () {
    expect(clusterOverviewPage.graphs.performanceUtilization.el.isDisplayed()).to.eventually.be.true;
  });

  it('should display the infobar', function() {
    expect(clusterOverviewPage.infoBar.el.isPresent()).to.eventually.be.true;
  });

  it('should have 8 info-boxes', function() {
    expect(clusterOverviewPage.infoBar.infoBoxes.count()).to.eventually.equal(8);
  });

  it('should have a node count info-box showing 6 nodes', function() {
    expect(clusterOverviewPage.infoBar.infoBox('node-count').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('node-count').value.getText()).to.eventually.equal('6');
  });


  it('should have a block capacity info-box with a badge showing a status of Normal', function() {
    expect(clusterOverviewPage.infoBar.infoBox('block-capacity').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('block-capacity').badge().el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('block-capacity').badge().title.getText()).to.eventually.equal('Normal');
  });

  it('should have a metadata capacity info-box with a badge showing a status of Warning', function() {
    expect(clusterOverviewPage.infoBar.infoBox('metadata-capacity').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('metadata-capacity').badge().el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('metadata-capacity').badge().title.getText()).to.eventually.equal('Warning');
  });


  it('should have an efficiency info-box showing 25.3x', function() {
    expect(clusterOverviewPage.infoBar.infoBox('efficiency-info').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('efficiency-info').value.getText()).to.eventually.equal('25.3x');
  });

  it('should have an utilization info-box showing 11%', function() {
    expect(clusterOverviewPage.infoBar.infoBox('utilization').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('utilization').value.getText()).to.eventually.equal('11%');
  });

  it('should have an bandwidth info-box showing 178MB/s', function() {
    expect(clusterOverviewPage.infoBar.infoBox('bandwidth').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('bandwidth').value.getText()).to.eventually.equal('178MB/s');
  });

  it('should have an bandwidth info box showing 8.8k', function() {
    expect(clusterOverviewPage.infoBar.infoBox('iops').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('iops').value.getText()).to.eventually.equal('8.8k');
  });


  it('should have a cluster fault info-box with a warning badge showing 3, and an error badge showing 2', function() {
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').badge('first').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').badge('first').value.getText()).to.eventually.equal('3');
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').badge('second').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').badge('second').value.getText()).to.eventually.equal('2');
  });

  describe('Alerts Table', function () {
    it('should display a table component on initial load', function () {
      expect(clusterOverviewPage.clusterAlertTable.el.isDisplayed()).to.eventually.be.true;
    });

    it('should have the correct columns and headers', function () {
      expect(clusterOverviewPage.clusterAlertTable.content.columns.count()).to.eventually.equal(columns.length);
      columns.forEach(function(column) {
        expect(clusterOverviewPage.clusterAlertTable.content.header(column.key).title.getText()).to.eventually.equal(column.label);
      });
    });

    it('should display data from the correct API and properly format it in the table', function () {
      support.testTableData(clusterOverviewPage.clusterAlertTable, columns, maxRows, uniqueKey, fixture);
    });
  });
});
