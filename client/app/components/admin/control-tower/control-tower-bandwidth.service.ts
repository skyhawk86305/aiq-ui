(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerBandwidthService', [
      'DataService',
      ControlTowerBandwidthService
    ]);

  function ControlTowerBandwidthService(DataService) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerBandwidth', {});
    }
  };
})();
