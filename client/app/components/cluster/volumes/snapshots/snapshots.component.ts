(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('snapshotTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="snapshot" control-bar="true" column-selection="true" multi-column-sort="true" items-per-page="25" export="true" footer-row-count="true"></sf-table>',
      controller: ['$routeParams', 'SnapshotTableService', SnapshotTableController]
    });

  function SnapshotTableController($routeParams, SnapshotTableService) {
    this.service = SnapshotTableService;
    this.service.update($routeParams.clusterID, $routeParams.volumeID);
  }
})();
