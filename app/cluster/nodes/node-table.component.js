(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('nodeTable', {
      template: '<sf-table id="node-table" service="$ctrl.service"></sf-table>',
      controller: ['$routeParams', 'NodeTableService', NodeTableController]
    });

  function NodeTableController($routeParams, NodeTableService) {
    this.service = NodeTableService;
    this.service.update($routeParams.clusterID);
  }
})();
