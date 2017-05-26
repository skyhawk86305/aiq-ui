class UnregisteredClustersController {
  public service;

  static $inject = [ 'UnregisteredClustersService' ];
  constructor(private UnregisteredClustersService) {
    this.service = this.UnregisteredClustersService;
  }
}

export const UnregisteredClustersComponent = {
  template: require('./unregistered-clusters.tpl.html'),
  controller: UnregisteredClustersController,
};
