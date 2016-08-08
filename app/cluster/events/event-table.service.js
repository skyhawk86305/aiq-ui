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
            event.detailsString = $filter('aiqData')(event.details, {type: 'json'});
            return event;
          });
        });
    };


    var columns = [
      {key: 'eventID', label: 'ID', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'timeOfReport', label: 'Event Time', format: {filter: 'aiqData', params: {type: 'date'}}},
      {key: 'eventInfoType', label: 'Type', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'message', label: 'Message', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'serviceID', label: 'Service ID', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'nodeID', label: 'Node ID', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'driveID', label: 'Drive ID', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'detailsString', label: 'Details', filter: [SFFilterComparators.CONTAINS], format: {filter: 'aiqData', params: {type: 'string'}}}
    ];

    var eventTableService = new SFTableService(listEvents, columns, false);

    eventTableService.selectedClusterID = null;

    eventTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID, 10);
    };

    return eventTableService;
  }
})();
