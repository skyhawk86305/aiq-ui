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
      {key: 'id', label: 'ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter:'number', args: [0, true]}},
      {key: 'created', label: 'Date', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
      {key: 'severity', label: 'Severity', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter:'string'}},
      {key: 'type', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter:'string'}},
      {key: 'nodeID', label: 'Node ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter:'number', args: [0, true, true]}},
      {key: 'driveID', label: 'Drive ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter:'number', args: [0, true, true]}},
      {key: 'resolved', label: 'Resolved', format: {filter: 'boolean', args:['Yes', 'No']}},
      {key: 'resolvedDate', label: 'Resolution Time', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
      {key: 'code', label: 'Error Code', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter:'string'}},
      {key: 'details', label: 'Details', filterComparators: [SFFilterComparators.CONTAINS], format: {filter:'string'}}
    ];

    var errorLogTableService = new SFTableService(listClusterFaults, columns, false);

    errorLogTableService.selectedClusterID = null;

    errorLogTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return errorLogTableService;
  }
})();
