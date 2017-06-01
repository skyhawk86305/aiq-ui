(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('storageContainerTable', {
      template: require('./storage-containers.tpl.html'),
      controller: ['$routeParams', 'StorageContainerTableService', StorageContainerTableController]
    });

  function StorageContainerTableController($routeParams, StorageContainerTableService) {
    this.service = StorageContainerTableService;
    this.service.update($routeParams.clusterID);
  }
})();

