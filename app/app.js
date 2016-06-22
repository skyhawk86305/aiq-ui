/* globals angular */
(function () {
  'use strict';

  angular
    .module('elementUiPerNode', [
      'ui.router',
      'ui.select',
      'ui.bootstrap',
      'ngMessages',
      'ngSanitize',
      'solidfire-sdk',
      'sfComponents'
    ]);

  angular.module('elementUiPerNode')
    .controller('AppController', ['$rootScope', 'NavbarService', 'ApiLogService', '$state', ctrl]);

  function ctrl($rootScope, NavbarService, ApiLogService) {
    /* jshint validthis:true */
    var self = this;

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      self.currentPage = toState.name.replace(/\./g, '-');
    });

    self.navbar = NavbarService;
    self.apiLog = ApiLogService;
  }

})();
