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
    let listAlerts = function() {
      return DataService.callAPI('ListNotifications')
        .then(function(response) {
          return response.notifications.map(function(policy) {
            policy.policyDescription = $filter('alert')(policy.notificationFields, 'condition');
            return policy;
          });
        });
    };

    let columns = [
      {key: 'notificationName', label: 'Alert Policy Name', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'destinationEmail', label: 'Destination', format: {filter:'string'}},
      {key: 'notificationSeverity', label: 'Severity', format: {filter:'string'}},
      {key: 'username', label: 'Creator', format: {filter:'string'}},
      {key: 'customerName', label: 'Customer', format: {filter:'string'}},
      {key: 'clusterName', label: 'Cluster', format: {filter:'string'}},
      {key: 'policyDescription', label: 'Alert Condition', filterComparators:SFFilterComparators.STRING_DEFAULT}
    ];

    return new SFTableService(listAlerts, columns, false);
  }
})();
