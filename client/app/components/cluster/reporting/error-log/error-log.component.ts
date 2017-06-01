(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('errorLogTable', {
      template: require('./error-log.tpl.html'),
      controller: ['$routeParams', 'ErrorLogTableService', ErrorLogTableController]
    });

  function ErrorLogTableController($routeParams, ErrorLogTableService) {
    this.service = ErrorLogTableService;
    this.service.update($routeParams.clusterID);
  }
})();
