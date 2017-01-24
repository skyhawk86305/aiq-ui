(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('virtualVolumeTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="virtual-volume" control-bar="true" column-selection="true" multi-column-sort="true" items-per-page="25" export="true"></sf-table>',
      controller: ['$routeParams', 'VirtualVolumeTableService', VirtualVolumeTableController]
    });

  function VirtualVolumeTableController($routeParams, VirtualVolumeTableService) {
    this.service = VirtualVolumeTableService;
    this.service.update($routeParams.clusterID);
  }
})();
