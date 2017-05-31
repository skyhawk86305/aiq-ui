(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerVolumeSizeService', [
      'DataService',
      ControlTowerVolumeSizeService
    ]);

  function ControlTowerVolumeSizeService(DataService) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerVolumeSize', {})
    };
  }
})();
