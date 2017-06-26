import * as _ from 'lodash';

class ClusterSelectController {
  rawClusters = [];
  rawRecentlyViewed: Array<any> = [];
  clusters = [];
  recentlyViewed = [];
  filterInput = '';
  state: string = null;
  errorMsg: string = null;
  deregisterRouteChangeHandler: () => void;

  static readonly $inject = [
    '$rootScope',
    '$filter',
    '$location',
    '$routeParams',
    'ClusterSelectService',
  ];
  constructor(
    private $rootScope,
    private $filter,
    private $location,
    private $routeParams,
    public clusterSelect
  ) {
    this.deregisterRouteChangeHandler = this.$rootScope.$on('$routeChangeSuccess', () => {
      if (this.$location.path() !== '/login') this.init();
    });
    this.$rootScope.$on('refresh-cluster-select', () => {
      this.refresh();
    });
    this.init();
  }

  $onDestroy() {
    this.deregisterRouteChangeHandler();
  }

  // Populate list of clusters and set the cached selected cluster using clusterID from route params
  init() {
    this.refresh().then( () => {
      const clusterFromRoute = this.rawClusters.filter( cluster => {
        return cluster.id && cluster.id.toString() === this.$routeParams.clusterID;
      });
      if (clusterFromRoute.length) {
        this.updateSelectedCluster(clusterFromRoute[0]);
      }
    });
  }

  // Re-populate the list of clusters to select from
  refresh() {
    this.state = 'loading';
    return this.clusterSelect.getClusters()
      .then( clusters => {
        this.state = 'loaded';
        this.rawClusters = clusters;
        this.filterClusters();
      })
      .catch( error => {
        this.state = 'error';
        this.errorMsg = error;
      });
  }

  filterClusters() {
    this.clusters =
      this.$filter('orderBy')(
        this.$filter('toArray')(
          this.$filter('groupBy')(
            this.$filter('clusterSelect')(
              this.rawClusters,
            this.filterInput),
          'customerName'),
        true),
      '$key');
    this.recentlyViewed = this.$filter('clusterSelect')(this.rawRecentlyViewed, this.filterInput);
  };

  // Update the cached selected cluster and navigate to the new cluster-specific route
  select(cluster) {
    const currentPath = this.$location.path();
    const defaultPath = '/reporting/overview';
    const onClusterPath = currentPath.indexOf('/cluster/') >= 0;
    const newPath = onClusterPath ? currentPath.replace(/\/cluster\/([0-9]*)/, '') : defaultPath;

    this.updateSelectedCluster(cluster);
    if (currentPath.indexOf('/volume/') >= 0) {
      this.$location.path('/cluster/' + cluster.id + '/volumes/');
    } else {
      this.$location.path('/cluster/' + cluster.id + newPath);
    }
  };

  updateSelectedCluster(cluster) {
    const index = _.findIndex(this.rawRecentlyViewed, ['id', cluster.id]);

    // deduplicate and push to front of recently viewed array
    if (index >= 0) { this.rawRecentlyViewed.splice(index, 1); }
    this.rawRecentlyViewed.unshift(cluster);
    // update the selected cluster in the display and navbar hrefs
    this.clusterSelect.updateSelectedCluster(cluster);
  }
}

export const ClusterSelectComponent = {
  template: require('./cluster-select.tpl.html'),
  controller: ClusterSelectController,
}
