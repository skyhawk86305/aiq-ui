const data = require('../../../../../server/fixtures/default/SupportDashboard');

export class AlertService {
  static $inject = [ '$rootScope', '$uibModal', 'SFTableService', 'SFFilterComparators', 'CustomComparatorsService', 'DataService', '$q', '$timeout'];
  constructor(
    private $rootScope,
    private $uibModal,
    private SFTableService,
    private SFFilterComparators,
    private CustomComparatorsService,
    private DataService,
    private $q,
    private $timeout
  ){
    const columns = [
      { label: 'ID', key:'id', visible:false },
      { label: 'Date', key: 'date' },
      { label: 'Alert', filterComparators:SFFilterComparators.STRING_DEFAULT, key: 'alert' },
      { label: 'Alert Type', filterComparators:SFFilterComparators.STRING_DEFAULT, key: 'alertType' },
      { label: 'Total Alerts',  filterComparators:SFFilterComparators.INTEGER_DEFAULT, key: 'totalAlerts' },
      { label: 'Severity', key: 'severity', filterComparators: CustomComparatorsService.alertSeverityComparators, format: {filter: 'tableBadgeAlertSeverity'} },
      { label: 'Customer', filterComparators:SFFilterComparators.STRING_DEFAULT, key: 'customerName'},
      { label: 'Cluster', filterComparators:SFFilterComparators.STRING_DEFAULT, key: 'clusterName' },
      { label: 'Last Updated', key: 'lastUpdateTime' },
      { label: 'Last Modified By', filterComparators:SFFilterComparators.STRING_DEFAULT, key: 'lastModifiedBy' },
      { label: 'Resolved', filterComparators: CustomComparatorsService.resolvedComparators, key: 'resolved', format: {filter: 'tableBadgeBoolean'}},
      { label: 'Notes', key: 'notes',  filterComparators:SFFilterComparators.STRING_DEFAULT, editable: { required: true}},
      { label: 'Actions' }
    ];

    function getAlerts() {
      return $q((resolve,reject) => {
        resolve(data.result.alerts);
      });
    };
    return new SFTableService(getAlerts, columns, false, 'id');
  }

}
