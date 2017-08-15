class SupportDashboardOverviewController {
  public service;
  public selectedRows;
  public editAuthorization;
  private data = require('../../../../../server/fixtures/default/SupportDashboard');
  private columns: SFDataTableColumn[] = [
    { label: 'ID', key: 'id', visible: false },
    { label: 'Date', key: 'date' },
    { label: 'Alert', filterComparators: this.SFFilterComparators.STRING_DEFAULT, key: 'alert' },
    { label: 'Alert Type', filterComparators: this.SFFilterComparators.STRING_DEFAULT, key: 'alertType' },
    { label: 'Total Alerts',  filterComparators: this.SFFilterComparators.INTEGER_DEFAULT, key: 'totalAlerts' },
    { label: 'Severity', key: 'severity', filterComparators: this.CustomComparatorsService.alertSeverityComparators, format: { filter: 'tableBadgeAlertSeverity' } },
    { label: 'Customer', filterComparators: this.SFFilterComparators.STRING_DEFAULT, key: 'customerName' },
    { label: 'Cluster', filterComparators: this.SFFilterComparators.STRING_DEFAULT, key: 'clusterName' },
    { label: 'Last Updated', key: 'lastUpdateTime' },
    { label: 'Last Modified By', filterComparators: this.SFFilterComparators.STRING_DEFAULT, key: 'lastModifiedBy' },
    { label: 'Resolved', filterComparators: this.CustomComparatorsService.resolvedComparators, key: 'resolved', format: { filter: 'tableBadgeBoolean' } }
  ];

  static $inject = [ 'SFTableService', '$q', 'SFFilterComparators', 'CustomComparatorsService' ];

  constructor(private SFTableService, private $q, private SFFilterComparators, private CustomComparatorsService) {
    if (this.editAuthorization) {
      this.columns.push({ label: 'Notes', key: 'notes', filterComparators: SFFilterComparators.STRING_DEFAULT, editable: { required: true } });
      this.columns.push({ label: 'Actions', key: 'actions' });
    }
    this.service = new SFTableService(() => this.getAlerts(), this.columns, false, 'id');
  };

  getSelectedRows(rows){
    this.selectedRows = rows;
  }

  getAlerts() {
    return this.$q.resolve(this.data.result.alerts);
  }
}

interface SFDataTableColumn {
  label: string,
  key: string,
  filterComparators?: any,
  visible?: boolean,
  format?: any,
  editable?: any
}

export const SupportDashboardOverviewComponent = {
  template: require('./overview.tpl.html'),
  controller: SupportDashboardOverviewController,
  bindings: {
    editAuthorization: '<',
  },
};
