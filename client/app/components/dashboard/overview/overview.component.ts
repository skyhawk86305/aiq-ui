class DashboardOverviewController {
  static $inject = [ 'ClusterService' ];
  constructor(private ClusterService) {}
}

export const DashboardOverviewComponent = {
  template: require('./overview.tpl.html'),
  controller: DashboardOverviewController,
};
