(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('AlertTableService', [
      '$filter',
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      AlertTableService
    ]);

  function AlertTableService($filter, SFTableService, SFFilterComparators, DataService) {
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

    srvc = new SFTableService(listAlertsByCluster, columns, false);
    srvc.selectedClusterID = null;
    srvc.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };
    return srvc;

    /**********************************/

    function listAlertsByCluster() {
      /*jshint validthis:true*/
      return DataService.callAPI('ListAlertsByCluster', {clusterID: this.selectedClusterID})
        .then(function(response) {
          return response.alerts.map(function(alert) {
            alert.notificationName = alert.notification && alert.notification.notificationName || '';
            alert.destinationEmail = alert.notification && alert.notification.destinationEmail || '';
            alert.policyDescription = alert.notification && $filter('alert')(alert.notification.notificationFields, {type: 'condition'}) || '';

            return alert;
          });
        });
    }
  }
})();
