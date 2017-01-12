/* jshint expr: true */
'use strict';

var expect = require('../../support.js').expect;
var SyncGraphsComponent = require('../../page-objects/components/sf-components.po').syncGraphs;
var efficiencyGraphs = new SyncGraphsComponent('efficiency-sync-graphs');

describe('The Cluster Efficiency Page', function () {
  it('should display a sync-graphs component on page load', function () {
    browser.get('#/cluster/26/reporting/efficiency');
    expect(efficiencyGraphs.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have custom static date range options', function (done) {
    var expectedDateRangeOptions = ['Last 24 Hours', 'Last 3 Days', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'],
      actualDateRangeOptions = efficiencyGraphs.dateRangeSelectors.static.staticDateRangeOptions;

    for (var i = 0; i < expectedDateRangeOptions.length; i++) {
      expect(actualDateRangeOptions.get(i).getText()).to.eventually.equal(expectedDateRangeOptions[i]);
    }
    expect(actualDateRangeOptions.count()).to.eventually.equal(5).notify(done);
  });

  it('should have a default date range selected', function () {
    expect(efficiencyGraphs.dateRangeSelectors.static.activeDateRangeOption.getText()).to.eventually.equal('Last 7 Days');
  });

  it('should have 1 child graph', function () {
    expect(efficiencyGraphs.childGraph('efficiency-child').el.isDisplayed()).to.eventually.be.true;
    expect(efficiencyGraphs.childGraphTitle('efficiency').getText()).to.eventually.equal('Efficiency');
    expect(efficiencyGraphs.childrenGraphs.count()).to.eventually.equal(1);
  });

  it('should have a specific graph selected as the initial context', function () {
    expect(efficiencyGraphs.contextGraph.el.getAttribute('component-id')).to.eventually.equal('efficiency-context');
  });

  describe('Efficiency Graph', function () {
    it('should have the correct data series plotted, with the correct legends', function () {
      var graph = efficiencyGraphs.childGraph('efficiency-child');
      expect(graph.svg.lines.count()).to.eventually.equal(4);
      var expectedSeries = ['thinProvisioningFactor','deDuplicationFactor','compressionFactor','efficiencyFactor'];
      var expectedLabels = ['Thin Provisioning Efficiency','Deduplication Efficiency','Compression Efficiency','Overall Efficiency'];
      for (var i = 0; i < expectedSeries.length; i++) {
        expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
        expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });


    it('should have an export button for the Efficiency Graph', function() {
      expect(efficiencyGraphs.childGraph('efficiency-child').exportButton.isDisplayed()).to.eventually.be.true;
    });
  });
});
