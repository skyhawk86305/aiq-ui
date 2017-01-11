(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('nodeTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="node" control-bar="true" items-per-page="25" export="true"></sf-table>',
      controller: ['$routeParams', 'NodeTableService', NodeTableController]
    });

  function NodeTableController($routeParams, NodeTableService) {
    this.service = NodeTableService;
    this.service.update($routeParams.clusterID);
  }
})();
