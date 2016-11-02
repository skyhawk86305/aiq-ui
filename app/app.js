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
    self.showNavbar = false;
    self.host = $location.host();

    $rootScope.$on('$routeChangeSuccess', function() {
      if ($location.path() !== '/login') {
        self.showNavbar = true;
      } else {
        self.showNavbar = false;
      }
      self.currentPage = $location.path().slice(1).replace(/cluster\/([0-9]*)/, 'cluster').split('/').join('-');
    });

    $rootScope.$on('$routeChangeError', function() {
        self.showNavbar = false;
        $location.path('/login');
    });

     // ToDo: remove this call. Only used for demo purposes
     DataService.callAPI('ListActiveVolumes', {clusterID:1898714}).then(function(response) {
       self.volumes = response.volumes;
     });

  }

})();
