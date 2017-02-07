(function () {
  'use strict';

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

    // Used to dynamically build the sub navbar and sub nav menu
    self.subNavbarItems = {
      dashboard: [
        {key:'overview', href:'#/dashboard/overview', label: 'Overview', disabled: true},
        {key:'health', href:'#/dashboard/health', label: 'Health', disabled: true},
        {key:'capacity', href:'#/dashboard/capacity', label: 'Capacity', disabled: true},
        {key:'performance', href:'#/dashboard/performance', label: 'Performance', disabled: true},
        {
          key:'alerts',
          href:'#/dashboard/alerts/history',
          label: 'Alerts',
          menuItems: [
            {key:'history', href: '#/dashboard/alerts/history', label: 'History'},
            {key:'policies', href: '#/dashboard/alerts/policies', label: 'Policies'}
          ]
        }
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
            {key:'iscsiSessions', href: '#/cluster/:clusterID/reporting/iscsiSessions', label: 'ISCSI Sessions', disabled: true},
            {key:'virtualNetworks', href: '#/cluster/:clusterID/reporting/virtualNetworks', label: 'Virtual Networks', disabled: true},
            {key:'forecasting', href: '#/cluster/:clusterID/reporting/forecasting', label: 'Forecasting', disabled: true}
          ]
        },
        {key:'nodes', href:'#/cluster/:clusterID/nodes', label: 'Nodes'},
        {key:'drives', href:'#/cluster/:clusterID/drives', label: 'Drives'},
        {key:'volumes', href:'#/cluster/:clusterID/volumes', label: 'Volumes'},
        {key:'replication', href:'#/cluster/:clusterID/replication', label: 'Replication', disabled: true},
        {
          key:'vvols',
          href:'#/cluster/:clusterID/vvols/protocol-endpoints',
          label: 'VVols',
          menuItems: [
            {key:'virtualVolumes', href: '#/cluster/:clusterID/vvols/virtual-volumes', label: 'Virtual Volumes'},
            {key:'storageContainers', href: '#/cluster/:clusterID/vvols/storage-containers', label: 'Storage Containers'},
            {key:'protocolEndpoints', href: '#/cluster/:clusterID/vvols/protocol-endpoints', label: 'Protocol Endpoints'},
            {key:'hosts', href: '#/cluster/:clusterID/vvols/hosts', label: 'Hosts'},
            {key:'bindings', href: '#/cluster/:clusterID/vvols/bindings', label: 'Bindings'},
          ]
        }
      ]
    };

    // Build the href using the selectedCluster's clusterID for the navbar anchors to bind to
    self.getHref = function(subNavbarItem) {
      let clusterID = self.clusterSelect.selectedCluster ? self.clusterSelect.selectedCluster.clusterID : '';
      return subNavbarItem.href.replace(':clusterID', clusterID);
    };

    // UX feature to delay the hiding of the sub nav menu if the user temporarily hovers outside of it
    self.delayMouseLeave = function() {
      $timeout(function() {
        if (!self.currentlyInMenu) { self.hoveredSubNavMenu = false; }
      }, 500);
    };

    self.displaySubNavMenu = function() {
      return self.subNavbarItem && self.subNavbarItem.menuItems && (self.hoveredSubNavMenu || self.clickedSubNavMenu);
    };

    self.updateActiveItems = function() {
      let path = $location.path().slice(1).replace(/cluster\/([0-9]*)/, 'cluster').split('/');
      self.activeItems.main = path[0];
      self.activeItems.sub = path.length > 1 ? path[1] : '';
      self.activeItems.menu = path.length > 2 ? path[2] : '';
      // Clear the cached selectedCluster when the user navigates to a non cluster-specific route
      if (self.activeItems.main !== 'cluster') { self.clusterSelect.updateSelectedCluster(null); }

      self.sendGoogleAnalyticsPageView();
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

    $rootScope.$on('$routeChangeSuccess', self.updateActiveItems);
    self.$onInit = self.updateActiveItems;
  }
})();
