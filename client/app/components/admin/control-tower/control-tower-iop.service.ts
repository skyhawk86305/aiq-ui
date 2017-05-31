(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerIOPService', [
      'DataService',
      ControlTowerIOPService
    ]);

  function ControlTowerIOPService(DataService) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerIOP', {})
    }
  }
})();
