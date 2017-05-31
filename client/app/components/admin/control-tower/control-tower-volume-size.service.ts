(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerVolumeSizeService', [
      'DataService',
      '$filter',
      ControlTowerVolumeSizeService
    ]);

  function ControlTowerVolumeSizeService(DataService, $filter) {
    this.getData = function() {
      return DataService.callAPI('ControlTowerVolumeSize', {})
    };
  }
})();
