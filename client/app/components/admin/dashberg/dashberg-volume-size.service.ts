(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DashbergVolumeSizeService', [
      'DataService',
      DashbergVolumeSizeService
    ]);

  function DashbergVolumeSizeService(DataService) {
    this.getData = function() {
      return DataService.callAPI('DashbergVolumeSize', {})
    };
  }
})();
