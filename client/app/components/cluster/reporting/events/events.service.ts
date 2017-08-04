(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('EventTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      EventTableService
    ]);

  function EventTableService(SFTableService, SFFilterComparators, DataService) {
    let listEvents = function() {
      return DataService.callAPI('ListEvents', {clusterID: this.selectedClusterID})
        .then(function(response) {
          return response.events.map(function(event) {
            return event;
          });
        });
    };


    let columns = [
      {key: 'eventID', label: 'ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true]}},
      {key: 'timeOfReport', label: 'Event Time', format: {filter: 'aiqDate'}},
      {key: 'eventInfoType', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'message', label: 'Message', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'serviceID', label: 'Service ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'nodeID', label: 'Node ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true, true]}},
      {key: 'driveID', label: 'Drive ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true, true]}},
      {key: 'details', label: 'Details', filterComparators: [SFFilterComparators.CONTAINS], format: {filter: 'aiqJson'}, wrap: true}
    ];

    let eventTableService = new SFTableService(listEvents, columns, false);

    eventTableService.selectedClusterID = null;

    eventTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID, 10);
    };

    return eventTableService;
  }
})();
