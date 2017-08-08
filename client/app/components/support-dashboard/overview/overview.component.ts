class SupportDashboardOverviewController {
  public service;
  public selectedRows;
  static $inject = [ 'AlertService' ];
  constructor(private AlertService) {
    this.service = AlertService;
  };

  getSelectedRows(rows){
    this.selectedRows = rows;
  }
}

export const SupportDashboardOverviewComponent = {
  template: require('./overview.tpl.html'),
  controller: SupportDashboardOverviewController,
};
