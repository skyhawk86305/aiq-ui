'use strict';

var support = require('../support.js');
var expect = require('../support.js').expect;
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();
var clusterId;

describe('The main navbar', function() {
  beforeAll(function() {
    support.login();
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function(done) {
    browser.get('#').then(done);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display on initial page load', function() {
    expect(navbar.mainNavbar.el.isPresent()).to.eventually.be.true;
    expect(navbar.mainNavbar.items.count()).to.eventually.equal(7);
  });

  it('@any @smoke should contain a menu with options', function() {
    expect(navbar.menu.button.isPresent()).to.eventually.be.true;
    expect(navbar.menu.expand().options.count()).to.eventually.equal(5);
  });

  it('@any should change the URL route and set the active state when clicking on main navbar items', function() {
    // ToDo: uncomment once Users page is complete
    //navbar.mainNavbar.click('users');
    //expect(browser.getCurrentUrl()).to.eventually.contain('/users');
    //expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('Users');

    navbar.mainNavbar.click('dashboard');
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard');
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
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
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
            expect(url).to.contain('www.solidfire.com/support');
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

  it('@any @smoke should go to the Active IQ documentation site when the Documentation item is selected from the dropdown menu', function() {
    navbar.menu.expand().select('Documentation');
    browser.getAllWindowHandles().then(function(handles) {
      browser.ignoreSynchronization = true; // disable temporarily since this page is not Angular
      browser.driver.getCurrentUrl().then(function(url) {
        expect(url).to.not.contain('http://help.monitoring.solidfire.com/activeiq/');
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
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
  });

  beforeEach(function(done) {
    browser.get('#/dashboard').then(done);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should only be displayed if the active main navbar item has sub navbar items', function() {
    expect(navbar.subNavbar.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavbar.items.count()).to.eventually.equal(6);
  });
});

describe('The sub nav menu', function() {
  beforeAll(function() {
    support.login();
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
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
    expect(navbar.subNavMenu.items.count()).to.eventually.equal(3);
  });

 xit('@any should keep the last active item on the sub navmenu active when reopening the subnav menu', function() {
    navbar.subNavbar.click('dashboard-alerts');
    navbar.subNavMenu.click('dashboard-alerts-history');
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/alerts/history');
    navbar.subNavbar.click('dashboard-alerts');
    expect(navbar.subNavMenu.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavMenu.activeItem.getText()).to.eventually.equal('History');

    navbar.subNavbar.click('dashboard-alerts');
    navbar.subNavMenu.click('dashboard-alerts-policies');
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/alerts/policies');
    navbar.subNavbar.click('dashboard-alerts');
    expect(navbar.subNavMenu.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavMenu.activeItem.getText()).to.eventually.equal('Policies');
  });

});

describe('The Dashboard Pages', function() {
  beforeAll(function() {
    support.login();
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
  });

  afterAll(function() {
    support.logout();
  });

  const tcs = [
    // TODO: These pages aren't implemented yet
    // { name: 'Overview', menuItem: 'dashboard-overview', expectedURL: '/dashboard/overview' },
    // { name: 'Health', menuItem: 'dashboard-health', expectedURL: '/dashboard/health' },
    // { name: 'Capacity', menuItem: 'dashboard-capacity', expectedURL: '/dashboard/capacity' },
    // { name: 'Performance', menuItem: 'dashboard-performance', expectedURL: '/dashboard/performance' },
    { name: 'Alerts', menuItem: 'dashboard-alerts', expectedURL: '/dashboard/alerts/history' },
    { name: 'Capacity Licensing', menuItem: 'dashboard-capacityLicensing', expectedURL: '/dashboard/capacity-licensing' },
  ];
  tcs.forEach( tc => {
    it(`@any @smoke Should allow navigation to the ${tc.name} page`, function() {
      const menuItem = navbar.subNavbar.item(tc.menuItem);
      expect(menuItem.isDisplayed()).to.eventually.be.true;
      menuItem.click();
      expect(browser.getCurrentUrl()).to.eventually.contain(tc.expectedURL);
    });
  });

  describe('Navigation to all Alert Pages', function() {

    beforeEach(function(done) {
      browser.actions().mouseMove(element(by.id('sf-sub-navbar-item-dashboard-alerts'))).perform().then(() => {
        browser.wait(protractor.ExpectedConditions.presenceOf(navbar.subNavMenu.el));
        done();
      });
    });

    const tcs = [
      { name: 'Alerts History', menuItem: 'dashboard-alerts-history', expectedURL: '/dashboard/alerts/history' },
      { name: 'Alert Policies', menuItem: 'dashboard-alerts-policies', expectedURL: '/dashboard/alerts/policies' },
      { name: 'Suppressed Clusters', menuItem: 'dashboard-alerts-suppressedClusters', expectedURL: '/dashboard/alerts/suppressedClusters' },
    ];
    tcs.forEach( tc => {
      it(`@any @smoke Should allow navigation to the ${tc.name} page`, function() {
        const menuItem = navbar.subNavMenu.item(tc.menuItem);
        expect(menuItem.isDisplayed()).to.eventually.be.true;
        menuItem.click();
        expect(browser.getCurrentUrl()).to.eventually.contain(tc.expectedURL);
      });
    });
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
        expect(browser.getCurrentUrl()).to.eventually.contain('/cluster/26');
        expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('barCluster');
      });
    });

    it('should maintain the selected clusterID in the route when navigating to other cluster specific pages', function() {
      expect(browser.getCurrentUrl()).to.eventually.contain('/cluster/26/reporting');
      navbar.subNavbar.click('cluster-nodes');
      expect(browser.getCurrentUrl()).to.eventually.contain('/cluster/26/nodes');
    });

    it('should keep the user on the same cluster specific page when changing the cluster', function() {
      var dropDownMenu = clusterSelect.open(),
        list = dropDownMenu.allClustersList();
      expect(browser.getCurrentUrl()).to.eventually.contain('/cluster/26/nodes');
      list.customer('Bob').then(function (customer) {
        customer.selectCluster('fooCluster');
        expect(browser.getCurrentUrl()).to.eventually.contain('/cluster/11/nodes');
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

    const tcs = [
      { name: 'Reporting', menuItem: 'cluster-reporting', expectedURL: '/reporting/overview' },
      { name: 'Nodes', menuItem: 'cluster-nodes', expectedURL: '/nodes' },
      { name: 'Drives', menuItem: 'cluster-drives', expectedURL: '/drives' },
      { name: 'Volumes', menuItem: 'cluster-volumes', expectedURL: '/volumes' },
      { name: 'Replication', menuItem: 'cluster-replication', expectedURL: '/replication' },
      { name: 'VVols', menuItem: 'cluster-vvols', expectedURL: '/vvols/virtual-volumes' },
    ];
    tcs.forEach( tc => {
      it(`@any @smoke Should allow navigation to the ${tc.name} page`, function() {
        const menuItem = navbar.subNavbar.item(tc.menuItem);
        expect(menuItem.isDisplayed()).to.eventually.be.true;
        menuItem.click();
        expect(browser.getCurrentUrl()).to.eventually.contain(tc.expectedURL);
      });
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

    const tcs = [
      { name: 'Overview', menuItem: 'cluster-reporting-overview', expectedURL: '/reporting/overview' },
      { name: 'Capacity', menuItem: 'cluster-reporting-capacity', expectedURL: '/reporting/capacity' },
      { name: 'Efficiency', menuItem: 'cluster-reporting-efficiency', expectedURL: '/reporting/efficiency' },
      { name: 'Performance', menuItem: 'cluster-reporting-performance', expectedURL: '/reporting/performance' },
      { name: 'Error Log', menuItem: 'cluster-reporting-errorLog', expectedURL: '/reporting/errorLog' },
      { name: 'Events', menuItem: 'cluster-reporting-events', expectedURL: '/reporting/events' },
      { name: 'Alerts', menuItem: 'cluster-reporting-alerts', expectedURL: '/reporting/alerts' },
      { name: 'iSCSI Sessions', menuItem: 'cluster-reporting-iscsiSessions', expectedURL: '/reporting/iscsiSessions' },
      { name: 'Virtual Networks', menuItem: 'cluster-reporting-virtualNetworks', expectedURL: '/reporting/virtualNetworks' },
      { name: 'API Collection', menuItem: 'cluster-reporting-apiCollection', expectedURL: '/reporting/apiCollection' },
    ];
    tcs.forEach( tc => {
      it(`@any @smoke Should allow navigation to the ${tc.name} page`, function() {
        const menuItem = navbar.subNavMenu.item(tc.menuItem);
        expect(menuItem.isDisplayed()).to.eventually.be.true;
        menuItem.click();
        expect(browser.getCurrentUrl()).to.eventually.contain(tc.expectedURL);
      });
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

    const tcs = [
      { name: 'Virtual Volumes', menuItem: 'cluster-vvols-virtualVolumes', expectedURL: '/vvols/virtual-volumes' },
      { name: 'VVol Storage Containers', menuItem: 'cluster-vvols-storageContainers', expectedURL: '/vvols/storage-containers' },
      { name: 'VVol Protocol Endpoints', menuItem: 'cluster-vvols-protocolEndpoints', expectedURL: '/vvols/protocol-endpoints' },
      { name: 'VVol Hosts', menuItem: 'cluster-vvols-hosts', expectedURL: '/vvols/hosts' },
      { name: 'VVol Bindings', menuItem: 'cluster-vvols-bindings', expectedURL: '/vvols/bindings' },
    ];
    tcs.forEach( tc => {
      it(`Should allow navigation to the ${tc.name} page`, function() {
        const menuItem = navbar.subNavMenu.item(tc.menuItem);
        expect(menuItem.isDisplayed()).to.eventually.be.true;
        menuItem.click();
        expect(browser.getCurrentUrl()).to.eventually.contain(tc.expectedURL);
      });
    });

  });

  describe('Navigation to all Per-Cluster Volumes Pages', function() {

    beforeAll(function(done) {
      support.login();
      var openedClusterSelect = clusterSelect.open();
      support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
        clusterId = firstClusterId;
        done();
      });
    });

    beforeEach(function(done) {
      browser.actions().mouseMove(element(by.id('sf-sub-navbar-item-cluster-volumes'))).perform().then(() => {
        browser.wait(protractor.ExpectedConditions.presenceOf(navbar.subNavMenu.el));
        done();
      });
    });

    afterAll(function() {
      support.logout();
    });

    const tcs = [
      { name: 'Active Volumes', menuItem: 'cluster-volumes-activeVolumes', expectedURL: '/volumes/active-volumes' },
      { name: 'Snapshots', menuItem: 'cluster-volumes-snapshots', expectedURL: '/volumes/snapshots' },
      { name: 'Snapshot Schedules', menuItem: 'cluster-volumes-snapshotSchedules', expectedURL: '/volumes/snapshot-schedules' },
    ];
    tcs.forEach( tc => {
      it(`Should allow navigation to the ${tc.name} page`, function() {
        const menuItem = navbar.subNavMenu.item(tc.menuItem);
        expect(menuItem.isDisplayed()).to.eventually.be.true;
        menuItem.click();
        expect(browser.getCurrentUrl()).to.eventually.contain(tc.expectedURL);
      });
    });

  });

});
