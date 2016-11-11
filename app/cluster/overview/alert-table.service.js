(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('AlertTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      AlertTableService
    ]);

  function AlertTableService(SFTableService, SFFilterComparators, DataService) {
    var srvc,
      columns =  [
      {key: 'created', label: 'Alert Triggered', format: {filter: 'aiqData', params: {type: 'date'}}},
      {key: 'lastNotified', label: 'Last Notified', format: {filter: 'aiqData', params: {type: 'date'}}},
      {key: 'isResolved', label: 'Resolved', format: {filter: 'aiqData', params: {type: 'boolean'}}},
      {key: 'notificationName', label: 'Policy Name', filter: SFFilterComparators.STRING_DEFAULT},
      {key: 'severity', label: 'Severity', filterComparators: SFFilterComparators.STRING_DEFAULT},
      {key: 'value', label: 'Alert Value', filterComparators: SFFilterComparators.STRING_DEFAULT},
      {key: 'destinationEmail', label: 'Destination', filterComparators:SFFilterComparators.STRING_DEFAULT},
      {key: 'policyDescription', label: 'Alert Condition', filterComparators:SFFilterComparators.STRING_DEFAULT}
    ];

    srvc = new SFTableService(listActiveNodes, columns, false);
    srvc.selectedClusterID = null;
    srvc.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };
    return srvc;

    /**********************************/

    function listActiveNodes() {
      /*jshint validthis:true*/
      return DataService.callAPI('ListActiveNodes', {clusterID: this.selectedClusterID})
        .then(function(response) { return response.nodes; });
    }
  }
})();
