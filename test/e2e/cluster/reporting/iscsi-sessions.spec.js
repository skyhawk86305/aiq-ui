/* jshint expr: true */
'use strict';

var expect = require('../../support.js').expect;
var SyncGraphsComponent = require('../../page-objects/components/sf-components.po').syncGraphs;
var iscsiSessionsGraphs = new SyncGraphsComponent('iscsi-sessions-sync-graphs');
var support = require('../../support.js');
var clusterSelect = new support.clusterSelectComponent();
var clusterId;

describe('The Cluster iSCSI Sessions Page', function () {
  beforeAll(function (done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function (firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function (done) {
    browser.get('#/cluster/' + clusterId + '/reporting/iscsiSessions').then(done);
  });

  afterAll(function () {
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

  describe('iSCSI Sessions Graph', function () {
    var graphs = {
        iscsi: {
          id: 'iscsi-sessions',
          label: 'iSCSI Sessions',
          seriesIds: ['activeSessions', 'peakActiveSessions'],
          seriesLabels: ['Active Sessions', 'Peak Active Sessions']
        }
      },
      graphKeys = Object.keys(graphs);

    it('@any @smoke should have 0 graph selections with the expected labels', function () {
      expect(iscsiSessionsGraphs.graphSelectorPanel.graphSelections.count()).to.eventually.equal(0);
    });
  });
});
