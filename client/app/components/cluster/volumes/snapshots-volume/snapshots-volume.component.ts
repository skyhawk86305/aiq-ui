(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('snapshotVolumeTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="snapshot-volume" control-bar="true" column-selection="true" multi-column-sort="true" items-per-page="25" export="true" footer-row-count="true"></sf-table>',
      controller: ['$routeParams', 'SnapshotVolumeTableService', SnapshotVolumeTableController]
    });

  function SnapshotVolumeTableController($routeParams, SnapshotVolumeTableService) {
    this.service = SnapshotVolumeTableService;
    this.service.update($routeParams.clusterID, $routeParams.volumeID);
  }
})();

