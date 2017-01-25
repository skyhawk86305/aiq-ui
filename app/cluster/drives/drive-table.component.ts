(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('driveTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" id="drive-table" table-id="drive" control-bar="true" items-per-page="25" quick-filter="$ctrl.quickFilter" export="true"></sf-table>',
      controller: ['$routeParams', 'DriveTableService', DriveTableController]
    });

  function DriveTableController($routeParams, DriveTableService) {
    this.service = DriveTableService;
    this.service.update($routeParams.clusterID);
    this.quickFilter = {
      column: 'status',
      values: ['active', 'available', 'failed'],
      labels: {
        active: 'Active',
        available: 'Available',
        failed: 'Failed'
      },
      default: 'active'
    };
  }
})();
