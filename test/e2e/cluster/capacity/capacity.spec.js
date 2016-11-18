/* jshint expr: true */
'use strict';

var expect = require('../../support.js').expect;
var mockBackend = require('../../support.js').mockBackend;
var CapacityComponent = require('../../../page-objects/capacity.po');
var NavbarComponent = require('../../../page-objects/navbar.po');
var ClusterSelectComponent = require('../../../page-objects/cluster-select.po');

var capacityPage;
var navbar = new NavbarComponent();
var clusterSelect = new ClusterSelectComponent();

describe('Capacity Page Graphs', function () {
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
      navbar.subNavMenu.click('cluster-reporting-capacity');
      capacityPage = new CapacityComponent();
    });
  });

  afterEach(function() {
    mockBackend.disable();
  });

  it('should have the static date selector', function () {
    expect(capacityPage.staticDateSelector().el.isDisplayed()).to.eventually.be.true;
  });

  it('should have the context graph', function () {
    expect(capacityPage.contextGraph.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have the correct context graph buttons', function () {
    expect(capacityPage.contextButtons().count).to.eventually.equal(3);
    expect(capacityPage.contextButtons().provisioned.isDisplayed()).to.eventually.equal.true;
    expect(capacityPage.contextButtons().used.isDisplayed()).to.eventually.equal.true;
    expect(capacityPage.contextButtons().metadata.isDisplayed()).to.eventually.equal.true;
  });

  it('should have the correct child graphs', function () {
    expect(capacityPage.provisionedGraph().el.isDisplayed()).to.eventually.be.true;
    expect(capacityPage.usedGraph().el.isDisplayed()).to.eventually.be.true;
    expect(capacityPage.metadataGraph().el.isDisplayed()).to.eventually.be.true;
  });

  describe('Static Date Selector', function() {
    var expectedDateRanges = ['Last 24 Hours', 'Last 3 Days', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'];

    it ('should have the correct static date ranges', function() {
      expect(capacityPage.staticDateSelector().ranges.count).to.eventually.equal(5);
      for (var i = 0; i < expectedDateRanges.length; i++) {
        expect(capacityPage.staticDateSelector().range(i).getText()).to.eventually.equal(expectedDateRanges[i]);
      }
    });

    it ('should default to 30 days', function() {
      expect(capacityPage.staticDateSelector().range(4).getText()).to.eventually.equal('Last 30 Days');
    });
  });

  describe('Used Space Graph', function () {
    it('should have the correct info boxes displayed', function () {
      expect(capacityPage.usedGraph().infoBox.count).to.eventually.equal(5);
      expect(capacityPage.usedGraph().infoBox.usedCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph().infoBox.warningThreshold.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph().infoBox.errorThreshold.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph().infoBox.totalCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph().infoBox.currentState.isDisplayed()).to.eventually.be.true;
    });
  });

  describe('Provisioned Space Graph', function () {
    it('should have the correct info boxes displayed', function () {
      expect(capacityPage.provisionedGraph().infoBox.count).to.eventually.equal(0);
    });
  });

  describe('Metadata Space Graph', function () {
    it('should have the correct info boxes displayed', function () {
      expect(capacityPage.metadataGraph().infoBox.count).to.eventually.equal(3);
      expect(capacityPage.metadataGraph().infoBox.usedCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.metadataGraph().infoBox.totalCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.metadataGraph().infoBox.currentState.isDisplayed()).to.eventually.be.true;
    });
  });
});
