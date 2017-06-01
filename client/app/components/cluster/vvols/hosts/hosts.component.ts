(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('hostTable', {
      template: require('./hosts.tpl.html'),
      controller: ['$routeParams', 'HostTableService', HostTableController]
    });

  function HostTableController($routeParams, HostTableService) {
    this.service = HostTableService;
    this.service.update($routeParams.clusterID);
  }
})();
