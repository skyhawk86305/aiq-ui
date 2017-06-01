(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DashbergNodeService', [
      'DataService',
      DashbergNodeService
    ]);

  function DashbergNodeService(DataService) {
    this.getData = function() {
      return DataService.callAPI('DashbergNode', {});
    }
  };
})();
