(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DashbergVolumeAccessService', [
      'DataService',
      DashbergVolumeAccessService
    ]);

  function DashbergVolumeAccessService(DataService) {
    this.getData = function() {
      return DataService.callAPI('DashbergVolumeAccess', {})
    };
  }
})();
