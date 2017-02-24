(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('virtualNetworkTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="virtual-network" control-bar="true" items-per-page="25" export="true" footer-row-count="true"></sf-table>',
      controller: ['$routeParams', 'VirtualNetworkTableService', VirtualNetworkTableController]
    });

  function VirtualNetworkTableController($routeParams, VirtualNetworkTableService) {
    this.service = VirtualNetworkTableService;
    this.service.update($routeParams.clusterID);
  }
})();
