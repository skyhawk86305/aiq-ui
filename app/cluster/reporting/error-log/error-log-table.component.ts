(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('errorLogTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="error-log" control-bar="true" items-per-page="25" export="true"></sf-table>',
      controller: ['$routeParams', 'ErrorLogTableService', ErrorLogTableController]
    });

  function ErrorLogTableController($routeParams, ErrorLogTableService) {
    this.service = ErrorLogTableService;
    this.service.update($routeParams.clusterID);
  }
})();
