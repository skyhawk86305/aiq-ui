(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('alertPolicyTable', {
      template: require('./policies.tpl.html'),
      controller: ['$scope', 'AlertPolicyTableService', AlertPolicyTableController]
    });

  function AlertPolicyTableController($scope, AlertPolicyTableService) {
    let ctrl = this;
    ctrl.service = AlertPolicyTableService;

    $scope.$on('openModal', function(event, data) {
      ctrl.notification = data;
      ctrl.isModalOpen = true;
    });
  }
})();
