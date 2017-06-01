(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('alertHistoryTable', {
      template: require('./history.tpl.html'),
      controller: ['AlertHistoryTableService', AlertHistoryTableController]
    });

  function AlertHistoryTableController(AlertHistoryTableService) {
    this.service = AlertHistoryTableService;
  }
})();
