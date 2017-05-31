(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('eventTable', {
      template: require('./events.tpl.html'),
      controller: ['$routeParams', 'EventTableService', EventTableController]
    });

  function EventTableController($routeParams, EventTableService) {
    this.service = EventTableService;
    this.service.update($routeParams.clusterID);
  }
})();
