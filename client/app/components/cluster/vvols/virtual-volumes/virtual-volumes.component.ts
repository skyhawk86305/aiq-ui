(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('virtualVolumeTable', {
      template: require('./virtual-volumes.tpl.html'),
      controller: ['$routeParams', 'VirtualVolumeTableService', VirtualVolumeTableController]
    });

  function VirtualVolumeTableController($routeParams, VirtualVolumeTableService) {
    this.service = VirtualVolumeTableService;
    this.service.update($routeParams.clusterID);
  }
})();
