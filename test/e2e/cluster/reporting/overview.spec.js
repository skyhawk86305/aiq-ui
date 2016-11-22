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

fdescribe('Cluster Overview Page', function () {
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
    expect(clusterOverviewPage.graphs.clusterPerformance.isDisplayed()).to.eventually.be.true;
  });

  it('should have the utilization graph', function () {
    expect(clusterOverviewPage.graphs.performanceUtilization.isDisplayed()).to.eventually.be.true;
  });

  it('should display the infobar', function() {
    expect(clusterOverviewPage.infoBar.isDisplayed()).to.eventually.be.true;
  });

  it('should have 8 info-boxes', function() {
    expect(clusterOverviewPage.infoBar.infoBoxes.count()).to.eventually.equal(8);
  });

  it('should have a node count info-box showing 6 nodes', function() {
    expect(clusterOverviewPage.infoBar.infoBox('node-count').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('node-count').value.getText()).to.eventually.equal('6');
  });


  it('should have a block capacity info-box with a badge showing a status of Normal', function() {
    expect(clusterOverviewPage.infoBar.infoBox('block-capacity').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('block-capacity').badge().el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('block-capacity').badge().title.getText()).to.eventually.equal('Normal');
  });

  it('should have a metadata capacity info-box with a badge showing a status of Warning', function() {
    expect(clusterOverviewPage.infoBar.infoBox('metadata-capacity').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('metadata-capacity').badge().el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('metadata-capacity').badge().title.getText()).to.eventually.equal('Warning');
  });


  it('should have an efficiency info-box showing 25.3x', function() {
    expect(clusterOverviewPage.infoBar.infoBox('efficiency-info').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('efficiency-info').value.getText()).to.eventually.equal('25.3x');
  });

  it('should have an utilization info-box showing 11%', function() {
    expect(clusterOverviewPage.infoBar.infoBox('utilization').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('utilization').value.getText()).to.eventually.equal('11%');
  });

  it('should have an bandwidth info-box showing 178MB/s', function() {
    expect(clusterOverviewPage.infoBar.infoBox('bandwidth').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('bandwidth').value.getText()).to.eventually.equal('178MB/s');
  });

  it('should have an bandwidth info box showing 8.8k', function() {
    expect(clusterOverviewPage.infoBar.infoBox('iops').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('iops').value.getText()).to.eventually.equal('8.8k');
  });


  it('should have a cluster fault info-box with a warning badge showing 3, and an error badge showing 2', function() {
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').badge('first').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').badge('first').value.getText()).to.eventually.equal('3');
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').badge('second').el.isDisplayed()).to.eventually.be.true;
    expect(clusterOverviewPage.infoBar.infoBox('cluster-faults').badge('second').value.getText()).to.eventually.equal('2');
  });

  it('should have the alerts table', function () {
    expect(clusterOverviewPage.alertTable.isDisplayed()).to.eventually.be.true;
  });

});
