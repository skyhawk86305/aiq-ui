(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DashbergBandwidthService', [
      'DataService',
      DashbergBandwidthService
    ]);

  function DashbergBandwidthService(DataService) {
    this.getData = function() {
      return DataService.callAPI('DashbergBandwidth', {});
    }
  };
})();
