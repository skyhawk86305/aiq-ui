(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('bindingTable', {
      template: require('./bindings.tpl.html'),
      controller: ['$routeParams', 'BindingTableService', BindingTableController]
    });

  function BindingTableController($routeParams, BindingTableService) {
    this.service = BindingTableService;
    this.service.update($routeParams.clusterID);
  }
})();

