(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('AlertPolicyTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      '$filter',
      AlertPolicyTableService
    ]);

  function AlertPolicyTableService(SFTableService, SFFilterComparators, DataService, $filter) {
    function listAlerts() {
      return DataService.callAPI('ListNotifications')
        .then( response => response.notifications );
    };

    const columns = [
      {key: 'notificationName', label: 'Alert Policy Name', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter: 'string' } },
      {key: 'destinationEmail', label: 'Destination', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter:'string' } },
      {key: 'notificationSeverity', label: 'Severity', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter: 'tableBadgeAlertSeverity' } },
      {key: 'username', label: 'Creator', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter:'string' } },
      {key: 'customerName', label: 'Customer', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter:'string' } },
      {key: 'clusterName', label: 'Cluster', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter: 'string' } },
      {key: 'notificationFields', label: 'Alert Condition', filterComparators:SFFilterComparators.STRING_DEFAULT, format: { filter: 'alert', args: ['condition'] } }
    ];

    return new SFTableService(listAlerts, columns, false);
  }
})();
