(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('snapshotSchedulesTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="snapshot-schedules" control-bar="true" column-selection="true" multi-column-sort="true" items-per-page="25" export="true" footer-row-count="true"></sf-table>',
      controller: ['$routeParams', 'SnapshotSchedulesTableService', SnapshotSchedulesTableController]
    });

  function SnapshotSchedulesTableController($routeParams, SnapshotSchedulesTableService) {
    this.service = SnapshotSchedulesTableService;
    this.service.update($routeParams.clusterID);
  }
})();
