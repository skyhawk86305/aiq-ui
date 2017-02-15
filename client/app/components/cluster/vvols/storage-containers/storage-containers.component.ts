(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('storageContainerTable', {
      template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="storage-container" control-bar="true" column-selection="true" items-per-page="25" export="true" footer-row-count="true"></sf-table>',
      controller: ['$routeParams', 'StorageContainerTableService', StorageContainerTableController]
    });

  function StorageContainerTableController($routeParams, StorageContainerTableService) {
    this.service = StorageContainerTableService;
    this.service.update($routeParams.clusterID);
  }
})();

