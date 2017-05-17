'use strict';

var expect = require('../../support.js').expect;
var SyncGraphsComponent = require('../../page-objects/components/sf-components.po').syncGraphs;
var performanceGraphs = new SyncGraphsComponent('performance-sync-graphs');
var support = require('../../support.js');
var clusterSelect = new support.clusterSelectComponent();
var clusterId;

describe('The Cluster Performance Page', function () {

  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/reporting/performance').then(done);
  });

  afterAll(function() {
    support.logout();
  });


  it('@any @smoke should display a sync-graphs component on page load', function () {
    expect(performanceGraphs.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any should have custom static date range options', function (done) {
    var expectedDateRangeOptions = ['Last Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'],
      actualDateRangeOptions = performanceGraphs.dateRangeSelectors.static.staticDateRangeOptions;

    for (var i = 0; i < expectedDateRangeOptions.length; i++) {
      expect(actualDateRangeOptions.get(i).getText()).to.eventually.equal(expectedDateRangeOptions[i]);
    }
    expect(actualDateRangeOptions.count()).to.eventually.equal(5).notify(done);
  });

  it('@any should have a default date range selected', function () {
    expect(performanceGraphs.dateRangeSelectors.static.activeDateRangeOption.getText()).to.eventually.equal('Last 7 Days');
  });

  it('@any @smoke should have 3 child graphs', function (done) {
    var childGraphIds = ['utilization-child', 'iops-child', 'throughput-child'];
    var childGraphTitleIds = ['utilization', 'iops', 'throughput'];
    var childGraphTitles = ['Utilization','IOPS','Throughput'];

    for (var i = 0; i < childGraphIds.length; i++) {
      expect(performanceGraphs.childGraph(childGraphIds[i]).el.isDisplayed()).to.eventually.be.true;
      expect(performanceGraphs.childGraphTitle(childGraphTitleIds[i]).getText()).to.eventually.equal(childGraphTitles[i]);
    }
    expect(performanceGraphs.childrenGraphs.count()).to.eventually.equal(3).notify(done);
  });

  it('@any should have a specific graph selected as the initial context', function () {
    expect(performanceGraphs.contextGraph.el.getAttribute('component-id')).to.eventually.equal('iops-context');
  });

  describe('Cluster Utilization Graph', function () {
    it('@any @smoke should have the correct data series plotted, with the correct legend items', function () {
      var graph = performanceGraphs.childGraph('utilization-child');
      expect(graph.svg.lines.count()).to.eventually.equal(1);
      expect(graph.svg.line('clusterUtilizationPct').isDisplayed()).to.eventually.be.true;
      expect(graph.legend.legendItem('clusterUtilizationPct').label.getText()).to.eventually.equal('Utilization');
    });

    it('@any should have an export button for the Cluster Utilization Graph', function() {
      expect(performanceGraphs.childGraph('utilization-child').exportButton.isDisplayed()).to.eventually.be.true;
    });
  });

  describe('Cluster IOPS Graph', function () {
    it('@any @smoke should have the correct data series plotted, with the correct legend items', function () {
      var graph = performanceGraphs.childGraph('iops-child');
      expect(graph.svg.lines.count()).to.eventually.equal(3);

      var expectedSeries = ['readOpsPerSec','writeOpsPerSec','totalOpsPerSec'],
        expectedLabels = ['Read IOPS','Write IOPS','Total IOPS'];
      for (var i = 0; i < expectedSeries.length; i++) {
        expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
        expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });

    it('@any should have an export button for theCluster IOPS Graph', function() {
      expect(performanceGraphs.childGraph('iops-child').exportButton.isDisplayed()).to.eventually.be.true;
    });

  });

  describe('Cluster Bandwidth Graph', function () {
    it('@any @smoke should have the correct data series plotted, with the correct legend items', function () {
      var graph = performanceGraphs.childGraph('throughput-child');
      expect(graph.svg.lines.count()).to.eventually.equal(3);

      var expectedSeries = ['readBytesPerSec','writeBytesPerSec','totalBytesPerSec'],
        expectedLabels = ['Read Throughput','Write Throughput','Total Throughput'];
      for (var i = 0; i < expectedSeries.length; i++) {
        expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
        expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });

    it('@any should have an export button for the Cluster Bandwidth Graph', function() {
      expect(performanceGraphs.childGraph('throughput-child').exportButton.isDisplayed()).to.eventually.be.true;
    });

  });
});
