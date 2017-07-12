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
        {key:'archivedClusters', href: '#/admin/archivedClusters', label:'Archived Clusters', permissions: ['internalAdmin']},
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
      self.breadcrumb.cluster = {
        clusterId : _.get(self.clusterSelect, 'selectedCluster.id', ''),
        clusterName : _.get(self.clusterSelect, 'selectedCluster.name', ''),
        customerName : _.get(self.clusterSelect, 'selectedCluster.customerName', '')
      }

      const main = self.subNavbarItems[self.activeItems.main][0];
      self.breadcrumb.main = {
        label : main.label,
        href : main.href.replace(':clusterID', self.breadcrumb.cluster.clusterId)
      };
      self.breadcrumb.cluster.href = main.href.replace(':clusterID', self.breadcrumb.cluster.clusterId);

      const setSub = function(sub) {
        if (sub) {
          return {
            label : sub.label,
            href : sub.href.replace(':clusterID', self.breadcrumb.cluster.clusterId)
          };
        } else {
          return {
            label: self.activeItems.sub === 'Volume' ? self.activeItems.sub : 'Active Volumes',
            href : '#/cluster/' + self.breadcrumb.cluster.clusterId + '/volumes/activeVolumes'
          };
        }
      }

      const setMenu = function(sub) {
        if (sub) {
          const menu = _.find(sub.menuItems, obj => obj.key === self.activeItems.menu);
          if (menu) {
            return {
              label : menu.label,
              href : menu.href.replace(':clusterID', self.breadcrumb.cluster.clusterId)
            };
          } else {
            return { label : self.breadcrumb.sub.label === 'Capacity Licensing' ? 'Customer ID: ' + self.activeItems.menu : self.activeItems.menu };
          }
        } else {
          if (self.activeItems.menu) {
            return { label : self.activeItems.sub === 'volume' ? 'Volume ID: ' + self.activeItems.menu : self.activeItems.menu };
          }
          return { label : '' }
        }
      }

      const sub = _.find(self.subNavbarItems[self.activeItems.main], obj => obj.key === self.activeItems.sub);
      self.breadcrumb.sub = setSub(sub);
      self.breadcrumb.menu = setMenu(sub);
      self.showSubBreadcrumb = !((self.breadcrumb.main.href === self.breadcrumb.sub.href) || self.breadcrumb.menu.href);
    }

    self.showBreadcrumb = function() {
      return self.activeItems.menu && self.subNavbarItems[self.activeItems.main] && self.activeItems.sub && self.activeItems.main && !(self.activeItems.main === 'dashboard' && self.activeItems.sub === 'overview');
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
      if (self.showBreadcrumb()) {
        self.generateBreadcrumb();
      }
    });
    self.$onInit = self.updateActiveItems();

    $rootScope.$watch(function() {
      $rootScope.$$postDigest(function() {
        if (self.showBreadcrumb()) {
          self.generateBreadcrumb();
        }
      });
    });
  }
})();
