(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('AlertHistoryTableService', [
      'SFTableService',
      'SFFilterComparators',
      'CustomComparatorsService',
      'DataService',
      '$filter',
      AlertHistoryTableService
    ]);

  function AlertHistoryTableService(SFTableService, SFFilterComparators, CustomComparatorsService, DataService, $filter) {

    let listAlerts = function() {
      return DataService.callAPI('ListAlerts')
        .then(function(response) {
          return response.alerts.map(function(history) {
            history.notificationName = history.notification && history.notification.notificationName || '';
            history.destinationEmail = history.notification && history.notification.destinationEmail || '';
            history.policyDescription = history.notification && $filter('alert')(history.notification.notificationFields, 'condition') || '';
            return history;
          });
        });
    };

    let columns = [
      {key: 'id', label: 'Alert ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true]}},
      {key: 'created', label: 'Alert Triggered', format: {filter: 'aiqDate'}},
      {key: 'lastNotified', label: 'Last Notification', format: {filter: 'aiqDate'}},
      {key: 'isResolved', label: 'Resolved', filterComparators: CustomComparatorsService.resolvedComparators, format: {filter: 'tableBadgeBoolean'}},
      {key: 'resolved', label: 'Resolution Time', format: {filter: 'aiqDate'}},
      {key: 'notificationName', label: 'Alert Policy Name', filterComparators: SFFilterComparators.STRING_DEFAULT},
      {key: 'severity', label: 'Alert Severity', filterComparators: CustomComparatorsService.alertSeverityComparators, format: {filter: 'tableBadgeAlertSeverity'}},
      {key: 'value', label: 'Alert Value', filterComparators: SFFilterComparators.STRING_DEFAULT},
      {key: 'destinationEmail', label: 'Destination', filterComparators: SFFilterComparators.STRING_DEFAULT},
      {key: 'customerName', label: 'Customer', filterComparators: SFFilterComparators.STRING_DEFAULT},
      {key: 'clusterName', label: 'Cluster', filterComparators: SFFilterComparators.STRING_DEFAULT},
      {key: 'policyDescription', label: 'Alert Condition', filterComparators: SFFilterComparators.STRING_DEFAULT}
    ];

    return new SFTableService(listAlerts, columns, false);
  }
})();
