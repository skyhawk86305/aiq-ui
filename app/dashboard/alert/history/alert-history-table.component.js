(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('alertHistoryTable', {
      template: '<sf-table class="sf-layout-block" id="alert-history" service="$ctrl.service" type="alert-history"></sf-table>',
      controller: ['AlertHistoryTableService', AlertHistoryTableController]
    });

  function AlertHistoryTableController(AlertHistoryTableService) {
    this.service = AlertHistoryTableService;
  }
})();
