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
    var listAlerts = function() {
      return DataService.callAPI('ListNotifications')
        .then(function(response) {
          return response.notifications.map(function(policy) {
            policy.policyDescription = $filter('alert')(policy.notificationFields, {type: 'condition'});

            return policy;
          });
        });
    };

    var columns = [
      {key: 'notificationName', label: 'Alert Policy Name', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'destinationEmail', label: 'Destination', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'notificationSeverity', label: 'Severity', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'username', label: 'Creator', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'customerName', label: 'Customer', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'clusterName', label: 'Cluster', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'policyDescription', label: 'Alert Condition', filterComparators:SFFilterComparators.STRING_DEFAULT}
    ];

    return new SFTableService(listAlerts, columns, false);
  }
})();
