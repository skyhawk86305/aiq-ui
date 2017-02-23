(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('alertPolicyTable', {
      template: require('./policies.tpl.html'),
      controller: ['AlertPolicyTableService', AlertPolicyTableController]
    });

  function AlertPolicyTableController(AlertPolicyTableService) {
    this.service = AlertPolicyTableService;
  }
})();
