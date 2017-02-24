(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('bindingTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="binding" control-bar="true" column-selection="true" items-per-page="25" export="true" footer-row-count="true"></sf-table>',
      controller: ['$routeParams', 'BindingTableService', BindingTableController]
    });

  function BindingTableController($routeParams, BindingTableService) {
    this.service = BindingTableService;
    this.service.update($routeParams.clusterID);
  }
})();

