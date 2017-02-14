/* jshint expr: true */
'use strict';

var support = require('../../support.js');
var expect = require('../../support.js').expect;
var CapacityPage = require('../../page-objects/cluster/reporting/capacity.po');
var capacityPage = new CapacityPage();
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();

fdescribe('The Cluster Capacity Page', function () {

  //working
  beforeEach(function(done) {
    support.manualLogin('testuser@solidfire.com','password123');
    clusterSelect.open().clustersList().selectClusterByIndex(0);
    navbar.subNavbar.click('cluster-reporting').then(function() {
      navbar.subNavMenu.click('cluster-reporting-capacity').then(done);
    });
  });

  // beforeEach(function(done) {
  //   support.login(function() {
  //     browser.get('#/');
  //     clusterSelect.open().clustersList().selectClusterByIndex(0);

  //     navbar.subNavbar.click('cluster-vvols').then(function() {
  //       navbar.subNavMenu.click('cluster-vvols-bindings').then(done);
  //     });
  //   });
  // });

  afterEach(function(done) {
      support.manualLogout().then(done);
  });

  it('should display a sync-graphs component on page load', function () {
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

  it('should have a specific graph selected as the initial context', function () {
    expect(capacityPage.syncGraphs.contextGraph.el.getAttribute('component-id')).to.eventually.equal('block-capacity-context');
  });

  it('should have 3 child graphs', function (done) {
    var childGraphIds = ['provisioned-space-child','metadata-capacity-child','block-capacity-child'];
    var childGraphTitleIds = ['provisioned-space','metadata-capacity','block-capacity'];
    var childGraphTitles = ['Provisioned Space','Metadata Capacity','Block Capacity'];

    for (var i = 0; i < childGraphIds.length; i++) {
      capacityPage.syncGraphs.graphSelector.select(childGraphTitleIds[i]);
      expect(capacityPage.syncGraphs.childGraph(childGraphIds[i]).el.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.syncGraphs.childGraphTitle(childGraphTitleIds[i]).getText()).to.eventually.equal(childGraphTitles[i]);
      }
    expect(capacityPage.syncGraphs.childrenGraphs.count()).to.eventually.equal(3).notify(done);
  });


  describe('Provisioned Space Graph', function () {
    it('should have the correct data series plotted with the appropriate legend', function () {
      var graph = capacityPage.syncGraphs.childGraph('provisioned-space-child');
      expect(graph.svg.lines.count()).to.eventually.equal(2);

      var expectedSeries = ['maxProvisionedSpace','provisionedSpace'],
        expectedLabels = ['Max Provisioned Space','Provisioned Space'];
      for (var i = 0; i < expectedSeries.length; i++) {
        expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
        expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });
  });

  describe('Block Capacity Graph', function () {
    it('should have the correct data series plotted, with the appropriate legends', function () {
      var graph = capacityPage.syncGraphs.childGraph('block-capacity-child');
      expect(graph.svg.lines.count()).to.eventually.equal(2);

      var expectedSeries = ['maxUsedSpace','usedSpace'],
        expectedLabels = ['Max Used Space','Used Space'];
      for (var i = 0; i < expectedSeries.length; i++) {
        expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
        expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });

    it('should have an export button for the Block Capacity Graph', function() {
      expect(capacityPage.syncGraphs.childGraph('block-capacity-child').exportButton.isDisplayed()).to.eventually.be.true;
    });

    it('should have the correct info boxes displayed with the correct labels', function () {
      var infoBar = capacityPage.infoBars.blockCapacity;
      expect(infoBar.infoBoxes.count()).to.eventually.equal(5);
      var expectedBoxes = ['used-capacity','warning-threshold','error-threshold','total-capacity','current-state'];
      var expectedLabels = ['Used Capacity','Warning Threshold','Error Threshold','Total Capacity','Current State'];
      for (var i = 0; i < expectedBoxes.length; i++) {
        expect(infoBar.infoBox(expectedBoxes[i]).el.isDisplayed()).to.eventually.be.true;
        expect(infoBar.infoBox(expectedBoxes[i]).title.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });

    it('The info-boxes must be wider than their value text', function(){
      var infoBar = capacityPage.infoBars.blockCapacity;
      var boxNames = ['used-capacity','warning-threshold','error-threshold','total-capacity','current-state'];
      for (var i=0; i < boxNames.length; i++) {
        support.infoBoxSizeCheck(infoBar, boxNames[i]);
      }
    });
  });

  describe('Metadata Capacity Graph', function () {
    it('should have the correct data series plotted, with the appropriate legends', function () {
      var graph = capacityPage.syncGraphs.childGraph('metadata-capacity-child');
      expect(graph.svg.lines.count()).to.eventually.equal(2);
      var expectedSeries = ['maxUsedMetadataSpace','usedMetadataSpace'],
        expectedLabels = ['Total Capacity','Used Metadata Space'];
      for (var i = 0; i < expectedSeries.length; i++) {
        expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
        expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });

    it('should have an export button for the Metadata Capacity Graph', function() {
      expect(capacityPage.syncGraphs.childGraph('metadata-capacity-child').exportButton.isDisplayed()).to.eventually.be.true;
    });

    it('should have the correct info boxes displayed, with the appropriate titles', function () {
      var infoBar = capacityPage.infoBars.metadataCapacity;
      expect(infoBar.infoBoxes.count()).to.eventually.equal(3);
      var expectedBoxes = ['used-capacity','total-capacity','current-state'];
      var expectedLabels = ['Used Capacity','Total Capacity','Current State'];
      for (var i = 0; i < expectedBoxes.length; i++) {
        expect(infoBar.infoBox(expectedBoxes[i]).el.isDisplayed()).to.eventually.be.true;
        expect(infoBar.infoBox(expectedBoxes[i]).title.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });

    it('The info-boxes must be wider than their value text', function(){
      var infoBar = capacityPage.infoBars.metadataCapacity;
      var boxNames = ['used-capacity','total-capacity','current-state'];
      for (var i=0; i < boxNames.length; i++) {
        support.infoBoxSizeCheck(infoBar, boxNames[i]);
      }
    });
  });
});
