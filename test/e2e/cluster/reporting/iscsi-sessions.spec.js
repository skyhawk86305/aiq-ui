/* jshint expr: true */
'use strict';

var expect = require('../../support.js').expect;
var SyncGraphsComponent = require('../../page-objects/components/sf-components.po').syncGraphs;
var iscsiSessionsGraphs = new SyncGraphsComponent('iscsi-sessions-sync-graphs');
var support = require('../../support.js');
var clusterSelect = new support.clusterSelectComponent();
var clusterId;

describe('The Cluster iSCSI Sessions Page', function () {
  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/reporting/iscsiSessions').then(done);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display a sync-graphs component on page load', function () {
    expect(iscsiSessionsGraphs.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any should have custom static date range options', function (done) {
    var expectedDateRangeOptions = ['Last Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'],
      actualDateRangeOptions = iscsiSessionsGraphs.dateRangeSelectors.static.staticDateRangeOptions;

    for (var i = 0; i < expectedDateRangeOptions.length; i++) {
      expect(actualDateRangeOptions.get(i).getText()).to.eventually.equal(expectedDateRangeOptions[i]);
    }
    expect(actualDateRangeOptions.count()).to.eventually.equal(5).notify(done);
  });

  it('@any should have a default date range selected', function () {
    expect(iscsiSessionsGraphs.dateRangeSelectors.static.activeDateRangeOption.getText()).to.eventually.equal('Last 7 Days');
  });

  it('@any @smoke should have 1 child graph', function () {
    expect(iscsiSessionsGraphs.childGraph('iscsi-sessions-child').el.isDisplayed()).to.eventually.be.true;
    expect(iscsiSessionsGraphs.childGraphTitle('iscsi-sessions').getText()).to.eventually.equal('iSCSI Sessions');
    expect(iscsiSessionsGraphs.childrenGraphs.count()).to.eventually.equal(1);
  });

  it('@any should have a specific graph selected as the initial context', function () {
    expect(iscsiSessionsGraphs.contextGraph.el.getAttribute('component-id')).to.eventually.equal('iscsi-sessions-context');
  });

  describe('iSCSI Sessions Graph', function () {
    it('@any @smoke should have the correct data series plotted, with the correct legends', function () {
      var graph = iscsiSessionsGraphs.childGraph('iscsi-sessions-child');
      expect(graph.svg.lines.count()).to.eventually.equal(2);
      var expectedSeries = ['activeSessions', 'peakActiveSessions'];
      var expectedLabels = ['Active Sessions','Peak Active Sessions'];
      for (var i = 0; i < expectedSeries.length; i++) {
        expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
        expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });


    it('@any should have an export button for the iSCSI Sessions Graph', function() {
      expect(iscsiSessionsGraphs.childGraph('iscsi-sessions-child').exportButton.isDisplayed()).to.eventually.be.true;
    });
  });
});

