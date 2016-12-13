(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('volumeTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="volume" control-bar="true" column-selection="true" multi-column-sort="true" items-per-page="25"></sf-table>',
      controller: ['$routeParams', 'VolumeTableService', VolumeTableController]
    });

  function VolumeTableController($routeParams, VolumeTableService) {
    this.service = VolumeTableService;
    this.service.update($routeParams.clusterID);
  }
})();
