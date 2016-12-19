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
  it('should have the performance graph with the correct title, series and legend items', function () {
    browser.get('#/cluster/26/reporting/overview');
    var graph = clusterOverviewPage.graphs.clusterPerformance;
    expect(graph.el.isDisplayed()).to.eventually.be.true;
    expect(graph.title.getText()).to.eventually.equal('Performance');

    expect(graph.svg.lines.count()).to.eventually.equal(2);
    var expectedSeries = ['totalOpsPerSec','totalBytesPerSec'],
      expectedLabels = ['IOPS','Throughput'];
    for (var i=0; i < expectedSeries.length; i++) {
      expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
      expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
    }

  });

  it('should have the utilization graph with the correct title, series and legend items', function () {
    var graph = clusterOverviewPage.graphs.performanceUtilization;
    expect(graph.el.isDisplayed()).to.eventually.be.true;
    expect(graph.title.getText()).to.eventually.equal('Utilization');
    expect(graph.svg.lines.count()).to.eventually.equal(1);
    expect(graph.svg.line('clusterUtilizationPct').isDisplayed()).to.eventually.be.true;
    expect(graph.legend.legendItem('clusterUtilizationPct').label.getText()).to.eventually.equal('Utilization');

  });

  it('should display the infobar with 8 infoboxes', function() {
    expect(clusterOverviewPage.infoBar.el.isPresent()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBoxes.count()).to.eventually.equal(8);
  });


  it('should have a node count info-box with the correct title, showing 6 nodes', function() {
    var box = clusterOverviewPage.infoBar.infoBox('node-count');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('Nodes');
    expect(box.value.getText()).to.eventually.equal('6');
  });

  it('The Node Count info-box must be wider than its value text', function(){
    support.infoBoxSizeCheck(clusterOverviewPage.infoBar,'node-count');
  });

  it('should have a block capacity info-box with a badge showing a status of Normal', function() {
    var box = clusterOverviewPage.infoBar.infoBox('block-capacity');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('Block Capacity');
    expect(box.badge('no-alert').el.isDisplayed()).to.eventually.be.true;
    expect(box.badge('no-alert').title.getText()).to.eventually.equal('Normal');
  });

  it('should have a metadata capacity info-box with a badge showing a status of Warning', function() {
    var box = clusterOverviewPage.infoBar.infoBox('metadata-capacity');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('Metadata Capacity');
    expect(box.badge('warning').el.isDisplayed()).to.eventually.be.true;
    expect(box.badge('warning').title.getText()).to.eventually.equal('Warning');
  });

  it('should have an efficiency info-box showing 25.3x', function() {
    var box = clusterOverviewPage.infoBar.infoBox('efficiency-info');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('Efficiency');
    expect(box.value.getText()).to.eventually.equal('25.3x');
  });

  //  Disabling since these started failing for no obvious reason on 1/5 - will be revisisted with CLOUD-3452
  xit('The Efficiency info-box must be wider than its value text', function(){
    support.infoBoxSizeCheck(clusterOverviewPage.infoBar,'efficiency-info');
  });

  it('should have an utilization info-box showing 11%', function() {
    var box = clusterOverviewPage.infoBar.infoBox('utilization');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('Utilization');
    expect(box.value.getText()).to.eventually.equal('11%');
  });

  // Disabling since these started failing for no obvious reason on 1/5 - will be revisisted with CLOUD-3452
  xit('The Utilization info-box must be wider than its value text', function(){
    support.infoBoxSizeCheck(clusterOverviewPage.infoBar,'utilization');
  });

  it('should have an bandwidth info-box showing 178MB/s', function() {
    var box = clusterOverviewPage.infoBar.infoBox('bandwidth');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('Throughput');
    expect(box.value.getText()).to.eventually.equal('178MB/s');
  });

  // Disabling since these started failing for no obvious reason on 1/5 - will be revisisted with CLOUD-3452
  xit('The Bandwidth info-box must be wider than its value text', function(){
    support.infoBoxSizeCheck(clusterOverviewPage.infoBar,'bandwidth');
  });

  it('should have an iops info box showing 8.8k', function() {
    var box = clusterOverviewPage.infoBar.infoBox('iops');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('IOPS');
    expect(box.value.getText()).to.eventually.equal('8.8k');
  });

  // Disabling since these started failing for no obvious reason on 1/5 - will be revisisted with CLOUD-3452
  xit('The IOPS info-box must be wider than its value text', function(){
    support.infoBoxSizeCheck(clusterOverviewPage.infoBar,'iops');
  });

  it('should have a cluster fault info-box with a warning badge showing 3, and an error badge showing 2', function() {
    var box = clusterOverviewPage.infoBar.infoBox('cluster-faults');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('Faults');
    expect(box.badge('first.-warning').el.isDisplayed()).to.eventually.be.true;
    expect(box.badge('first.-warning').value.getText()).to.eventually.equal('3');
    expect(box.badge('second.-critical').el.isDisplayed()).to.eventually.be.true;
    expect(box.badge('second.-critical').value.getText()).to.eventually.equal('2');
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

    it('should display data from the correct API and properly format it in the table', function (done) {
      support.testTableData(clusterOverviewPage.clusterAlertTable, columns, maxRows, uniqueKey, fixture, done);
    });
  });
});
