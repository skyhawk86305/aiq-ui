/* jshint expr: true */
'use strict';

var expect = require('../support.js').expect;
var NavbarComponent = require('../../page-objects/navbar.po');
var ClusterSelectComponent = require('../../page-objects/cluster-select.po');

var navbar = new NavbarComponent();
var clusterSelect = new ClusterSelectComponent();

describe('The main navbar', function() {
  it('should display on initial page load', function() {
    browser.get('#');
    expect(navbar.mainNavbar.el.isPresent()).to.eventually.be.true;
    expect(navbar.mainNavbar.items.count()).to.eventually.equal(4);
  });

  it('should contain a menu with options', function() {
    expect(navbar.menu.button.isPresent()).to.eventually.be.true;
    expect(navbar.menu.expand().options.count()).to.eventually.equal(2);
  });

  it('should change the URL route and set the active state when clicking on main navbar items', function() {
    // ToDo: uncomment once Users page is complete
    //navbar.mainNavbar.click('users');
    //expect(browser.getLocationAbsUrl()).to.eventually.contain('/users');
    //expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('Users');

    navbar.mainNavbar.click('dashboard');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard');
    expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('Dashboard');
  });

  it('should also set the state of the first sub navbar item to active', function() {
    navbar.mainNavbar.click('dashboard');
    expect(navbar.subNavbar.items.get(0).getAttribute('class')).to.eventually.contain('active');
  });

  it('should contain a cluster select component for navigating to cluster specific pages', function() {
    expect(clusterSelect.el.isPresent()).to.eventually.be.true;
    clusterSelect.open().clusterList.select('barCluster');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/26');
    expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('barCluster');
  });

  it('should maintain the selected clusterID in the route when navigating to other cluster specific pages', function() {
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/26/reporting');
    navbar.subNavbar.click('cluster-nodes');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/26/nodes');
  });

  it('should keep the user on the same cluster specific page when changing the cluster', function() {
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/26/nodes');
    clusterSelect.open().clusterList.select('fooCluster');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/11/nodes');
  });
});

describe('The sub navbar', function() {
  it('should only be displayed if the active main navbar item has sub navbar items', function() {
    navbar.mainNavbar.click('dashboard');
    expect(navbar.subNavbar.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavbar.items.count()).to.eventually.equal(5);

    // ToDo: uncomment once Users page is complete
    //navbar.mainNavbar.click('users');
    //expect(navbar.subNavbar.el.isDisplayed()).to.eventually.be.false;
  });

  // ToDo: include test after pages are built and become enabled in the navbar
  xit('should change the URL route and set the active state when clicking on sub navbar items', function() {
    navbar.mainNavbar.click('dashboard');

    navbar.subNavbar.click('dashboard-health');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/health');
    expect(navbar.subNavbar.activeItem.getText()).to.eventually.equal('Health');

    navbar.subNavbar.click('dashboard-capacity');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/capacity');
    expect(navbar.subNavbar.activeItem.getText()).to.eventually.equal('Capacity');

    navbar.subNavbar.click('dashboard-performance');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/performance');
    expect(navbar.subNavbar.activeItem.getText()).to.eventually.equal('Performance');
  });
});

describe('The sub nav menu', function() {
  it('should only be displayed if the active sub navbar item has sub nav menu items', function() {
    navbar.mainNavbar.click('dashboard');
    navbar.subNavbar.click('dashboard-health');
    expect(navbar.subNavMenu.el.isDisplayed()).to.eventually.be.false;

    navbar.subNavbar.click('dashboard-alerts');
    expect(navbar.subNavMenu.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavMenu.items.count()).to.eventually.equal(2);
  });

  it('should change the URL route and set the active state when clicking on sub navbar items for alerts', function() {
    navbar.mainNavbar.click('dashboard');
    navbar.subNavbar.click('dashboard-alerts');

    navbar.subNavMenu.click('dashboard-alerts-history');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/alerts/history');
    navbar.subNavbar.click('dashboard-alerts');
    expect(navbar.subNavMenu.activeItem.getText()).to.eventually.equal('History');

    navbar.subNavMenu.click('dashboard-alerts-policies');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/alerts/policies');
    navbar.subNavbar.click('dashboard-alerts');
    expect(navbar.subNavMenu.activeItem.getText()).to.eventually.equal('Policies');

    navbar.subNavbar.click('dashboard-overview');
  });
});
