(function () {
    'use strict';
    angular
        .module('aiqUi')
        .component('eventTable', {
        template: '<sf-table class="sf-layout-block" service="$ctrl.service" table-id="event" control-bar="true" items-per-page="25"></sf-table>',
        controller: ['$routeParams', 'EventTableService', EventTableController]
    });
    function EventTableController($routeParams, EventTableService) {
        this.service = EventTableService;
        this.service.update($routeParams.clusterID);
    }
})();
//# sourceMappingURL=event-table.component.js.map