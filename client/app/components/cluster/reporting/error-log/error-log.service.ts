(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('ErrorLogTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      ErrorLogTableService
    ]);

  function ErrorLogTableService(SFTableService, SFFilterComparators, DataService) {
    let listClusterFaults = function() {
      return DataService.callAPI('ListClusterFaults', {clusterID: this.selectedClusterID})
        .then(response => _.orderBy(response.faults, ['resolved', 'severity', 'date'], ['asc', 'asc', 'desc']));
    };

    let columns = [
      {key: 'clusterFaultID', label: 'ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter:'aiqNumber', args: [0, true]}, width: 80},
      {key: 'date', label: 'Date', format: {filter: 'aiqDate'}, width: 150},
      {key: 'severity', label: 'Severity', format: {filter: 'tableBadgeAlertSeverity'}, width: 140},
      {key: 'type', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter:'string'}, width: 80},
      {key: 'nodeID', label: 'Node ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter:'aiqNumber', args: [0, true, true]}, width: 80},
      {key: 'driveID', label: 'Drive ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter:'aiqNumber', args: [0, true, true]}, width: 80},
      {key: 'resolved', label: 'Resolved', format: {filter: 'tableBadgeBoolean'}, width: 100},
      {key: 'resolvedDate', label: 'Resolution Time', format: {filter: 'aiqDate'}, width: 150},
      {key: 'code', label: 'Error Code', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter:'string'}, width: 180},
      {key: 'details', label: 'Details', filterComparators: [SFFilterComparators.CONTAINS], format: {filter:'string'}}
    ];

    let errorLogTableService = new SFTableService(listClusterFaults, columns, false);

    errorLogTableService.selectedClusterID = null;

    errorLogTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID, 10);
    };

    return errorLogTableService;
  }
})();
