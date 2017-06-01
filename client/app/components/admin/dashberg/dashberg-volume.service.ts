(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DashbergVolumeService', [
      'DataService',
      DashbergVolumeService
    ]);

  function DashbergVolumeService(DataService) {
    this.getData = function() {
      return DataService.callAPI('DashbergVolume', {})
    }
  }
})();
