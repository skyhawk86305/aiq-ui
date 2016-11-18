(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('EventTableService', [
      '$filter',
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      EventTableService
    ]);

  function EventTableService($filter, SFTableService, SFFilterComparators, DataService) {
    var listEvents = function() {
      return DataService.callAPI('ListEvents', {clusterID: this.selectedClusterID})
        .then(function(response) {
          return response.events.map(function(event) {
            event.detailsString = $filter('json')(event.details);
            return event;
          });
        });
    };


    var columns = [
      {key: 'eventID', label: 'ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'timeOfReport', label: 'Event Time', format: {filter: 'date', args:['yyyy-MM-dd HH:mm:ss']}},
      {key: 'eventInfoType', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'message', label: 'Message', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'serviceID', label: 'Service ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'nodeID', label: 'Node ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'driveID', label: 'Drive ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'detailsString', label: 'Details', filterComparators: [SFFilterComparators.CONTAINS], format: {filter: 'string'}}
    ];

    var eventTableService = new SFTableService(listEvents, columns, false);

    eventTableService.selectedClusterID = null;

    eventTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID, 10);
    };

    return eventTableService;
  }
})();
