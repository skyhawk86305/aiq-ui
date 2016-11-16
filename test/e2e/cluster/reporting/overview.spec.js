/* jshint expr: true */
'use strict';

// var expect = require('../../support.js').expect;
var mockBackend = require('../../support.js').mockBackend;
var ClusterOverviewComponent = require('../../../page-objects/cluster-overview.po');
var NavbarComponent = require('../../../page-objects/navbar.po');
var ClusterSelectComponent = require('../../../page-objects/cluster-select.po');

var clusterOverviewPage;
var navbar = new NavbarComponent();
var clusterSelect = new ClusterSelectComponent();

describe('Cluster Overview Page', function () {
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
      navbar.subNavMenu.click('cluster-reporting-overview');
      clusterOverviewPage = new ClusterOverviewComponent();
    });
  });

  afterEach(function() {
    mockBackend.disable();
  });

  it('should have the performance graph', function () {
    expect(performancePage.graphs.clusterPerformance.isDisplayed()).to.eventually.be.true;
  });

  it('should have the utilization graph', function () {
    expect(performancePage.graphs.performanceUtilization.isDisplayed()).to.eventually.be.true;
  });

  it('should display the infobar', function() {
    expect(clusterOverviewPage.infoBar.isDisplayed()).to.eventually.be.true;
  });

  it('should have 8 badges', function() {
    expect(clusterOverviewPage.infoBar.infoBoxes.count()).to.eventually.equal(8);
  });

  it('should have the correct badges', function() {
    expect(clusterOverviewPage.infoBar.infoBox('node-count').box.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('block-capacity').box.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('metadata-capacity').box.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('efficiency').box.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('utilization').box.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('iops').box.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('bandwidth').box.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').box.isDisplayed()).to.eventually.be.true;
  });

  it('should have the correct badges', function() {
    expect(clusterOverviewPage.infoBar.infoBox('block-capacity').badge().el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('metadata-capacity').badge().el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('block-capacity').badge('first').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('metadata-capacity').badge('second').el.isDisplayed()).to.eventually.be.true;
  });

  it('should have the alerts table', function () {
    expect(performancePage.alertTable.isDisplayed()).to.eventually.be.true;
  });

});
