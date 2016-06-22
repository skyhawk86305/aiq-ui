/* globals angular */
(function () {
  'use strict';

  angular
    .module('elementUiPerNode')
    .run(['$rootScope', '$state', routeConfig])
    .config(['$urlRouterProvider', '$stateProvider', stateConfig]);

  function routeConfig($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      switch (toState.name) {
        case ('networkSettings'):
          event.preventDefault();
          $state.go('networkSettings.bondOneG');
          break;
      }
    });
  }

  function stateConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/network-settings/bond-one-g');

    $stateProvider
      .state('networkSettings', {
        url: '/network-settings',
        templateUrl: 'settings/network-settings.tpl.html'
      })
      .state('networkSettings.bondOneG', {
        url: '/bond-one-g',
        controllerAs: 'ctrl',
        controller: 'SettingsController',
        templateUrl: 'settings/bond-one-g.tpl.html'
      })
      .state('networkSettings.bondTenG', {
        url: '/bond-ten-g',
        controllerAs: 'ctrl',
        controller: 'SettingsController',
        templateUrl: 'settings/bond-ten-g.tpl.html'
      })
      .state('clusterSettings', {
        url: '/cluster-settings',
        controllerAs: 'ctrl',
        controller: 'SettingsController',
        templateUrl: 'settings/cluster-settings.tpl.html'
      });
  }
})();
