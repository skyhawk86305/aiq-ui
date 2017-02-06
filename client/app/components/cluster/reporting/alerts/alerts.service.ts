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
    let columns = getColumns(),
      service = new SFTableService(listAlertsByCluster, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getColumns() {
      return [
        {key: 'id', label: 'Alert ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true]}},
        {key: 'created', label: 'Alert Triggered', width: 190, format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
        {key: 'lastNotified', label: 'Last Notified', width: 190, format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
        {key: 'isResolved', label: 'Resolved', width: 160, filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'tableBadgeBoolean'}},
        {key: 'severity', label: 'Severity', width: 160, filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'tableBadgeAlertSeverity'}},
        {key: 'notificationName', label: 'Policy Name', filterComparators: SFFilterComparators.STRING_DEFAULT},
        {key: 'value', label: 'Alert Value', width: 200, filterComparators: SFFilterComparators.STRING_DEFAULT},
        {key: 'destinationEmail', label: 'Destination', filterComparators: SFFilterComparators.STRING_DEFAULT},
        {key: 'policyDescription', label: 'Alert Condition', filterComparators: SFFilterComparators.STRING_DEFAULT}
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
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
