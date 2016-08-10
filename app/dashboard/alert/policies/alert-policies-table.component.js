(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('alertPolicyTable', {
      template: '<sf-table class="sf-layout-block" id="alert-policy" service="$ctrl.service" type="alert-policy"></sf-table>',
      controller: ['AlertPolicyTableService', AlertPolicyTableController]
    });

  function AlertPolicyTableController(AlertPolicyTableService) {
    this.service = AlertPolicyTableService;
  }
})();
