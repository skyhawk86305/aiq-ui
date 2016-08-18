(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ErrorLogTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      ErrorLogTableService
    ]);

  function ErrorLogTableService(SFTableService, SFFilterComparators, DataService) {
    var listClusterFaults = function() {
      return DataService.callAPI('ListClusterFaults', {clusterID: this.selectedClusterID})
        .then(function(response) {
          return response.faults;
        });
    };

    var columns = [
      {key: 'id', label: 'ID', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'created', label: 'Date', format: {filter: 'aiqData', params: {type: 'date'}}},
      {key: 'severity', label: 'Severity', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'type', label: 'Type', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'nodeID', label: 'Node ID', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'driveID', label: 'Drive ID', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'resolved', label: 'Resolved', format: {filter: 'aiqData', params: {type: 'boolean'}}},
      {key: 'resolvedDate', label: 'Resolution Time', format: {filter: 'aiqData', params: {type: 'date'}}},
      {key: 'code', label: 'Error Code', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'details', label: 'Details', filter: [SFFilterComparators.CONTAINS], format: {filter: 'aiqData', params: {type: 'string'}}},
    ];

    var errorLogTableService = new SFTableService(listClusterFaults, columns, false);

    errorLogTableService.selectedClusterID = null;

    errorLogTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return errorLogTableService;
  }
})();
