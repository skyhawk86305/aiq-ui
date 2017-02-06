/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = support.expect;
var ClusterOverviewComponent = require('../../page-objects/cluster/reporting/overview.po');
var clusterOverviewPage = new ClusterOverviewComponent();
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();


describe('Cluster Overview Page', function () {
  beforeEach(function(done) {
    support.login(function() {
      browser.get('#/');
      clusterSelect.open().clustersList().selectClusterByIndex(0);
      navbar.subNavbar.click('cluster-reporting').then(function() {
        navbar.subNavMenu.click('cluster-reporting-overview').then(done);
      });
    });
  });

  afterEach(function(done) {
      support.logout(done);
  });

  it('should have the performance graph with the correct title, series and legend items', function () {
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

  it('should have an export button for the Performance Graph', function() {
    expect(clusterOverviewPage.graphs.clusterPerformance.exportButton.isDisplayed()).to.eventually.be.true;
  });

  it('should have the utilization graph with the correct title, series and legend items', function () {
    var graph = clusterOverviewPage.graphs.performanceUtilization;
    expect(graph.el.isDisplayed()).to.eventually.be.true;
    expect(graph.title.getText()).to.eventually.equal('Utilization');
    expect(graph.svg.lines.count()).to.eventually.equal(1);
    expect(graph.svg.line('clusterUtilizationPct').isDisplayed()).to.eventually.be.true;
    expect(graph.legend.legendItem('clusterUtilizationPct').label.getText()).to.eventually.equal('Utilization');

  });

  it('should have an export button for the Utilization Graph', function() {
    expect(clusterOverviewPage.graphs.performanceUtilization.exportButton.isDisplayed()).to.eventually.be.true;
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
    expect(box.title.getText()).to.eventually.equal('Efficiency (x)');
    expect(box.value.getText()).to.eventually.equal('25.3');
  });

  it('The Efficiency info-box must be wider than its value text', function(){
    support.infoBoxSizeCheck(clusterOverviewPage.infoBar,'efficiency-info');
  });

  it('should have an utilization info-box showing 11%', function() {
    var box = clusterOverviewPage.infoBar.infoBox('utilization');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('Utilization (%)');
    expect(box.value.getText()).to.eventually.equal('11');
  });

  it('The Utilization info-box must be wider than its value text', function(){
    support.infoBoxSizeCheck(clusterOverviewPage.infoBar,'utilization');
  });

  it('should have an bandwidth info-box showing 178MB/s', function() {
    var box = clusterOverviewPage.infoBar.infoBox('bandwidth');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('Throughput');
    expect(box.value.getText()).to.eventually.equal('178MB/s');
  });

  it('The Bandwidth info-box must be wider than its value text', function(){
    support.infoBoxSizeCheck(clusterOverviewPage.infoBar,'bandwidth');
  });

  it('should have an iops info box showing 8.8k', function() {
    var box = clusterOverviewPage.infoBar.infoBox('iops');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('IOPS');
    expect(box.value.getText()).to.eventually.equal('8.8k');
  });

  it('The IOPS info-box must be wider than its value text', function(){
    support.infoBoxSizeCheck(clusterOverviewPage.infoBar,'iops');
  });

  it('should have a cluster fault info-box with a warning badge showing 3, and an error badge showing 2', function() {
    var box = clusterOverviewPage.infoBar.infoBox('cluster-faults');
    expect(box.el.isDisplayed()).to.eventually.be.true;
    expect(box.title.getText()).to.eventually.equal('Unresolved Faults');
    expect(box.badge('first.-warning').el.isDisplayed()).to.eventually.be.true;
    expect(box.badge('first.-warning').value.getText()).to.eventually.equal('3');
    expect(box.badge('second.-critical').el.isDisplayed()).to.eventually.be.true;
    expect(box.badge('second.-critical').value.getText()).to.eventually.equal('2');
  });
});
