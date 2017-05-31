(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerNodeService', [
      'DataService',
      ControlTowerNodeService
    ]);

  function ControlTowerNodeService(DataService) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerNode', {});
    }
  };
})();
