/* jshint expr: true */
'use strict';

var expect = require('../../support.js').expect;
var CapacityPage = require('../../page-objects/cluster/reporting/capacity.po');
var capacityPage = new CapacityPage();


// Verify that the text fits inside the infobox. name is the infobox name
function infoBoxSizeCheck(infobar,name){
  infobar.infoBox(name).el.getSize().then(function(boxSize){
    infobar.infoBox(name).value.getSize().then(function(dataSize) {
      expect(boxSize.width).to.be.at.least(dataSize.width);
      expect(boxSize.height).to.be.at.least(dataSize.height);
    })
  })
};

describe('The Cluster Capacity Page', function () {
  it('should display a sync-graphs component on page load', function () {
    browser.get('#/cluster/26/reporting/capacity');
    expect(capacityPage.syncGraphs.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have custom static date range options', function (done) {
    var expectedDateRangeOptions = ['Last 24 Hours', 'Last 3 Days', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'],
      actualDateRangeOptions = capacityPage.syncGraphs.dateRangeSelectors.static.staticDateRangeOptions;

    for (var i = 0; i < expectedDateRangeOptions.length; i++) {
      expect(actualDateRangeOptions.get(i).getText()).to.eventually.equal(expectedDateRangeOptions[i]);
    }
    expect(actualDateRangeOptions.count()).to.eventually.equal(5).notify(done);
  });

  it('should have a default date range selected', function () {
    expect(capacityPage.syncGraphs.dateRangeSelectors.static.activeDateRangeOption.getText()).to.eventually.equal('Last 7 Days');
  });

  it('should have 3 child graphs', function (done) {
    var childGraphIds = ['provisioned-space-child', 'block-capacity-child', 'metadata-capacity-child'];

    for (var i = 0; i < childGraphIds.length; i++) {
      expect(capacityPage.syncGraphs.childGraph(childGraphIds[i]).el.isDisplayed()).to.eventually.be.true;
    }
    expect(capacityPage.syncGraphs.childrenGraphs.count()).to.eventually.equal(3).notify(done);
  });

  it('should have a specific graph selected as the initial context', function () {
    expect(capacityPage.syncGraphs.contextGraph.el.getAttribute('component-id')).to.eventually.equal('block-capacity-context');
  });

  describe('Provisioned Space Graph', function () {
    it('should have the correct data series plotted', function () {
      var graph = capacityPage.syncGraphs.childGraph('provisioned-space-child');
      expect(graph.svg.lines.count()).to.eventually.equal(1);
      expect(graph.svg.line('provisionedSpace').isDisplayed()).to.eventually.be.true;
    });
  });

  describe('Block Capacity Graph', function () {
    it('should have the correct data series plotted', function () {
      var graph = capacityPage.syncGraphs.childGraph('block-capacity-child');
      expect(graph.svg.lines.count()).to.eventually.equal(2);
      expect(graph.svg.line('maxUsedSpace').isDisplayed()).to.eventually.be.true;
      expect(graph.svg.line('usedSpace').isDisplayed()).to.eventually.be.true;
    });

    it('should have the correct info boxes displayed', function () {
      var infoBar = capacityPage.infoBars.blockCapacity;
      expect(infoBar.infoBoxes.count()).to.eventually.equal(5);
      expect(infoBar.infoBox('used-capacity').el.isDisplayed()).to.eventually.be.true;
      expect(infoBar.infoBox('warning-threshold').el.isDisplayed()).to.eventually.be.true;
      expect(infoBar.infoBox('error-threshold').el.isDisplayed()).to.eventually.be.true;
      expect(infoBar.infoBox('total-capacity').el.isDisplayed()).to.eventually.be.true;
      expect(infoBar.infoBox('current-state').el.isDisplayed()).to.eventually.be.true;
    });

    it('The info-boxes must be wider than their value text', function(){
      var infoBar = capacityPage.infoBars.blockCapacity;
      var boxNames = ['used-capacity','warning-threshold','error-threshold','total-capacity','current-state'];
      for (var i=0; i < boxNames.length; i++) {
        infoBoxSizeCheck(infoBar, boxNames[i]);
      };
    });

  });

  describe('Metadata Capacity Graph', function () {
    it('should have the correct data series plotted', function () {
      var graph = capacityPage.syncGraphs.childGraph('metadata-capacity-child');
      expect(graph.svg.lines.count()).to.eventually.equal(2);
      expect(graph.svg.line('maxUsedMetadataSpace').isDisplayed()).to.eventually.be.true;
      expect(graph.svg.line('usedMetadataSpace').isDisplayed()).to.eventually.be.true;
    });

    it('should have the correct info boxes displayed', function () {
      var infoBar = capacityPage.infoBars.metadataCapacity;
      expect(infoBar.infoBoxes.count()).to.eventually.equal(3);
      expect(infoBar.infoBox('used-capacity').el.isDisplayed()).to.eventually.be.true;
      expect(infoBar.infoBox('total-capacity').el.isDisplayed()).to.eventually.be.true;
      expect(infoBar.infoBox('current-state').el.isDisplayed()).to.eventually.be.true;
    });

    it('The info-boxes must be wider than their value text', function(){
      var infoBar = capacityPage.infoBars.metadataCapacity;
      var boxNames = ['used-capacity','total-capacity','current-state'];
      for (var i=0; i < boxNames.length; i++) {
        infoBoxSizeCheck(infoBar, boxNames[i]);
      };
    });

  });
});
