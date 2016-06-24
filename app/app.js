/* globals angular */
(function () {
  'use strict';

  angular
    .module('aiqUi', [
      'ui.router',
      'ui.select',
      'ui.bootstrap',
      'ngMessages',
      'ngSanitize',
      'sfComponents'
    ]);

  angular.module('aiqUi')
    .controller('AppController', ['$rootScope', 'NavbarService', 'ApiLogService', 'DataService', '$state', ctrl]);

  function ctrl($rootScope, NavbarService, ApiLogService, DataService) {
    /* jshint validthis:true */
    var self = this;

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      self.currentPage = toState.name.replace(/\./g, '-');
    });

    self.navbar = NavbarService;
    self.apiLog = ApiLogService;

    // ToDo: remove this call. Only used for demo purposes
    DataService.callAPI('ListActiveVolumes', {clusterID:1898714}).then(function(response) {
      self.volumes = response.volumes;
    });
  }

})();
