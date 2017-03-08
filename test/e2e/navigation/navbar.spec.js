'use strict';

var support = require('../support.js');
var expect = require('../support.js').expect;
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();
var clusterId;

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

  });
});

describe('The sub nav menu', function() {
  beforeAll(function() {
    support.login();
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function (done) {
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

 xit('@any should keep the last active item on the sub navmenu active when reopening the subnav menu', function() {
    navbar.subNavbar.click('dashboard-alerts');
    navbar.subNavMenu.click('dashboard-alerts-history');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/alerts/history');
    navbar.subNavbar.click('dashboard-alerts');
    expect(navbar.subNavMenu.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavMenu.activeItem.getText()).to.eventually.equal('History');

    navbar.subNavbar.click('dashboard-alerts');
    navbar.subNavMenu.click('dashboard-alerts-policies');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/alerts/policies');
    navbar.subNavbar.click('dashboard-alerts');
    expect(navbar.subNavMenu.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavMenu.activeItem.getText()).to.eventually.equal('Policies');
  });

});

describe('The Dashboard Pages', function() {
  beforeAll(function() {
    support.login();
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/overview');
  });

  afterAll(function() {
    support.logout();
  });


  // Todo: These four pages aren't implemented yet
  xit('@any @smoke Should allow the user to navigate to the Overview page', function() {
    navbar.subNavbar.click('dashboard-overview');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/overview');
  });

  xit('@any @smoke Should allow the user to navigate to the Health page', function() {
    navbar.subNavbar.click('dashboard-health');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/health');
  });

  xit('@any @smoke Should allow the user to navigate to the Capacity page', function() {
    navbar.subNavbar.click('dashboard-capacity');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/capacity');
  });

  xit('@any @smoke Should allow the user to navigate to the Performance page', function() {
    navbar.subNavbar.click('dashboard-performance');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/performance');
  });

  it('@any @smoke Should allow the user to navigate to the alerts History Page', function() {
    navbar.subNavbar.click('dashboard-alerts');
    navbar.subNavMenu.click('dashboard-alerts-history');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/alerts/history');
  });

  it('@any @smoke Should allow the user to navigate to the alerts History Page', function() {
    navbar.subNavbar.click('dashboard-alerts');
    navbar.subNavMenu.click('dashboard-alerts-policies');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/alerts/policies');
  });
});

describe('Per-Cluster pages', function() {

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
      list.customer('Bill').then(function (customer) {
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
      list.customer('Bob').then(function (customer) {
        customer.selectCluster('fooCluster');
        expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/11/nodes');
        expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('fooCluster');
      });
    });
  });

  describe('Navigation to all top-level Per-Cluster Pages', function() {
    beforeAll(function(done) {
      support.login();
      var openedClusterSelect = clusterSelect.open();
      support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
        clusterId = firstClusterId;
        done();
      });
    });

    afterAll(function() {
      support.logout();
    });

    it('@any @smoke Should allow navigation to the Nodes page', function() {
      navbar.subNavbar.click('cluster-nodes');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/nodes');
    });

    it('@any @smoke Should allow navigation to the Drives page', function() {
      navbar.subNavbar.click('cluster-drives');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/drives');
    });

    it('@any @smoke Should allow navigation to the Volumes page', function() {
      navbar.subNavbar.click('cluster-volumes');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/volumes');
    });

    // ToDo: This page isn't implemented yet
    xit('Should allow navigation to the Replication page', function() {
      navbar.subNavbar.click('cluster-replication');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/replication');
    });
  });

  describe('Navigation to all Per-Cluster Reporting Pages', function() {

    beforeAll(function(done) {
      support.login();
      const openedClusterSelect = clusterSelect.open();
      support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
        clusterId = firstClusterId;
        done();
      });
    });

    beforeEach(function(done) {
      browser.actions().mouseMove(element(by.id('sf-sub-navbar-item-cluster-reporting'))).perform().then(() => {
        browser.wait(protractor.ExpectedConditions.presenceOf(navbar.subNavMenu.el));
        done();
      });
    });

    afterAll(function() {
      support.logout();
    });

    it('@any @smoke Should allow navigation to the Overview page', function() {
      navbar.subNavMenu.click('cluster-reporting-overview');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/reporting/overview');
    });

    it('@any @smoke Should allow navigation to the Capacity page', function() {
      navbar.subNavMenu.click('cluster-reporting-capacity');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/reporting/capacity');
    });

    it('@any @smoke Should allow navigation to the Efficiency page', function() {
      navbar.subNavMenu.click('cluster-reporting-efficiency');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/reporting/efficiency');
    });

    it('@any @smoke Should allow navigation to the Performance page', function() {
      navbar.subNavMenu.click('cluster-reporting-performance');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/reporting/performance');
    });

    it('@any @smoke Should allow navigation to the Error Log page', function() {
      navbar.subNavMenu.click('cluster-reporting-errorLog');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/reporting/errorLog');
    });

    it('@any @smoke Should allow navigation to the Events page', function() {
      navbar.subNavMenu.click('cluster-reporting-events');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/reporting/events');
    });

    it('@any @smoke Should allow navigation to the iSCSI Sessions page', function() {
      navbar.subNavMenu.click('cluster-reporting-iscsiSessions');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/reporting/iscsiSessions');
    });

    // ToDo: This pages aren't implemented yet
    xit('Should allow navigation to the Forecasting page', function() {
     navbar.subNavMenu.click('cluster-reporting-forecasting');
     expect(browser.getLocationAbsUrl()).to.eventually.contain('/reporting/forecasting');
    });

    it('@any @smoke Should allow navigation to the Virtual Networks page', function() {
      navbar.subNavMenu.click('cluster-reporting-virtualNetworks');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/reporting/virtualNetworks');
    });
  });

  describe('Navigation to all Per-Cluster VVols Pages', function() {

    beforeAll(function(done) {
      support.login();
      var openedClusterSelect = clusterSelect.open();
      support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
        clusterId = firstClusterId;
        done();
      });
    });

    beforeEach(function(done) {
      browser.actions().mouseMove(element(by.id('sf-sub-navbar-item-cluster-vvols'))).perform().then(() => {
        browser.wait(protractor.ExpectedConditions.presenceOf(navbar.subNavMenu.el));
        done();
      });
    });

    afterAll(function() {
      support.logout();
    });

    it('Should allow navigation to the Virtual Volumes page', function() {
      navbar.subNavMenu.click('cluster-vvols-virtualVolumes');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/vvols/virtual-volumes');
    });

    it('Should allow navigation to the VVols Storage Containers page', function() {
      navbar.subNavMenu.click('cluster-vvols-storageContainers');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/vvols/storage-containers');
    });

    it('Should allow navigation to the VVols Protocol Endpoints page', function() {
      navbar.subNavMenu.click('cluster-vvols-protocolEndpoints');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/vvols/protocol-endpoints');
    });

    it('Should allow navigation to the VVols Hosts page', function() {
      navbar.subNavMenu.click('cluster-vvols-hosts');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/vvols/hosts');
    });

    it('Should allow navigation to the VVols Bindings page', function() {
      navbar.subNavMenu.click('cluster-vvols-bindings');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/vvols/bindings');
    });
  });

});
