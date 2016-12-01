/* jshint expr: true */
'use strict';

var expect = require('../../support.js').expect;
var SyncGraphsComponent = require('../../../page-objects/components/sf-components.po').syncGraphs;
var performanceGraphs = new SyncGraphsComponent('performance-sync-graphs');

describe('The Cluster Performance Page', function () {
  it('should display a sync-graphs component on page load', function () {
    browser.get('#/cluster/26/reporting/performance');
    expect(performanceGraphs.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have custom static date range options', function (done) {
    var expectedDateRangeOptions = ['Last 24 Hours', 'Last 3 Days', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'],
      actualDateRangeOptions = performanceGraphs.dateRangeSelectors.static.staticDateRangeOptions;

    for (var i = 0; i < expectedDateRangeOptions.length; i++) {
      expect(actualDateRangeOptions.get(i).getText()).to.eventually.equal(expectedDateRangeOptions[i]);
    }
    expect(actualDateRangeOptions.count()).to.eventually.equal(5).notify(done);
  });

  it('should have a default date range selected', function () {
    expect(performanceGraphs.dateRangeSelectors.static.activeDateRangeOption.getText()).to.eventually.equal('Last 7 Days');
  });

  it('should have 3 child graphs', function (done) {
    var childGraphIds = ['utilization-child', 'iops-child', 'bandwidth-child'];

    for (var i = 0; i < childGraphIds.length; i++) {
      expect(performanceGraphs.childGraph(childGraphIds[i]).el.isDisplayed()).to.eventually.be.true;
    }
    expect(performanceGraphs.childrenGraphs.count()).to.eventually.equal(3).notify(done);
  });

  it('should have a specific graph selected as the initial context', function () {
    expect(performanceGraphs.contextGraph.el.getAttribute('component-id')).to.eventually.equal('iops-context');
  });

  describe('Cluster Utilization Graph', function () {
    it('should have the correct data series plotted', function () {
      var graph = performanceGraphs.childGraph('utilization-child');
      expect(graph.svg.lines.count()).to.eventually.equal(1);
      expect(graph.svg.line('clusterUtilizationPct').isDisplayed()).to.eventually.be.true;
    });
  });

  describe('Cluster IOPS Graph', function () {
    it('should have the correct data series plotted', function () {
      var graph = performanceGraphs.childGraph('iops-child');
      expect(graph.svg.lines.count()).to.eventually.equal(3);
      expect(graph.svg.line('readOpsPerSec').isDisplayed()).to.eventually.be.true;
      expect(graph.svg.line('writeOpsPerSec').isDisplayed()).to.eventually.be.true;
      expect(graph.svg.line('totalOpsPerSec').isDisplayed()).to.eventually.be.true;
    });
  });

  describe('Cluster Bandwidth Graph', function () {
    it('should have the correct data series plotted', function () {
      var graph = performanceGraphs.childGraph('bandwidth-child');
      expect(graph.svg.lines.count()).to.eventually.equal(3);
      expect(graph.svg.line('readBytesPerSec').isDisplayed()).to.eventually.be.true;
      expect(graph.svg.line('writeBytesPerSec').isDisplayed()).to.eventually.be.true;
      expect(graph.svg.line('totalBytesPerSec').isDisplayed()).to.eventually.be.true;
    });
  });
});