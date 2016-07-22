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
    .controller('AppController', ['$rootScope', 'ApiLogService', 'DataService', '$location', '$route', ctrl]);

  function ctrl($rootScope, ApiLogService, DataService, $location) {
    /* jshint validthis:true */
    var self = this;
    self.apiLog = ApiLogService;

    $rootScope.$on('$routeChangeSuccess', function() {
      self.currentPage = $location.path().slice(1).replace(':clusterID/', '').split('/').join('-');
    });

    // ToDo: remove this call. Only used for demo purposes
    DataService.callAPI('ListActiveVolumes', {clusterID:1898714}).then(function(response) {
      self.volumes = response.volumes;
    });
  }

})();
