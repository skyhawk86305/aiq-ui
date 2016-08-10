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
      {key: 'notificationName', label: 'Alert Policy Name', filter: SFFilterComparators.INTEGER_DEFAULT},
      {key: 'destinationEmail', label: 'Destination', format: {filter: 'aiqData', params: {type: 'date'}}},
      {key: 'notificationSeverity', label: 'Severity', format: {filter: 'aiqData', params: {type: 'date'}}},
      {key: 'username', label: 'Creator', format: {filter: 'aiqData', params: {type: 'boolean'}}},
      {key: 'customerName', label: 'Customer', format: {filter: 'aiqData', params: {type: 'date'}}},
      {key: 'clusterName', label: 'Cluster', format: {filter: 'aiqData', params: {type: 'date'}}},
      {key: 'policyDescription', label: 'Alert Condition', filter:SFFilterComparators.STRING_DEFAULT}
    ];

    return new SFTableService(listAlerts, columns, false);
  }
})();
