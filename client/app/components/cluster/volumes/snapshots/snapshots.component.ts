(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('snapshotTable', {
      template: require('./snapshots.tpl.html'),
      controller: ['$routeParams', 'SnapshotTableService', SnapshotTableController]
    });

  function SnapshotTableController($routeParams, SnapshotTableService) {
    this.service = SnapshotTableService;
    this.service.update($routeParams.clusterID);
  }
})();
