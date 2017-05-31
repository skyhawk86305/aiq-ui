(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('virtualNetworkTable', {
      template: require('./virtual-networks.tpl.html'),
      controller: ['$routeParams', 'VirtualNetworkTableService', VirtualNetworkTableController]
    });

  function VirtualNetworkTableController($routeParams, VirtualNetworkTableService) {
    this.service = VirtualNetworkTableService;
    this.service.update($routeParams.clusterID);
  }
})();
