'use strict';

var support = require('../support.js');
var expect = require('../support.js').expect;
var navbar = new support.navbarComponent();
var clusterSelect = new support.clusterSelectComponent();
var clusterId;

describe('The Navigation Bar', function() {

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

  describe('The breadcrumb', function() {

    describe('Dashboard', function() {
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

      it('@any @smoke should not be displayed on the overview page', function() {
        expect(navbar.breadcrumb.el.isPresent()).to.eventually.be.false;
      });

      // page not yet implemented
      xit('@any @smoke should be displayed on the health page', function() {
      });

      // page not yet implemented
      xit('@any @smoke should be displayed on the capacity page', function() {
      });

      // page not yet implemented
      xit('@any @smoke should be displayed on the performance page', function() {
      });

      it('@any @smoke should be displayed on the alerts page', function() {
        support.checkBreadcrumb(navbar.subNavbar, 'dashboard-alerts', navbar.breadcrumb, null, 'Dashboard', null, 'History');
      });

      describe('the alerts sub-pages:', function() {
        beforeEach(function(done) {
          browser.actions().mouseMove(element(by.id('sf-sub-navbar-item-dashboard-alerts'))).perform().then(() => {
            browser.wait(protractor.ExpectedConditions.presenceOf(navbar.subNavMenu.el));
            done();
          });
        });

        it('@any @smoke the alerts history page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'dashboard-alerts-history', navbar.breadcrumb, null, 'Dashboard', null, 'History');
        });

        it('@any @smoke the alerts policies page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'dashboard-alerts-policies', navbar.breadcrumb, null, 'Dashboard', null, 'Policies');
        });

        it('@any @smoke the alerts suppresed clusters page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'dashboard-alerts-suppressedClusters', navbar.breadcrumb, null, 'Dashboard', null, 'Suppressed Clusters');
        });
      });

      it('@any @smoke should not be displayed on the capacity licensing page', function() {
        navbar.subNavbar.item('dashboard-capacityLicensing').click();
        expect(navbar.breadcrumb.el.isPresent()).to.eventually.be.false;
      });

      it('@any @smoke should not be displayed on the register new cluster page', function() {
        navbar.subNavbar.item('dashboard-registerCluster').click();
        expect(navbar.breadcrumb.el.isPresent()).to.eventually.be.false;
      });

    });

    describe('Cluster', function() {

      let clusterName = 'clusterCustomerName';

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

      it('@any @smoke should be displayed on the reporting page', function() {
        support.checkBreadcrumb(navbar.subNavbar, 'cluster-reporting', navbar.breadcrumb, clusterName, null, null, 'Overview');
      });

      describe('the reporting sub-pages:', function() {
        beforeEach(function(done) {
          browser.actions().mouseMove(element(by.id('sf-sub-navbar-item-cluster-reporting'))).perform().then(() => {
            browser.wait(protractor.ExpectedConditions.presenceOf(navbar.subNavMenu.el));
            done();
          });
        });

        it('@any @smoke the reporting history page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-reporting-overview', navbar.breadcrumb, clusterName, null, null, 'Overview');
        });

        it('@any @smoke the reporting capacity page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-reporting-capacity', navbar.breadcrumb, clusterName, null, null, 'Capacity');
        });

        it('@any @smoke the reporting efficiency page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-reporting-efficiency', navbar.breadcrumb, clusterName, null, null, 'Efficiency');
        });

        it('@any @smoke the reporting performance page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-reporting-performance', navbar.breadcrumb, clusterName, null, null, 'Performance');
        });

        it('@any @smoke the reporting error log page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-reporting-errorLog', navbar.breadcrumb, clusterName, null, null, 'Error Log');
        });

        it('@any @smoke the reporting events page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-reporting-events', navbar.breadcrumb, clusterName, null, null, 'Events');
        });

        it('@any @smoke the reporting alerts page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-reporting-alerts', navbar.breadcrumb, clusterName, null, null, 'Alerts');
        });
      
        it('@any @smoke the reporting iscsi sessions page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-reporting-iscsiSessions', navbar.breadcrumb, clusterName, null, null, 'ISCSI Sessions');
        });

        it('@any @smoke the reporting virutal networks page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-reporting-virtualNetworks', navbar.breadcrumb, clusterName, null, null, 'Virtual Networks');
        });

        it('@any @smoke the reporting api collection page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-reporting-apiCollection', navbar.breadcrumb, clusterName, null, null, 'API Collection');
        });

      });

      it('@any @smoke should not be displayed on the nodes page', function() {
        navbar.subNavbar.item('cluster-nodes').click();
        expect(navbar.breadcrumb.el.isPresent()).to.eventually.be.false;
      });

      it('@any @smoke should not be displayed on the drives page', function() {
        navbar.subNavbar.item('cluster-drives').click();
        expect(navbar.breadcrumb.el.isPresent()).to.eventually.be.false;
      });

      it('@any @smoke should be displayed on the volumes page', function() {
        support.checkBreadcrumb(navbar.subNavbar, 'cluster-volumes', navbar.breadcrumb, clusterName, null, null, 'Active Volumes');
      });

      describe('the volumes sub-pages:', function() {
        beforeEach(function(done) {
          browser.actions().mouseMove(element(by.id('sf-sub-navbar-item-cluster-volumes'))).perform().then(() => {
            browser.wait(protractor.ExpectedConditions.presenceOf(navbar.subNavMenu.el));
            done();
          });
        });

        it('@any @smoke the reporting active volumes page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-volumes-activeVolumes', navbar.breadcrumb, clusterName, null, null, 'Active Volumes');
        });

        it('@any @smoke the reporting capacity page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-volumes-snapshots', navbar.breadcrumb, clusterName, null, null, 'Snapshots');
        });

        it('@any @smoke the reporting efficiency page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-volumes-snapshotSchedules', navbar.breadcrumb, clusterName, null, null, 'Snapshot Schedules');
        });

      });

      it('@any @smoke should be displayed on the replication page', function() {
        support.checkBreadcrumb(navbar.subNavbar, 'cluster-replication', navbar.breadcrumb, clusterName, null, null, 'Cluster Pairs');
      });

      describe('the replication sub-pages:', function() {
        beforeEach(function(done) {
          browser.actions().mouseMove(element(by.id('sf-sub-navbar-item-cluster-replication'))).perform().then(() => {
            browser.wait(protractor.ExpectedConditions.presenceOf(navbar.subNavMenu.el));
            done();
          });
        });

        it('@any @smoke the replication cluster pairs page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-replication-clusterPairs', navbar.breadcrumb, clusterName, null, null, 'Cluster Pairs');
        });

        it('@any @smoke the replication volume pairs page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-replication-volumePairs', navbar.breadcrumb, clusterName, null, null, 'Volume Pairs');
        });

      });

      it('@any @smoke should be displayed on the vvols page', function() {
        support.checkBreadcrumb(navbar.subNavbar, 'cluster-vvols', navbar.breadcrumb, clusterName, null, null, 'Virtual Volumes');
      });

      describe('the vvols sub-pages:', function() {
        beforeEach(function(done) {
          browser.actions().mouseMove(element(by.id('sf-sub-navbar-item-cluster-vvols'))).perform().then(() => {
            browser.wait(protractor.ExpectedConditions.presenceOf(navbar.subNavMenu.el));
            done();
          });
        });

        it('@any @smoke the virtual volumes page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-vvols-virtualVolumes', navbar.breadcrumb, clusterName, null, null, 'Virtual Volumes');
        });

        it('@any @smoke the storage containers page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-vvols-storageContainers', navbar.breadcrumb, clusterName, null, null, 'Storage Containers');
        });

        it('@any @smoke the protocal endpoints page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-vvols-protocolEndpoints', navbar.breadcrumb, clusterName, null, null, 'Protocol Endpoints');
        });

        it('@any @smoke the hosts page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-vvols-hosts', navbar.breadcrumb, clusterName, null, null, 'Hosts');
        });

        it('@any @smoke the bindings page', function() {
          support.checkBreadcrumb(navbar.subNavMenu, 'cluster-vvols-bindings', navbar.breadcrumb, clusterName, null, null, 'Bindings');
        });

      });

      it('@any @smoke should not be displayed on the vmware alarms page', function() {
        navbar.subNavbar.item('cluster-vmwareAlarms').click();
        expect(navbar.breadcrumb.el.isPresent()).to.eventually.be.false;
      });

      it('should display the correct cluster switching between different cluster pages by pasting a url in the address bar', function() {
        browser.get('http://localhost:3000/#/cluster/1849553/reporting/overview');
        expect(navbar.breadcrumb.cluster.isDisplayed()).to.eventually.be.true;
        expect(navbar.breadcrumb.clusterLink.getText()).to.eventually.equal('ABC-Cloud R&D_Americas.com / AB-DC1-Cluster01');
        expect(navbar.breadcrumb.clusterLink.getAttribute('href')).to.eventually.equal('http://localhost:3000/#/cluster/1849553/reporting/overview');
        browser.get('http://localhost:3000/#/cluster/1899306/reporting/overview');
        expect(navbar.breadcrumb.cluster.isDisplayed()).to.eventually.be.true;
        expect(navbar.breadcrumb.clusterLink.getText()).to.eventually.equal('ATSC (ABCD Technical Solutions Corporation) / ABCDEFGHIJKLMNOP95-00010');
        expect(navbar.breadcrumb.clusterLink.getAttribute('href')).to.eventually.equal('http://localhost:3000/#/cluster/1899306/reporting/overview');
      });

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
      // { name: 'Health', menuItem: 'dashboard-health', expectedURL: '/dashboard/health' },
      // { name: 'Capacity', menuItem: 'dashboard-capacity', expectedURL: '/dashboard/capacity' },
      // { name: 'Performance', menuItem: 'dashboard-performance', expectedURL: '/dashboard/performance' },
      { name: 'Alerts', menuItem: 'dashboard-alerts', expectedURL: '/dashboard/alerts/history' },
      { name: 'Capacity Licensing', menuItem: 'dashboard-capacityLicensing', expectedURL: '/dashboard/capacityLicensing' },
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
        { name: 'VVols', menuItem: 'cluster-vvols', expectedURL: '/vvols/virtualVolumes' },
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
        { name: 'Virtual Volumes', menuItem: 'cluster-vvols-virtualVolumes', expectedURL: '/vvols/virtualVolumes' },
        { name: 'VVol Storage Containers', menuItem: 'cluster-vvols-storageContainers', expectedURL: '/vvols/storageContainers' },
        { name: 'VVol Protocol Endpoints', menuItem: 'cluster-vvols-protocolEndpoints', expectedURL: '/vvols/protocolEndpoints' },
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
        { name: 'Active Volumes', menuItem: 'cluster-volumes-activeVolumes', expectedURL: '/volumes/activeVolumes' },
        { name: 'Snapshots', menuItem: 'cluster-volumes-snapshots', expectedURL: '/volumes/snapshots' },
        { name: 'Snapshot Schedules', menuItem: 'cluster-volumes-snapshotSchedules', expectedURL: '/volumes/snapshotSchedules' },
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

});
