class ArchivedClustersController {
  public service;

  static $inject = [ 'ArchivedClustersService' ];
  constructor(private ArchivedClustersService) {
    this.service = this.ArchivedClustersService;
  };
}

export const ArchivedClustersComponent = {
  bindings: {
     restoreAuthorization: '<',
   },
 template: require('./archived-clusters.tpl.html'),
  controller: ArchivedClustersController,
};
