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
    /*jshint validthis:true*/
    var self,
      columns =  getColumns();

    self = new SFTableService(listAlertsByCluster, columns, false);
    self.selectedClusterID = null;
    self.update = update;
    return self;

    /**********************************/

    function getColumns() {
      return [
        {key: 'created', label: 'Alert Triggered', width: 200, format: {filter: 'aiqData', params: {type: 'date'}}},
        {key: 'lastNotified', label: 'Last Notified', width: 200, format: {filter: 'aiqData', params: {type: 'date'}}},
        {key: 'isResolved', label: 'Resolved', width: 120, format: {filter: 'booleanDataBlock'}},
        {key: 'severity', label: 'Severity', width: 120, filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'alertSeverityDataBlock'}},
        {key: 'notificationName', label: 'Policy Name', filter: SFFilterComparators.STRING_DEFAULT},
        {key: 'value', label: 'Alert Value', filterComparators: SFFilterComparators.STRING_DEFAULT},
        {key: 'destinationEmail', label: 'Destination', filterComparators:SFFilterComparators.STRING_DEFAULT},
        {key: 'policyDescription', label: 'Alert Condition', filterComparators:SFFilterComparators.STRING_DEFAULT}
      ];
    }

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

    function update(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    }
  }
})();
