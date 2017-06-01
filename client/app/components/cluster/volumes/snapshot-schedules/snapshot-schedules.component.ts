(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('snapshotSchedulesTable', {
      template: require('./snapshot-schedules.tpl.html'),
      controller: ['$routeParams', 'SnapshotSchedulesTableService', SnapshotSchedulesTableController]
    });

  function SnapshotSchedulesTableController($routeParams, SnapshotSchedulesTableService) {
    this.service = SnapshotSchedulesTableService;
    this.service.update($routeParams.clusterID);
  }
})();
