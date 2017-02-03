(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('clusterAlertTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="clusterAlert" control-bar="true" items-per-page="25" export="true"></sf-table>',
      controller: ['$routeParams', 'ClusterAlertTableService', EventTableController]
    });

  function EventTableController($routeParams, ClusterAlertTableService) {
    this.service = ClusterAlertTableService;
    this.service.update($routeParams.clusterID);
  }
})();
