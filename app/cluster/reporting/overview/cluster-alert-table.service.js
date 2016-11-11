(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ClusterAlertTableService', [
      '$filter',
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      ClusterAlertTableService
    ]);

  function ClusterAlertTableService($filter, SFTableService, SFFilterComparators, DataService) {
    var columns = getColumns(),
      service = new SFTableService(listAlertsByCluster, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getColumns() {
      return [
        {key: 'created', label: 'Alert Triggered', width: 200, format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
        {key: 'lastNotified', label: 'Last Notified', width: 200, format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
        {key: 'isResolved', label: 'Resolved', width: 120, format: {filter: 'tableBadgeBoolean'}},
        {key: 'severity', label: 'Severity', width: 120, filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'tableBadgeAlertSeverity'}},
        {key: 'notificationName', label: 'Policy Name', filter: SFFilterComparators.STRING_DEFAULT},
        {key: 'value', label: 'Alert Value', filterComparators: SFFilterComparators.STRING_DEFAULT},
        {key: 'destinationEmail', label: 'Destination', filterComparators:SFFilterComparators.STRING_DEFAULT},
        {key: 'policyDescription', label: 'Alert Condition', filterComparators:SFFilterComparators.STRING_DEFAULT}
      ];
    }

    function listAlertsByCluster() {
      return DataService.callAPI('ListAlertsByCluster', {clusterID: service.selectedClusterID})
        .then(function(response) {
          return response.alerts.map(function(alert) {
            alert.notificationName = alert.notification && alert.notification.notificationName || '';
            alert.destinationEmail = alert.notification && alert.notification.destinationEmail || '';
            alert.policyDescription = alert.notification && $filter('alert')(alert.notification.notificationFields, {type: 'condition'}) || '';
            return alert;
          });
        });
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID);
    }
  }
})();
