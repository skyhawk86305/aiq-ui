(function () {
  'use strict';

  angular
    .module('aiqUi')
    .config(['$routeProvider', 'AuthServiceProvider', routeConfig]);

  function routeConfig($routeProvider, AuthServiceProvider) {
    /*
     * Customized route provider that adds a resolve to all routes (except for login).
     * The resolve checks if user is authenticated.
     */
    var routeProvider = angular.extend({}, $routeProvider, {
      when: function(path, route) {
        if (path !== '/login') {
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

    routeProvider
      .when('/login', {
        template: '<login></login>'
      })
      .when('/dashboard/overview', {
        templateUrl: 'welcome-beta.tpl.html'
      })
      .when('/dashboard/health', {
        templateUrl: 'coming-soon.tpl.html'
      })
      .when('/dashboard/capacity', {
        templateUrl: 'coming-soon.tpl.html'
      })
      .when('/dashboard/performance', {
        templateUrl: 'coming-soon.tpl.html'
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
      .when('/cluster/:clusterID/reporting/iscsiSessions', {
        templateUrl: 'coming-soon.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/virtualNetworks', {
        templateUrl: 'coming-soon.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/forecasting', {
        templateUrl: 'coming-soon.tpl.html'
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
        templateUrl: 'coming-soon.tpl.html'
      })
      .when('/users', {
        templateUrl: 'coming-soon.tpl.html'
      })
      /* Legacy UI URLs */
      .when('/Admin/Nodes', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Admin/Nodes/Add', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Alerts/Add', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Alerts/History', {
        redirectTo: '/dashboard/alerts/history'
      })
      .when('/Alerts/Manage', {
        redirectTo: '/dashboard/alerts/policies'
      })
      .when('/Alerts/Suppress', {
        redirectTo: '/dashboard/overview'
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
        redirectTo: '/dashboard/overview'
      })
      .when('/Clusters/Capacity/Forecast', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Clusters/Details', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Clusters/Stats', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Clusters/Overview', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Clusters/Graph/Sessions', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Clusters/VirtualNetworks', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Customers/Add', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Customers/Edit', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Customers/List', {
        redirectTo: '/dashboard/overview'
      })
      .when('/DelegateGroups/Add', {
        redirectTo: '/dashboard/overview'
      })
      .when('/DelegateGroups/List', {
        redirectTo: '/dashboard/overview'
      })
      .when('/DelegateGroups/Manage', {
        redirectTo: '/dashboard/overview'
      })
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
        redirectTo: '/dashboard/overview'
      })
      .when('/Licensing/Capacity/Adjust', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Licensing/Capacity/List', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Licensing/Capacity/View', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Nodes/Active', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/nodes';
        }
      })
      .when('/Replication/Clusters', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Replication/Volumes', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Settings/Password', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Volumes/Active/List', {
        redirectTo: function (params, path, search) {
          return '/cluster/' + search.clusterID + '/volumes';
        }
      })
      .when('/Volumes/Snapshots/Schedules/List', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Volumes/Snapshots/List', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Volumes/Stats', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Users/Add', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Users/Edit', {
        redirectTo: '/dashboard/overview'
      })
      .when('/Users/List', {
        redirectTo: '/dashboard/overview'
      })
      .otherwise({
        redirectTo: '/dashboard/overview'
      });
  }
})();
