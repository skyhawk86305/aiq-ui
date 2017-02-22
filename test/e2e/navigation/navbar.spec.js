'use strict';

var support = require('../support.js');
var expect = require('../support.js').expect;
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();

describe('The main navbar', function() {
  beforeAll(function() {
    support.login();
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function(done) {
    browser.get('#').then(done);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display on initial page load', function() {
    expect(navbar.mainNavbar.el.isPresent()).to.eventually.be.true;
    expect(navbar.mainNavbar.items.count()).to.eventually.equal(6);
  });

  it('@any @smoke should contain a menu with options', function() {
    expect(navbar.menu.button.isPresent()).to.eventually.be.true;
    expect(navbar.menu.expand().options.count()).to.eventually.equal(4);
  });

  it('@any should change the URL route and set the active state when clicking on main navbar items', function() {
    // ToDo: uncomment once Users page is complete
    //navbar.mainNavbar.click('users');
    //expect(browser.getLocationAbsUrl()).to.eventually.contain('/users');
    //expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('Users');

    navbar.mainNavbar.click('dashboard');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard');
    expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('Dashboard');
  });

  it('@any @smoke should also set the state of the first sub navbar item to active', function() {
    navbar.mainNavbar.click('dashboard');
    expect(navbar.subNavbar.items.get(0).getAttribute('class')).to.eventually.contain('active');
  });
});

describe('should remember what cluster or pages have been selected previously', function() {
  beforeAll(function() {
    support.login();
  });

  afterAll(function() {
    support.logout();
  });

  it('should contain a cluster select component for navigating to cluster specific pages', function() {
    var dropDownMenu = clusterSelect.open(),
      list = dropDownMenu.allClustersList();
    expect(clusterSelect.el.isPresent()).to.eventually.be.true;
    list.customer('Bill').then(function(customer) {
      customer.selectCluster('barCluster');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/26');
      expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('barCluster');
    });
  });


  it('should maintain the selected clusterID in the route when navigating to other cluster specific pages', function() {
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/26/reporting');
    navbar.subNavbar.click('cluster-nodes');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/26/nodes');
  });

  it('should keep the user on the same cluster specific page when changing the cluster', function() {
    var dropDownMenu = clusterSelect.open(),
      list = dropDownMenu.allClustersList();
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/26/nodes');
    list.customer('Bob').then(function(customer) {
      customer.selectCluster('fooCluster');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/11/nodes');
      expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('fooCluster');
    });
  });
});

describe('The dropdown menu', function() {
  beforeAll(function() {
    support.login();
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function(done) {
    browser.get('#').then(done);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should go to the SF Support page when the Support item is selected from the dropdown menu', function() {
    navbar.menu.expand().select('Support');
      browser.getAllWindowHandles().then(function(handles) {
        browser.ignoreSynchronization = true; // disable temporarily since this page is not Angular
        browser.switchTo().window(handles[1]).then(function() {
          browser.driver.getCurrentUrl().then(function(url) {
            expect(url).to.contain('www.solidfire.com/platform/support/');
            browser.close();
          });
        });
        browser.ignoreSynchronization = false;
        browser.switchTo().window(handles[0]);
      });
  });

  // TODO - this one is not passing against dev, but should
  it('should go to the homepage of the old AIQ UI when the Legacy Active IQ item is selected from the dropdown menu', function() {
    navbar.menu.expand().select('Legacy Active IQ');
      browser.getAllWindowHandles().then(function(handles) {
        browser.ignoreSynchronization = true; // disable temporarily since this page is not Angular
        browser.driver.getCurrentUrl().then(function(url) {
          expect(url).to.not.contain('beta');
        });
        browser.ignoreSynchronization = false;
        browser.switchTo().window(handles[0]);
        browser.navigate().back();
      });
  });
});

describe('The sub navbar', function() {
  beforeAll(function() {
    support.login();
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function(done) {
    browser.get('#/dashboard').then(done);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should only be displayed if the active main navbar item has sub navbar items', function() {
    expect(navbar.subNavbar.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavbar.items.count()).to.eventually.equal(5);

    // ToDo: uncomment once Users page is complete
    //navbar.mainNavbar.click('users');
    //expect(navbar.subNavbar.el.isDisplayed()).to.eventually.be.false;
  });

  // ToDo: include test after pages are built and become enabled in the navbar
  xit('should change the URL route and set the active state when clicking on sub navbar items', function() {

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
  beforeAll(function() {
    support.login();
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function(done) {
    browser.get('#/dashboard').then(done);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should only be displayed if the active sub navbar item has sub nav menu items', function() {
     navbar.subNavbar.click('dashboard-health');
    expect(navbar.subNavMenu.el.isDisplayed()).to.eventually.be.false;

    navbar.subNavbar.click('dashboard-alerts');
    expect(navbar.subNavMenu.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavMenu.items.count()).to.eventually.equal(2);
  });

  it('@any @smoke should change the URL route and set the active state when clicking on sub navbar items for alerts', function() {
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
