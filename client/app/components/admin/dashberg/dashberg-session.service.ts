(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DashbergSessionService', [
      'DataService',
      DashbergSessionService
    ]);

  function DashbergSessionService(DataService) {
    this.getData = function() {
      return DataService.callAPI('DashbergSession', {});
    }
  };
})();
