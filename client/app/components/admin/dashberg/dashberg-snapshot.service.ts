(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DashbergSnapshotService', [
      'DataService',
      DashbergSnapshotService
    ]);

  function DashbergSnapshotService(DataService) {
    this.getData = function() {
      return DataService.callAPI('DashbergSnapshot', {});
    }
  };
})();
