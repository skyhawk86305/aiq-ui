(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerNodeService', [
      'DataService',
      '$filter',
      ControlTowerNodeService
    ]);

  function ControlTowerNodeService(DataService, $filter) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerNode', {});
    }
  }
})();
