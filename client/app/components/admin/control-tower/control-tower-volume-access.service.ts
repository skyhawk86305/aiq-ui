(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerVolumeAccessService', [
      'DataService',
      ControlTowerVolumeAccessService
    ]);

  function ControlTowerVolumeAccessService(DataService) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerVolumeAccess', {})
    };
  }
})();
