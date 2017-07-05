(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .component('navbar', {
      template: require('./navbar.tpl.html'),
      bindings: {
        onApiLogOpen: '&'
      },
      controller: [
        '$rootScope',
        '$location',
        '$timeout',
        '$window',
        'ClusterSelectService',
        'AuthService',
        'UserInfoService',
        NavbarController
      ]
    });

  function NavbarController($rootScope, $location, $timeout, $window, ClusterSelectService, AuthService, UserInfoService) {
    let self = this;
    self.clusterSelect = ClusterSelectService;
    UserInfoService.getUserInfo().then( () => {
      self.userInfo = UserInfoService;
    });
    self.activeItems = {main: '', sub: '', menu: ''};
    self.host = $location.host();
    self.breadcrumb = {};

    // Used to dynamically build the sub navbar and sub nav menu
    self.subNavbarItems = {
      dashboard: [
        {key:'overview', href:'#/dashboard/overview', label: 'Dashboard', hidden: true},
        {key:'health', href:'#/dashboard/health', label: 'Health', disabled: true},
        {key:'capacity', href:'#/dashboard/capacity', label: 'Capacity', disabled: true},
        {key:'performance', href:'#/dashboard/performance', label: 'Performance', disabled: true},
        {
          key:'alerts',
          href:'#/dashboard/alerts/history',
          label: 'Alerts',
          menuItems: [
            {key:'history', href: '#/dashboard/alerts/history', label: 'History'},
            {key:'policies', href: '#/dashboard/alerts/policies', label: 'Policies'},
            {key:'suppressedClusters', href: '#/dashboard/alerts/suppressedClusters', label: 'Suppressed Clusters'},
          ]
        },
        {key:'capacityLicensing', href:'#/dashboard/capacityLicensing', label: 'Capacity Licensing'},
        {key:'registerCluster', href:'#/dashboard/registerCluster', label: 'Register New Cluster', permissions: ['internalAdmin']},
      ],
      cluster: [
        {
          key:'reporting',
          href:'#/cluster/:clusterID/reporting/overview',
          label: 'Reporting',
          menuItems: [
            {key:'overview', href: '#/cluster/:clusterID/reporting/overview', label: 'Overview'},
            {key:'capacity', href: '#/cluster/:clusterID/reporting/capacity', label: 'Capacity'},
            {key:'efficiency', href: '#/cluster/:clusterID/reporting/efficiency', label: 'Efficiency'},
            {key:'performance', href: '#/cluster/:clusterID/reporting/performance', label: 'Performance'},
            {key:'errorLog', href: '#/cluster/:clusterID/reporting/errorLog', label: 'Error Log'},
            {key:'events', href: '#/cluster/:clusterID/reporting/events', label: 'Events'},
            {key:'alerts', href: '#/cluster/:clusterID/reporting/alerts', label: 'Alerts'},
            {key:'iscsiSessions', href: '#/cluster/:clusterID/reporting/iscsiSessions', label: 'ISCSI Sessions'},
            {key:'virtualNetworks', href: '#/cluster/:clusterID/reporting/virtualNetworks', label: 'Virtual Networks'},
            {key:'apiCollection', href: '#/cluster/:clusterID/reporting/apiCollection', label: 'API Collection'}
          ]
        },
        {key:'nodes', href:'#/cluster/:clusterID/nodes', label: 'Nodes'},
        {key:'drives', href:'#/cluster/:clusterID/drives', label: 'Drives'},
        {
          key:'volumes',
          href:'#/cluster/:clusterID/volumes/activeVolumes',
          label: 'Volumes',
          menuItems: [
            {key:'activeVolumes', href: '#/cluster/:clusterID/volumes/activeVolumes', label: 'Active Volumes'},
            {key:'snapshots', href: '#/cluster/:clusterID/volumes/snapshots', label: 'Snapshots'},
            {key:'snapshotSchedules', href: '#/cluster/:clusterID/volumes/snapshotSchedules', label: 'Snapshot Schedules'}
          ]
        },
        {
          key:'replication',
          href:'#/cluster/:clusterID/replication/clusterPairs',
          label: 'Replication',
          menuItems: [
            {key:'clusterPairs', href: '#/cluster/:clusterID/replication/clusterPairs', label: 'Cluster Pairs'},
            {key:'volumePairs', href: '#/cluster/:clusterID/replication/volumePairs', label: 'Volume Pairs'},
          ],
        },
        {
          key:'vvols',
          href:'#/cluster/:clusterID/vvols/virtualVolumes',
          label: 'VVols',
          menuItems: [
            {key:'virtualVolumes', href: '#/cluster/:clusterID/vvols/virtualVolumes', label: 'Virtual Volumes'},
            {key:'storageContainers', href: '#/cluster/:clusterID/vvols/storageContainers', label: 'Storage Containers'},
            {key:'protocolEndpoints', href: '#/cluster/:clusterID/vvols/protocolEndpoints', label: 'Protocol Endpoints'},
            {key:'hosts', href: '#/cluster/:clusterID/vvols/hosts', label: 'Hosts'},
            {key:'bindings', href: '#/cluster/:clusterID/vvols/bindings', label: 'Bindings'},
          ]
        },
        {
          key:'vmwareAlarms',
          href:'#/cluster/:clusterID/vmwareAlarms',
          label: 'VMware Alarms',
          permissions: ['internalAdmin'],
        }
      ],
      admin: [
        {key:'unregisteredClusters', href: '#/admin/unregisteredClusters', label: 'Unregistered Clusters', permissions: ['registerCluster']},
        {key:'dashberg', href: '#/admin/dashberg', label: 'Dashberg', permissions: ['dashberg']}
      ]
    };

    // Build the href using the selectedCluster's clusterID for the navbar anchors to bind to
    self.getHref = function(subNavbarItem) {
      let clusterID = self.clusterSelect.selectedCluster ? self.clusterSelect.selectedCluster.id : '';
      return subNavbarItem.href.replace(':clusterID', clusterID);
    };

    // UX feature to delay the hiding of the sub nav menu if the user temporarily hovers outside of it
    self.delayMouseLeave = function() {
      $timeout(function() {
        if (!self.currentlyInMenu) {
          if (self.hoveredSubNavMenu) {
            self.sendEvent('hideSubNav');
          }
          self.hoveredSubNavMenu = false;
        }
      }, 500);
    };

    self.displaySubNavMenu = function() {
      return self.subNavbarItem && self.subNavbarItem.menuItems && (self.hoveredSubNavMenu || self.clickedSubNavMenu);
    };

    self.generateBreadcrumb = function() {
      const clusterID = _.get(self.clusterSelect, 'selectedCluster.id', '');
      const clusterName = _.get(self.clusterSelect, 'selectedCluster.name', '');
      const customerName = _.get(self.clusterSelect, 'selectedCluster.customerName', '');

      const subIndex = _.findIndex(self.subNavbarItems[self.activeItems.main], obj => obj.key === self.activeItems.sub);
      const menuIndex = subIndex >= 0 ? _.findIndex(self.subNavbarItems[self.activeItems.main][subIndex].menuItems, obj => obj.key === self.activeItems.menu) : -1;

      const main = self.subNavbarItems[self.activeItems.main];

      const mainLabel = self.activeItems.main === 'cluster' ? customerName + ' / ' + clusterName : main[0].label;
      const mainHref = main[0].href.replace(':clusterID', clusterID);

      let subLabel = main[subIndex] ? main[subIndex].label : self.activeItems.sub;
      subLabel = subLabel === 'Volume' ? subLabel : 'Active Volumes';

      let subHref = '#/cluster/' + clusterID + '/volumes/activeVolumes';
      if (subIndex >= 0) {
        subHref = self.activeItems.main === 'cluster' ? main[subIndex].href.replace(':clusterID', clusterID) : main[subIndex].href;
      }

      const menuLabel = subIndex >= 0 && menuIndex >= 0 ? main[subIndex].menuItems[menuIndex].label : 'Volume ID: ' + self.activeItems.menu;
      let menuHref = '';
      if (subIndex >= 0 && menuIndex >= 0) {
        menuHref = self.activeItems.main === 'cluster' ? main[subIndex].menuItems[menuIndex].href.replace(':clusterID', clusterID) : main[subIndex].menuItems[menuIndex].href;
      }

      self.breadcrumb = {
        main : {
          label : mainLabel,
          href : mainHref
        },
        sub : {
          label : subLabel,
          href : subHref
        },
        menu : {
          label : menuLabel,
          href: menuHref
        }
      }

      self.showSubBreadcrumb = !((mainHref === subHref) || menuHref);
    }

    self.showBreadcrumb = function() {
      return self.activeItems.menu && self.activeItems.sub && !(self.activeItems.main === 'dashboard' && self.activeItems.sub === 'overview');
    }

    self.updateActiveItems = function() {
      let path = $location.path().slice(1).replace(/cluster\/([0-9]*)/, 'cluster').split('/');
      self.activeItems.main = path[0];
      self.activeItems.sub = path.length > 1 ? path[1] : '';
      self.activeItems.menu = path.length > 2 ? path[2] : '';
      // Clear the cached selectedCluster when the user navigates to a non cluster-specific route
      if (self.activeItems.main !== 'cluster') { self.clusterSelect.updateSelectedCluster(null); }

      self.sendEvent('pageView');
    };

    self.showSubNav = function() {
      if (self.subNavbarItem && self.subNavbarItem.menuItems && !self.hoveredSubNavMenu) {
        self.sendEvent('showSubNav');
      }
      self.hoveredSubNavMenu = true;
      self.currentlyInMenu = true;
    };

    self.sendEvent = function(eventName) {
      let validEvents = ['hideSubNav', 'showSubNav', 'pageView'];
      if (!validEvents.some(name => eventName === name)) return;

      if (eventName === 'pageView') {
        self.sendGoogleAnalyticsPageView();
      }

      if (!$window.divolte) return;
      let userInfo = {}, currentUser = self.userInfo && self.userInfo.currentUser;

      if (currentUser) {
          userInfo = {
              'userId': currentUser.userID,
              'userName': currentUser.username,
              'customerId': currentUser.customerID,
              'customerName': currentUser.customerName
          };
      }
      $window.divolte.signal(eventName, userInfo); // 2nd param can be an object with arbitrary data
    };

    self.sendGoogleAnalyticsPageView = function() {
      let pageView = {
        page: $location.path(),
        title: $window.document.title
      };

      if (!$window.ga) { return; }

      $window.ga('send', 'pageView', pageView);
    };

    self.logout = function() {
      AuthService.logout().then(function() {
        $location.path('/login');
      });
    };

    $rootScope.$on('$routeChangeSuccess', function() {
      self.updateActiveItems();
      $timeout(() => {
        if (self.showBreadcrumb()) {
          self.generateBreadcrumb();
        }
      });
    });
    self.$onInit = function() {
      self.updateActiveItems();
      $timeout(() => {
        if (self.showBreadcrumb()) {
          self.generateBreadcrumb();
        }
      });
    };
  }
})();
