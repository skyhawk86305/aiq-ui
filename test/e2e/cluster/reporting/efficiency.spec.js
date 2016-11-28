/* jshint expr: true */
'use strict';

var expect = require('../../support.js').expect;
var mockBackend = require('../../support.js').mockBackend;
var EfficiencyComponent = require('../../../page-objects/efficiency.po');
var NavbarComponent = require('../../../page-objects/navbar.po');
var ClusterSelectComponent = require('../../../page-objects/cluster-select.po');

var efficiencyPage;
var navbar = new NavbarComponent();
var clusterSelect = new ClusterSelectComponent();

describe('Efficiency Page Graphs', function () {
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
      navbar.subNavMenu.click('cluster-reporting-efficiency');
      efficiencyPage = new EfficiencyComponent();
    });
  });

  afterEach(function() {
    mockBackend.disable();
  });

  it('should have the context graph', function () {
    expect(efficiencyPage.contextGraph.el.isDisplayed()).to.eventually.be.true;
  });

  it('should have the correct context graph buttons', function () {
    expect(efficiencyPage.contextButtons().count).to.eventually.equal(1);
    expect(efficiencyPage.contextButtons().efficiency.isDisplayed()).to.eventually.equal.true;
  });

  it('should have the correct child graphs', function () {
    expect(efficiencyPage.graphs.efficiencyGraph.el.isDisplayed()).to.eventually.be.true;
  });
});
