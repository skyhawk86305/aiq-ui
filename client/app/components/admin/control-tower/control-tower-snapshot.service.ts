(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerSnapshotService', [
      'DataService',
      ControlTowerSnapshotService
    ]);

  function ControlTowerSnapshotService(DataService) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerSnapshot', {});
    }
  };
})();
