import * as angular from 'angular';

export function AppRoutes($routeProvider, AuthServiceProvider) {
  /*
   * Customized route provider that adds a resolve to all routes (except for login).
   * The resolve checks if user is authenticated.
   */
  let routeProvider = angular.extend({}, $routeProvider, {
    when: function(path, route) {
      if (path !== '/login' && path !== '/reset-password') {
        route.resolve = (route.resolve) ? route.resolve : {};
        angular.extend(route.resolve, {
          isAuthenticated: function() {
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
        template: '<login></login>'
      })
      .when('/reset-password', {
        template: '<reset-password></reset-password>'
      })
      .when('/dashboard/overview', {
        template: require('./welcome-beta.tpl.html')
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
        template: '<alert-history-table class="sf-layout-block"></alert-history-table>',
        reloadOnSearch: false
      })
      .when('/dashboard/alerts/policies', {
        template: '<alert-policy-table class="sf-layout-block"></alert-policy-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/overview', {
        template: '<overview-dashboard class="sf-layout-block"></overview-dashboard>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/capacity', {
        template: '<capacity-graphs class="sf-layout-block"></capacity-graphs>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/efficiency', {
        template: '<efficiency-graphs class="sf-layout-block"></efficiency-graphs>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/performance', {
        template: '<performance-graphs class="sf-layout-block"></performance-graphs>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/errorLog', {
        template: '<error-log-table class="sf-layout-block"></error-log-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/events', {
        template: '<event-table class="sf-layout-block"></event-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/alerts', {
        template: '<cluster-alert-table class="sf-layout-block"></cluster-alert-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/iscsiSessions', {
        template: require('./coming-soon.tpl.html')
      })
      .when('/cluster/:clusterID/reporting/virtualNetworks', {
        template: '<virtual-network-table class="sf-layout-block"></virtual-network-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/reporting/forecasting', {
        template: require('./coming-soon.tpl.html')
      })
      .when('/cluster/:clusterID/reporting/apiCollection', {
        template: '<api-collection-table class="sf-layout-block"></api-collection-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/nodes', {
        template: '<node-table class="sf-layout-block"></node-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/drives', {
        template: '<drive-table class="sf-layout-block"></drive-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/volumes', {
        template: '<volume-table class="sf-layout-block"></volume-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/replication', {
        template: require('./coming-soon.tpl.html')
      })
      .when('/cluster/:clusterID/vvols/virtual-volumes', {
        template: '<virtual-volume-table class="sf-layout-block"></virtual-volume-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/vvols/protocol-endpoints', {
        template: '<protocol-endpoint-table class="sf-layout-block"></protocol-endpoint-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/vvols/hosts', {
        template: '<host-table class="sf-layout-block"></host-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/vvols/bindings', {
        template: '<binding-table class="sf-layout-block"></binding-table>',
        reloadOnSearch: false
      })
      .when('/cluster/:clusterID/vvols/storage-containers', {
        template: '<storage-container-table class="sf-layout-block"></storage-container-table>',
        reloadOnSearch: false
      })
      .when('/users', {
        template: require('./coming-soon.tpl.html')
      })
      .when('/account', {
        template: '<account class="sf-layout-block"></account>',
      })
      /* Legacy UI URLs */
      .when('/Admin/Nodes', defaultRedirect)
      .when('/Admin/Nodes/Add', defaultRedirect)
      .when('/Alerts/Add', defaultRedirect)
      .when('/Alerts/History', {
        redirectTo: '/dashboard/alerts/history'
      })
      .when('/Alerts/Manage', {
        redirectTo: '/dashboard/alerts/policies'
      })
      .when('/Alerts/Suppress', defaultRedirect)
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
      .when('/Clusters/Archived', defaultRedirect)
      .when('/Clusters/Capacity/Forecast', defaultRedirect)
      .when('/Clusters/Details', defaultRedirect)
      .when('/Clusters/Stats', defaultRedirect)
      .when('/Clusters/Overview', defaultRedirect)
      .when('/Clusters/Graph/Sessions', defaultRedirect)
      .when('/Clusters/VirtualNetworks', defaultRedirect)
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
      .when('/Events/List', defaultRedirect)
      .when('/Licensing/Capacity/Adjust', defaultRedirect)
      .when('/Licensing/Capacity/List', defaultRedirect)
      .when('/Licensing/Capacity/View', defaultRedirect)
      .when('/Nodes/Active', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/nodes';
        }
      })
      .when('/Replication/Clusters', defaultRedirect)
      .when('/Replication/Volumes', defaultRedirect)
      .when('/Settings/Password', {
        redirectTo: function (params, path, search) {
          return '/account';
        }
      })
      .when('/Volumes/Active/List', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/volumes';
        }
      })
      .when('/Volumes/Snapshots/Schedules/List', defaultRedirect)
      .when('/Volumes/Snapshots/List', defaultRedirect)
      .when('/Volumes/Stats', defaultRedirect)
      .when('/Users/Add', defaultRedirect)
      .when('/Users/Edit', defaultRedirect)
      .when('/Users/List', defaultRedirect)
      .otherwise({
        redirectTo: '/dashboard/overview'
      });
  }
AppRoutes.$inject = ['$routeProvider', 'AuthServiceProvider'];
