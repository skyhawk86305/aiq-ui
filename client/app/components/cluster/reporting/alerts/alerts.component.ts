(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('clusterAlertTable', {
      template: require('./alerts.tpl.html'),
      controller: ['$routeParams', 'ClusterAlertTableService', EventTableController]
    });

  function EventTableController($routeParams, ClusterAlertTableService) {
    this.service = ClusterAlertTableService;
    this.service.update($routeParams.clusterID);
  }
})();
