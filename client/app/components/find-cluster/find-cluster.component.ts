import * as _ from 'lodash';

class FindClusterController {
  public loading = false;
  public error: string;

  static $inject = [ '$route', '$location', 'DataService' ];
  constructor(private $route, private $location, private DataService) {}

  $onInit() {
    const clusterUUID = this.$route.current.pathParams.clusterUUID;
    const requestedRoute = this.$route.current.pathParams.requestedRoute;

    if (!clusterUUID) {
      this.error = 'NoUUIDProvided';
    }
    this.loading = true;
    return this.DataService.callAPI('FindCluster', { clusterUUID })
      .then( ({ clusterID }) => {
        this.$location.path(`/cluster/${clusterID}/${requestedRoute}`);
      })
      .catch( err => {
        if (err.name === 'NoSuchClusterFoundFault') {
          this.error = 'ClusterNotFound';
          return;
        }
        if (err.name === 'ClusterNotAvailableFault') {
          this.error = 'ClusterPermissionDenied';
          return;
        }
        this.error = 'FindClusterFailed';
      })
      .then( () => {
        this.loading = false;
      });
  }
}

export const FindClusterComponent = {
  template: require('./find-cluster.tpl.html'),
  controller: FindClusterController,
};
