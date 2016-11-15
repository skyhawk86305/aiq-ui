/* jshint expr: true */
'use strict';

var expect = require('../../support.js').expect;
var mockBackend = require('../../support.js').mockBackend;
var PerformanceComponent = require('../../../page-objects/performance.po');
var NavbarComponent = require('../../../page-objects/navbar.po');
var ClusterSelectComponent = require('../../../page-objects/cluster-select.po');

var performancePage;
var navbar = new NavbarComponent();
var clusterSelect = new ClusterSelectComponent();

describe('Performance Page Graphs', function () {
  beforeEach(function() {
    mockBackend.enable(browser);
    mockBackend.http.whenGET('/sessions').respond(function() {
      return [200, {}];
    });
    mockBackend.http.whenGET(/\/graph/).passThrough();
    mockBackend.http.whenPOST('/v2/api').passThrough();
    browser.get('#').then(function () {
      // Navigate to the correct page.
      clusterSelect.open().clusterList.select('barCluster');
      navbar.subNavbar.click('cluster-reporting');
      navbar.subNavMenu.click('cluster-reporting-performance');
      performancePage = new PerformanceComponent();
    });
  });

  afterEach(function() {
    mockBackend.disable();
  });

  it('should have the context graph', function () {
    expect(performancePage.contextGraph.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have the correct context graph buttons', function () {
    expect(performancePage.contextButtons().count).to.eventually.equal(3);
    expect(performancePage.contextButtons().utilization.isDisplayed()).to.eventually.equal.true;
    expect(performancePage.contextButtons().iops.isDisplayed()).to.eventually.equal.true;
    expect(performancePage.contextButtons().bandwidth.isDisplayed()).to.eventually.equal.true;
  });

  it('should have the correct child graphs', function () {
    expect(performancePage.utilizationGraph().el.isDisplayed()).to.eventually.be.true;
    expect(performancePage.iopsGraph().el.isDisplayed()).to.eventually.be.true;
    expect(performancePage.bandwidthGraph().el.isDisplayed()).to.eventually.be.true;
  });
});
