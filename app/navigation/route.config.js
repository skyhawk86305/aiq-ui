(function () {
  'use strict';

  angular
    .module('aiqUi')
    .config(['$routeProvider', routeConfig]);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/dashboard/overview/sub1', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/dashboard/overview/sub2', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/dashboard/overview/sub3', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/dashboard/health', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/dashboard/capacity', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/dashboard/performance', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/dashboard/alerts', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/overview', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/capacity', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/efficiency', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/performance', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/errorLog', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/eventList', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/iscsiSessions', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/virtualNetworks', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/cluster/:clusterID/reporting/forecasting', {
        templateUrl: 'sample-page.tpl.html'
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
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/cluster/:clusterID/alerts', {
        templateUrl: 'sample-page.tpl.html'
      })
      .when('/users', {
        templateUrl: 'sample-page.tpl.html'
      })
      .otherwise({
        redirectTo: '/dashboard/overview/sub1'
      });
  }
})();
