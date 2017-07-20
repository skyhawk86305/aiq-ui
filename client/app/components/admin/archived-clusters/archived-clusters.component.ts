class ArchivedClustersController {
  public service;

  static $inject = [ 'ArchivedClustersService' ];
  constructor(private ArchivedClustersService) {
    this.service = this.ArchivedClustersService;
  };
}

export const ArchivedClustersComponent = {
  template: require('./archived-clusters.tpl.html'),
  controller: ArchivedClustersController,
};
