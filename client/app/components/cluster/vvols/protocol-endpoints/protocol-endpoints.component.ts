(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('protocolEndpointTable', {
      template: require('./protocol-endpoints.tpl.html'),
      controller: ['$routeParams', 'ProtocolEndpointTableService', ProtocolEndpointTableController]
    });

  function ProtocolEndpointTableController($routeParams, ProtocolEndpointTableService) {
    this.service = ProtocolEndpointTableService;
    this.service.update($routeParams.clusterID);
  }
})();
