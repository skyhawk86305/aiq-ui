/* jshint expr: true */
'use strict';

var expect = require('../../support.js').expect;
var SyncGraphsComponent = require('../../page-objects/components/sf-components.po').syncGraphs;
var efficiencyGraphs = new SyncGraphsComponent('efficiency-sync-graphs');
var support = require('../../support.js');
var clusterSelect = new support.clusterSelectComponent();
var clusterId;

describe('The Cluster Efficiency Page', function () {
  beforeAll(function (done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function (firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function (done) {
    browser.get('#/cluster/' + clusterId + '/reporting/efficiency').then(done);
  });

  afterAll(function () {
    support.logout();
  });

  it('@any @smoke should display a sync-graphs component on page load', function () {
    expect(efficiencyGraphs.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any should have custom static date range options', function (done) {
    var expectedDateRangeOptions = ['Last Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'],
      actualDateRangeOptions = efficiencyGraphs.dateRangeSelectors.static.staticDateRangeOptions;

    for (var i = 0; i < expectedDateRangeOptions.length; i++) {
      expect(actualDateRangeOptions.get(i).getText()).to.eventually.equal(expectedDateRangeOptions[i]);
    }
    expect(actualDateRangeOptions.count()).to.eventually.equal(5).notify(done);
  });

  it('@any should have a default date range selected', function () {
    expect(efficiencyGraphs.dateRangeSelectors.static.activeDateRangeOption.getText()).to.eventually.equal('Last 7 Days');
  });

  describe('Efficiency Graph', function () {
    var graphs = {
        efficiency: {
          id: 'efficiency',
          label: 'Efficiency',
          seriesIds: ['thinProvisioningFactor', 'deDuplicationFactor', 'compressionFactor', 'thinTimesDeDupFactor', 'thinTimesCompressionFactor', 'deDupTimesCompressionFactor', 'efficiencyFactor'],
          seriesLabels: ['Thin Provisioning Efficiency', 'Deduplication Efficiency', 'Compression Efficiency', 'Thin + Deduplication Efficiency', 'Thin + Compression Efficiency', 'Deduplication + Compression Efficiency', 'Overall Efficiency']
        }
      },
      graphKeys = Object.keys(graphs);


    it('@any @smoke should have 0 graph selections with the expected labels', function () {
      expect(efficiencyGraphs.graphSelectorPanel.graphSelections.count()).to.eventually.equal(0);
    });
  });
});
