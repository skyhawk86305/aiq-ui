(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('hostTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="host" control-bar="true" column-selection="true" items-per-page="25" export="true" footer-row-count="true"></sf-table>',
      controller: ['$routeParams', 'HostTableService', HostTableController]
    });

  function HostTableController($routeParams, HostTableService) {
    this.service = HostTableService;
    this.service.update($routeParams.clusterID);
  }
})();
