(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('apiCollectionTable', {
      template: require('./api-collection.tpl.html'),
      controller: ['$routeParams', 'APICollectionTableService', APICollectionTableController]
    });

  function APICollectionTableController($routeParams, APICollectionTableService) {
    this.service = APICollectionTableService;
    this.service.update($routeParams.clusterID);
  }
})();
