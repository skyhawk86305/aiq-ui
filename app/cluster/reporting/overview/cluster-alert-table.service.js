(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ClusterAlertTableService', [
      '$filter',
      'SFTableService',
      'DataService',
      ClusterAlertTableService
    ]);

  function ClusterAlertTableService($filter, SFTableService, DataService) {
    var columns = getColumns(),
      service = new SFTableService(listAlertsByCluster, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getColumns() {
      return [
        {key: 'id', label: 'Alert ID', format: {filter: 'aiqNumber', args: [0, true]}},
        {key: 'created', label: 'Alert Triggered', width: 200, format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
        {key: 'lastNotified', label: 'Last Notified', width: 200, format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
        {key: 'isResolved', label: 'Resolved', width: 120, format: {filter: 'tableBadgeBoolean'}},
        {key: 'severity', label: 'Severity', width: 120, format: {filter: 'tableBadgeAlertSeverity'}},
        {key: 'notificationName', label: 'Policy Name'},
        {key: 'value', label: 'Alert Value'},
        {key: 'destinationEmail', label: 'Destination'},
        {key: 'policyDescription', label: 'Alert Condition'}
      ];
    }

    function listAlertsByCluster() {
      return DataService.callAPI('ListAlertsByCluster', {clusterID: service.selectedClusterID})
        .then(function(response) {
          return response.alerts.map(function(alert) {
            alert.notificationName = alert.notification && alert.notification.notificationName || '';
            alert.destinationEmail = alert.notification && alert.notification.destinationEmail || '';
            alert.policyDescription = alert.notification && $filter('alert')(alert.notification.notificationFields, 'condition') || '';
            return alert;
          });
        });
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID);
    }
  }
})();
