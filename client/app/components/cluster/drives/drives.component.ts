(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('driveTable', {
      template: require('./drives.tpl.html'),
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
