(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerVolumeService', [
      'DataService',
      '$filter',
      ControlTowerVolumeService
    ]);

  function ControlTowerVolumeService(DataService, $filter) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerVolume', {})
    }
  }
})();
