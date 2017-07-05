(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('AlertPolicyTableService', [
      'SFTableService',
      'SFFilterComparators',
      'CustomComparatorsService',
      'DataService',
      AlertPolicyTableService
    ]);

  function AlertPolicyTableService(SFTableService, SFFilterComparators, CustomComparatorsService, DataService) {
    const columns = [
      {key: 'notificationName', label: 'Alert Policy Name', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter: 'string' } },
      {key: 'destinationEmail', label: 'Destination', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter:'string' } },
      {key: 'notificationSeverity', label: 'Severity', filterComparators: CustomComparatorsService.alertSeverityComparators, format: { filter: 'tableBadgeAlertSeverity' } },
      {key: 'username', label: 'Creator', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter:'string' } },
      {key: 'customerName', label: 'Customer', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter:'string' } },
      {key: 'clusterName', label: 'Cluster', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter: 'string' } },
      {key: 'notificationFields', label: 'Alert Condition', filterComparators:SFFilterComparators.STRING_DEFAULT, format: { filter: 'alert', args: ['condition'] } },
      {key: 'deletePolicy', label: 'Delete Policy', width: 100, sortable: false, nonData: true }
    ];

    return new SFTableService(listAlerts, columns, false);

    /*****************************************/

    function listAlerts() {
      return DataService.callAPI('ListNotifications')
        .then( response => {
          if (response.notifications) {
            return response.notifications.map(notification => {
              notification.deletePolicy = `<button id="delete-policy-${notification.notificationID}" ng-click="$emit(\'openModal\', $ctrl.rowCtrl.rowData)" class="delete-policy-button" aria-label="Delete Policy">` +
                '<i class="fa fa-times-circle" aria-hidden="true"</i></button>';
              return Object.assign({}, notification);
            });
          }
        });
    }
  }
})();
