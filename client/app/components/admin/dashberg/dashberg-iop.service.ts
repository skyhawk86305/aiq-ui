(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DashbergIOPService', [
      'DataService',
      DashbergIOPService
    ]);

  function DashbergIOPService(DataService) {
    this.getData = function() {
      return DataService.callAPI('DashbergIOP', {})
    }
  }
})();
