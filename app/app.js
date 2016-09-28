(function () {
  'use strict';

  angular
    .module('aiqUi', [
      'ui.select',
      'ui.bootstrap',
      'ngRoute',
      'ngMessages',
      'ngSanitize',
      'sfComponents'
    ]);

  angular.module('aiqUi')
    .controller('AppController', ['$rootScope', 'ApiLogService', 'DataService', '$location', ctrl]);

  function ctrl($rootScope, ApiLogService, DataService, $location) {
    /* jshint validthis:true */
    var self = this;
    self.apiLogService = ApiLogService;
    self.isUserAuthenticated = false;

    $rootScope.$on('$routeChangeSuccess', function() {
      if ($location.path() !== '/login') {
        self.isUserAuthenticated = true;
      } else {
        self.isUserAuthenticated = false;
      }
      self.currentPage = $location.path().slice(1).replace(/cluster\/([0-9]*)/, 'cluster').split('/').join('-');
    });

    $rootScope.$on('$routeChangeError', function() {
        self.isUserAuthenticated = false;
        $location.path('/login');
    });
  }

})();
