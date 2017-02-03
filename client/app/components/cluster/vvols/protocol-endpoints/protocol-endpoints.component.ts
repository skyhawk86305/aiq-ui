(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('protocolEndpointTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="protocol-endpoint" control-bar="true" column-selection="true" items-per-page="25" export="true"></sf-table>',
      controller: ['$routeParams', 'ProtocolEndpointTableService', ProtocolEndpointTableController]
    });

  function ProtocolEndpointTableController($routeParams, ProtocolEndpointTableService) {
    this.service = ProtocolEndpointTableService;
    this.service.update($routeParams.clusterID);
  }
})();
