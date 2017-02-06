(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ClusterSelectService', [
      'DataService',
      ClusterSelectService
    ]);

  function ClusterSelectService(DataService) {
    let self = this;
    self.clusters = [];
    self.selectedCluster = null;

    self.getClusters = function() {
      return DataService.callAPI('ListActiveClusters', {components: ['clusterVersionInfo', 'clusterInfo']})
        .then(function(response) {
          let clusters = response.clusters || [];

          self.clusters = clusters.map(function(cluster) {
            if (!cluster.clusterName) {
              cluster.clusterName = 'Unnamed cluster';
              cluster.isUnnamed = true;
            }

            cluster.uuid = cluster.clusterInfo && cluster.clusterInfo.uuid || null;
            cluster.apiVersion = cluster.clusterVersionInfo && cluster.clusterVersionInfo.clusterAPIVersion || null;

            return cluster;
          });
          return self.clusters;
        });
    };

    // selectedCluster is used for display in the cluster select-component to build navbar-component hrefs
    self.updateSelectedCluster = function(cluster) {
      self.selectedCluster = cluster;
    };
  }
})();
