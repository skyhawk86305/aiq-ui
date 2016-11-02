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

fdescribe('Capacity Page Graphs', function () {
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

  describe('Used Space Graph', function () {
    it('should have the correct badges displayed', function () {
      expect(capacityPage.usedGraph().badges.count).to.eventually.equal(5);
      expect(capacityPage.usedGraph().badges.usedCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph().badges.warningThreshold.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph().badges.errorThreshold.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph().badges.totalCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph().badges.currentState.isDisplayed()).to.eventually.be.true;
    });
  });

  describe('Provisioned Space Graph', function () {
    it('should have the correct badges displayed', function () {
      expect(capacityPage.provisionedGraph().badges.count).to.eventually.equal(4);
      expect(capacityPage.provisionedGraph().badges.maxProvisionedSpace.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.provisionedGraph().badges.warningThreshold.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.provisionedGraph().badges.criticalThreshold.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.provisionedGraph().badges.currentState.isDisplayed()).to.eventually.be.true;
    });
  });

  describe('Metadata Space Graph', function () {
    it('should have the correct badges displayed', function () {
      expect(capacityPage.metadataGraph().badges.count).to.eventually.equal(3);
      expect(capacityPage.metadataGraph().badges.usedCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.metadataGraph().badges.totalCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.metadataGraph().badges.currentState.isDisplayed()).to.eventually.be.true;
    });
  });
});
