(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('AlertHistoryTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      '$filter',
      AlertHistoryTableService
    ]);

  function AlertHistoryTableService(SFTableService, SFFilterComparators, DataService, $filter) {
    var listAlerts = function() {
      return DataService.callAPI('ListAlerts')
        .then(function(response) {
          return response.alerts.map(function(history) {
            history.notificationName = history.notification && history.notification.notificationName || '';
            history.destinationEmail = history.notification && history.notification.destinationEmail || '';
            history.policyDescription = history.notification && $filter('alert')(history.notification.notificationFields, {type: 'condition'}) || '';

            return history;
          });
        });
    };

    var columns = [
      {key: 'id', label: 'Alert ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'number', args: [0, true]}},
      {key: 'created', label: 'Alert Triggered', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
      {key: 'lastNotified', label: 'Last Notification', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
      {key: 'isResolved', label: 'Resolved', format: {filter: 'boolean', args:['Yes', 'No']}},
      {key: 'resolved', label: 'Resolution Time', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
      {key: 'notificationName', label: 'Alert Policy Name', filter: SFFilterComparators.STRING_DEFAULT},
      {key: 'severity', label: 'Alert Severity', filterComparators: SFFilterComparators.STRING_DEFAULT},
      {key: 'value', label: 'Alert Value', filterComparators: SFFilterComparators.STRING_DEFAULT},
      {key: 'destinationEmail', label: 'Destination', filterComparators:SFFilterComparators.STRING_DEFAULT},
      {key: 'customerName', label: 'Customer', filterComparators:SFFilterComparators.STRING_DEFAULT},
      {key: 'clusterName', label: 'Cluster', filterComparators:SFFilterComparators.STRING_DEFAULT},
      {key: 'policyDescription', label: 'Alert Condition', filterComparators:SFFilterComparators.STRING_DEFAULT}
    ];

    return new SFTableService(listAlerts, columns, false);
  }
})();
