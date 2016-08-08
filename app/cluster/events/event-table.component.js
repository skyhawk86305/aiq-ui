(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('eventTable', {
      template: '<sf-table class="sf-layout-block" id="event-table" service="$ctrl.service" type="event"></sf-table>',
      controller: ['$routeParams', 'EventTableService', EventTableController]
    });

  function EventTableController($routeParams, EventTableService) {
    this.service = EventTableService;
    this.service.update($routeParams.clusterID);
  }
})();
