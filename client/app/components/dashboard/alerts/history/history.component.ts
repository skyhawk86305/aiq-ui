(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('alertHistoryTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="alert-history" ' +
        'multi-column-sort="true" control-bar="true" items-per-page="25" export="true" footer-row-count="true"></sf-table>',
      controller: ['AlertHistoryTableService', AlertHistoryTableController]
    });

  function AlertHistoryTableController(AlertHistoryTableService) {
    this.service = AlertHistoryTableService;
  }
})();
