(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('alertPolicyTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="alert-policy" control-bar="true" items-per-page="25" export="true"></sf-table>',
      controller: ['AlertPolicyTableService', AlertPolicyTableController]
    });

  function AlertPolicyTableController(AlertPolicyTableService) {
    this.service = AlertPolicyTableService;
  }
})();
