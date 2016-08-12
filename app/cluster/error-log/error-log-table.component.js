(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('errorLogTable', {
      template: '<sf-table id="error-log-table" class="sf-layout-block" service="$ctrl.service" type="error-log"></sf-table>',
      controller: ['$routeParams', 'ErrorLogTableService', ErrorLogTableController]
    });

  function ErrorLogTableController($routeParams, ErrorLogTableService) {
    this.service = ErrorLogTableService;
    this.service.update($routeParams.clusterID);
  }
})();
