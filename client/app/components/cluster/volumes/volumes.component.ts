(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('volumeTable', {
      template: require('./volumes.tpl.html'),
      controller: ['$routeParams', 'VolumeTableService', VolumeTableController]
    });

  function VolumeTableController($routeParams, VolumeTableService) {
    this.service = VolumeTableService;
    this.service.update($routeParams.clusterID);
  }
})();
