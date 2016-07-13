/* globals angular */
(function () {
  'use strict';

  angular
    .module('aiqUi')
    .run(['$rootScope', '$state', routeConfig])
    .config(['$urlRouterProvider', '$stateProvider', stateConfig]);

  function routeConfig($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      switch (toState.name) {
        case ('dashboard'):
          event.preventDefault();
          $state.go('dashboard.overview');
          break;
        case ('cluster'):
          event.preventDefault();
          $state.go('cluster.nodes');
          break;
      }
    });
  }

  function stateConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/dashboard/overview');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.tpl.html'
      })
      .state('dashboard.overview', {
        url: '/overview',
        templateUrl: 'dashboard/overview/overview.tpl.html'
      })
      .state('cluster', {
        url: '/cluster',
        templateUrl: 'cluster/cluster.tpl.html'
      })
      .state('cluster.nodes', {
        url: '/nodes',
        templateUrl: 'cluster/nodes/nodes.tpl.html',
        controller: 'NodesTableController',
        controllerAs: 'ctrl'
      })
      .state('cluster.drives', {
        url: '/drives',
        templateUrl: 'cluster/drives/drives.tpl.html'
      })
      .state('cluster.volumes', {
        url: '/volumes',
        templateUrl: 'cluster/volumes/volumes.tpl.html'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'users/users.tpl.html'
      });
  }
})();
