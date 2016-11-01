/* jshint expr: true */
'use strict';

var expect = require('../support.js').expect;
var mockBackend = require('../support.js').mockBackend;
var CapacityComponent = require('../../page-objects/capacity.po');

var capacityPage = new CapacityComponent();

describe('Capacity Page Graphs', function () {
  beforeEach(function() {
    mockBackend.enable(browser);
    mockBackend.http.whenGET('/sessions').respond(function() {
      return [200, {}];
    });
    mockBackend.http.whenPOST('/graph').passThrough();
  });

  afterEach(function() {
    mockBackend.disable();
  });

  it('should have the context graph', function () {
    expect(capacityPage.contextGraph.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have the correct context graph buttons', function () {
    expect(capacityPage.contextGraph.buttons.count).eventually.toEqual(3);
    expect(capacityPage.contextGraph.buttons.provisioned.isDisplayed()).to.eventually.equal.true;
    expect(capacityPage.contextGraph.buttons.used.isDisplayed()).to.eventually.equal.true;
    expect(capacityPage.contextGraph.buttons.metadata.isDisplayed()).to.eventually.equal.true;
  });

  it('should have the correct child graphs', function () {
    expect(capacityPage.provisionedGraph.el.isDisplayed()).to.eventually.be.true;
    expect(capacityPage.usedGraph.el.isDisplayed()).to.eventually.be.true;
    expect(capacityPage.metadataGraph.el.isDisplayed()).to.eventually.be.true;
  });

  describe('Used Space Graph', function () {
    it('should have the correct badges displayed', function () {
      expect(capacityPage.usedGraph.count).eventually.toEqual(5);
      expect(capacityPage.usedGraph.usedCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph.warningThreshold.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph.errorThreshold.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph.totalCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.usedGraph.currentState.isDisplayed()).to.eventually.be.true;
    });
  });

  describe('Provisioned Space Graph', function () {
    it('should have the correct badges displayed', function () {
      expect(capacityPage.provisionedGraph.count).eventually.toEqual(4);
      expect(capacityPage.provisionedGraph.maxProvisionedSpace.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.provisionedGraph.warningThreshold.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.provisionedGraph.criticalThreshold.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.provisionedGraph.currentState.isDisplayed()).to.eventually.be.true;
    });
  });

  describe('Metadata Space Graph', function () {
    it('should have the correct badges displayed', function () {
      expect(capacityPage.metadataGraph.count).eventually.toEqual(3);
      expect(capacityPage.metadataGraph.usedCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.metadataGraph.totalCapacity.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.metadataGraph.currentState.isDisplayed()).to.eventually.be.true;
    });
  });
});
