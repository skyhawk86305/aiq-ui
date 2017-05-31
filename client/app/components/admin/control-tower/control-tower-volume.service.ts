(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerVolumeService', [
      'DataService',
      ControlTowerVolumeService
    ]);

  function ControlTowerVolumeService(DataService) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerVolume', {})
    }
  }
})();
