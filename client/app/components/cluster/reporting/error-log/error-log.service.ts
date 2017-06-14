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
        .then(response => _.orderBy(response.faults, ['date'], ['desc']));
    };

    let columns = [
      {key: 'clusterFaultID', label: 'Cluster Fault ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter:'aiqNumber', args: [0, true]}},
      {key: 'date', label: 'Date', format: {filter: 'aiqDate'}},
      {key: 'severity', label: 'Severity', format: {filter: 'tableBadgeAlertSeverity'}},
      {key: 'type', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter:'string'}},
      {key: 'nodeID', label: 'Node ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter:'aiqNumber', args: [0, true, true]}},
      {key: 'driveID', label: 'Drive ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter:'aiqNumber', args: [0, true, true]}},
      {key: 'resolved', label: 'Resolved', format: {filter: 'tableBadgeBoolean'}},
      {key: 'resolvedDate', label: 'Resolution Time', format: {filter: 'aiqDate'}},
      {key: 'code', label: 'Error Code', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter:'string'}},
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
