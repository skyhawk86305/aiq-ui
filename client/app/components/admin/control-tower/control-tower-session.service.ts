(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerSessionService', [
      'DataService',
      ControlTowerSessionService
    ]);

  function ControlTowerSessionService(DataService) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerSession', {});
    }
  };
})();
