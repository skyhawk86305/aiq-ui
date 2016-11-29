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
        templateUrl: 'coming-soon.tpl.html'
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
        templateUrl: 'cluster/volumes/volumes.tpl.html'
      })
      .when('/cluster/:clusterID/replication', {
        templateUrl: 'coming-soon.tpl.html'
      })
      .when('/users', {
        templateUrl: 'coming-soon.tpl.html'
      })
      .otherwise({
        redirectTo: '/dashboard/overview'
      });
  }
})();
