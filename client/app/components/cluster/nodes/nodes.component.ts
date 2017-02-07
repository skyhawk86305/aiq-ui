(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('nodeTable', {
      template: require('./nodes.tpl.html'),
      controller: ['$routeParams', 'NodeTableService', 'DataService', NodeTableController]
    });

  function NodeTableController($routeParams, NodeTableService, DataService) {
    let ctrl = this;
    this.service = NodeTableService;

    ctrl.$onInit = function() {
      ctrl.service.update($routeParams.clusterID);
      ctrl.getClusterInfoState = 'loading';
      setInfoBarData();
    };

    function setInfoBarData() {
      DataService.callGuzzleAPI(parseInt($routeParams.clusterID, 10), 'GetClusterInfo')
      .then(response => {
        ctrl.clusterInfo = response.clusterInfo || {};
        ctrl.getClusterInfoState = 'loaded';
      }).catch(() => {
        ctrl.getClusterInfoState = 'error';
      });
    }
  }
})();
