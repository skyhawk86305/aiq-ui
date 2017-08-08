import * as angular from 'angular';

export function AppRoutes($routeProvider, AuthServiceProvider) {
  /*
   * Customized route provider that adds a resolve to all routes (except for login).
   * The resolve checks if user is authenticated.
   */
  const routeProvider = angular.extend({}, $routeProvider, {
    when: function(path, route) {
      if (path !== '/login' && path !== '/aiq-login' && path !== '/sso-login' && path !== '/reset-password') {
        route.resolve = (route.resolve) ? route.resolve : {};
        angular.extend(route.resolve, {
          isAuthenticated() {
            return AuthServiceProvider.$get().isAuthenticated();
          }
        });
      }
      $routeProvider.when(path, route);
      return this;
    }
  });

  const defaultRedirect = {
    redirectTo: function () {
      return '/dashboard/overview';
    }
  };

    routeProvider
      .when('/login', {
        // template: '<login></login>'
        template: '<aiq-login></aiq-login>'
      })
      .when('/aiq-login', {
        template: '<aiq-login></aiq-login>'
      })
      .when('/sso-login', {
        template: '<login></login>'
      })
      .when('/reset-password', {
        template: '<reset-password></reset-password>'
      })
      .when('/admin/unregisteredClusters', {
        template: '<unregistered-clusters></unregistered-clusters>',
        reloadOnSearch: false,
        data: {
          permissions: { only: ['registerCluster'], redirectTo: '/dashboard/overview' },
        },
      })
      .when('/admin/archivedClusters',{
        template:'<archived-clusters></archived-clusters>',
        reloadOnSearch:false,
        data:{
          permissions:{ only: ['internalAdmin'], redirectTo:'/dashboard/overview' },
        },
      })
      .when('/admin/dashberg', {
        template: '<dashberg></dashberg>',
        reloadOnSearch: false,
        data: {
          permissions: { only: ['dashberg'], redirectTo: '/dashboard/overview' },
        },
      })
      .when('/dashboard/overview', {
        template: '<dashboard-overview></dashboard-overview>',
        reloadOnSearch: false,
      })
      .when('/dashboard/health', {
        template: require('./coming-soon.tpl.html')
      })
      .when('/dashboard/capacity', {
        template: require('./coming-soon.tpl.html')
      })
      .when('/dashboard/performance', {
        template: require('./coming-soon.tpl.html')
      })
      .when('/dashboard/alerts', {
        redirectTo: '/dashboard/alerts/history'
      })
      .when('/dashboard/alerts/history', {
        template: '<alert-history-table></alert-history-table>',
        reloadOnSearch: false
      })
      .when('/dashboard/alerts/policies', {
        template: '<alert-policy-table></alert-policy-table>',
        reloadOnSearch: false
      })
      .when('/dashboard/alerts/policies/add', {
        template: '<add-alert-policy></add-alert-policy>',
        reloadOnSearch: false
      })
      .when('/dashboard/alerts/suppressedClusters', {
        template: '<suppressed-clusters></suppressed-clusters>',
        reloadOnSearch: false
      })
      .when('/dashboard/capacityLicensing', {
        template: '<capacity-licensing></capacity-licensing>',
        reloadOnSearch: false
      })
      .when('/dashboard/capacityLicensing/:customerID', {
        template: '<capacity-licensing-details></capacity-licensing-details>',
        reloadOnSearch: false
      })
      .when('/dashboard/registerCluster', {
        template: '<register-cluster></register-cluster>',
        reloadOnSearch: false,
        data: {
          permissions: { only: ['internalAdmin'], redirectTo: '/dashboard/overview' },
        },
      })
      .when('/supportDashboard/overview',{
        template:'<support-overview></support-overview>',
        reloadOnSearch:false,
        data: {
          permissions: { only: ['support-dashboard.view'], redirectTo: '/dashboard/overview' },
        },
      })
      .when('/clusterByUUID/:clusterUUID/:requestedRoute*', {
        template: '<find-cluster class="sf-layout-block"></find-cluster>',
      })
      .when('/cluster/:clusterID/reporting/overview', {
        template: '<overview-dashboard></overview-dashboard>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID',  {
        redirectTo(params, path) {
          return `/cluster/${params.clusterID}/reporting/overview`;
        }
      })
      .when('/cluster/:clusterID/reporting/capacity', {
        template: '<capacity-graphs></capacity-graphs>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/efficiency', {
        template: '<efficiency-graphs></efficiency-graphs>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/performance', {
        template: '<performance-graphs></performance-graphs>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/errorLog', {
        template: '<error-log-table></error-log-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/events', {
        template: '<event-table></event-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/alerts', {
        template: '<cluster-alert-table></cluster-alert-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/iscsiSessions', {
        template: '<iscsi-sessions></iscsi-sessions>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/virtualNetworks', {
        template: '<virtual-network-table></virtual-network-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/forecasting', {
        template: require('./coming-soon.tpl.html')
      })
      .when('/cluster/:clusterID/reporting/apiCollection', {
        template: '<api-collection-table></api-collection-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/nodes', {
        template: '<node-table></node-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/drives', {
        template: '<drive-table></drive-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/volumes/snapshots', {
        template: '<snapshot-table></snapshot-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/volumes/activeVolumes', {
        template: '<volume-table></volume-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/volumes/snapshotSchedules', {
        template: '<snapshot-schedules-table></snapshot-schedules-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/volume/:volumeID', {
        template: '<volume-details></volume-details>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/replication/clusterPairs', {
        template: '<cluster-pairs></cluster-pairs>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/replication/volumePairs', {
        template: '<volume-pairs></volume-pairs>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/vvols/virtualVolumes', {
        template: '<virtual-volume-table></virtual-volume-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/vvols/protocolEndpoints', {
        template: '<protocol-endpoint-table></protocol-endpoint-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/vvols/hosts', {
        template: '<host-table></host-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/vvols/bindings', {
        template: '<binding-table></binding-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/vvols/storageContainers', {
        template: '<storage-container-table></storage-container-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/vmwareAlarms', {
        template: '<vmware-alarms></vmware-alarms>',
        reloadOnSearch: false,
        data: {
          permissions: { only: ['internalAdmin'], redirectTo: '/dashboard/overview' },
        },
      })
      .when('/users', {
        template: require('./coming-soon.tpl.html')
      })
      .when('/account', {
        template: '<account></account>',
      })
      /* Legacy UI URLs */
      .when('/Admin/Nodes', defaultRedirect)
      .when('/Admin/Nodes/Add', defaultRedirect)
      .when('/Alerts/Add', {
        redirectTo: '/dashboard/alerts/policies/add'
      })
      .when('/Alerts/History', {
        redirectTo: '/dashboard/alerts/history'
      })
      .when('/Alerts/Manage', {
        redirectTo: '/dashboard/alerts/policies'
      })
      .when('/Alerts/Suppress', {
        redirectTo: '/dashboard/alerts/suppressedClusters'
      })
      .when('/Cluster/Graphs/Capacity', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/reporting/capacity';
        }
      })
      .when('/Cluster/Graphs/Performance', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/reporting/performance';
        }
      })
      .when('/Cluster/Graphs/Efficiency', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/reporting/efficiency';
        }
      })
      .when('/Clusters/Archived', {
        redirectTo: '/admin/archivedClusters'
      })
      .when('/Clusters/Capacity/Forecast', defaultRedirect)
      .when('/Clusters/Details', defaultRedirect)
      .when('/Clusters/Stats', defaultRedirect)
      .when('/Clusters/Overview', defaultRedirect)
      .when('/Clusters/Graph/Sessions', {
        redirectTo(params, path, search) {
          return `/cluster/${search.clusterID}/reporting/iscsiSessions`;
        }
      })
      .when('/Clusters/VirtualNetworks', {
        redirectTo(params, path, search) {
          return `/cluster/${search.clusterID}/reporting/virtualNetworks`;
        }
      })
      .when('/Customers/Add', defaultRedirect)
      .when('/Customers/Edit', defaultRedirect)
      .when('/Customers/List', defaultRedirect)
      .when('/DelegateGroups/Add', defaultRedirect)
      .when('/DelegateGroups/List', defaultRedirect)
      .when('/DelegateGroups/Manage', defaultRedirect)
      .when('/Drives/Active/List', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/drives';
        }
      })
      .when('/Drives/Available/List', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/drives';
        }
      })
      .when('/Drives/Failed/List', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/drives';
        }
      })
      .when('/Errors/List', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/reporting/errorLog';
        }
      })
      .when('/Events/List', {
        redirectTo(params, path, search) {
          return `/cluster/${search.clusterID}/reporting/events`;
        }
      })
      .when('/Licensing/Capacity/Adjust', defaultRedirect)
      .when('/Licensing/Capacity/List', {
        redirectTo: '/dashboard/capacityLicensing',
      })
      .when('/Licensing/Capacity/View', {
        redirectTo(params, path, search) {
          return `/dashboard/capacityLicensing/${search.customerID}`;
        }
      })
      .when('/Nodes/Active', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/nodes';
        }
      })
      .when('/Replication/Clusters', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/replication/clusterPairs';
        }
      })
      .when('/Replication/Volumes', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/replication/volumePairs';
        }
      })
      .when('/Settings/Password', {
        redirectTo: function (params, path, search) {
          return '/account';
        }
      })
      .when('/Volumes/Active/List', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/volumes/activeVolumes';
        }
      })
      .when('/Volumes/Snapshots/Schedules/List', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/volumes/snapshotSchedules';
        }
      })
      .when('/Volumes/Snapshots/List', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/volumes/snapshots';
        }
      })
      .when('/Volumes/Stats', {
        redirectTo(params, path, search) {
          return `/cluster/${search.clusterID}/volume/${search.volumeID}`;
        }
      })
      .when('/Users/Add', defaultRedirect)
      .when('/Users/Edit', defaultRedirect)
      .when('/Users/List', defaultRedirect)
      .otherwise({
        redirectTo: '/dashboard/overview'
      });
  }
AppRoutes.$inject = ['$routeProvider', 'AuthServiceProvider'];
