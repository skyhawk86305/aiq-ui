(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('driveTable', {
      template: '<sf-table id="drive-table" service="$ctrl.service" type="drive"></sf-table>',
      controller: ['$routeParams', 'DriveTableService', DriveTableController]
    });

  function DriveTableController($routeParams, DriveTableService) {
    this.service = DriveTableService;
    this.service.update($routeParams.clusterID);
  }
})();
