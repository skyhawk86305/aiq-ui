(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('nodeTable', {
      template: '<sf-table class="sf-layout-block" id="node-table" service="$ctrl.service" type="node"></sf-table>',
      controller: ['$routeParams', 'NodeTableService', NodeTableController]
    });

  function NodeTableController($routeParams, NodeTableService) {
    this.service = NodeTableService;
    this.service.update($routeParams.clusterID);
  }
})();
