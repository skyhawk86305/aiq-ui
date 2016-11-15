/* jshint expr: true */
'use strict';

var expect = require('../../support.js').expect;
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

});
