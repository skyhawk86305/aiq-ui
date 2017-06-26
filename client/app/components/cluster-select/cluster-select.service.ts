export class ClusterSelectService {
  clusters = [];
  selectedCluster = null;

  static readonly $inject = [ 'DataService' ];
  constructor(private DataService) {}

  getClusters() {
    return this.DataService.callAPI('ListClusters')
      .then( ({ clusters = [] }) => {
        this.clusters = clusters;
        return this.clusters;
      });
  };

  // selectedCluster is used for display in the cluster select-component to build navbar-component hrefs
  updateSelectedCluster(cluster) {
    this.selectedCluster = cluster;
  };
}
