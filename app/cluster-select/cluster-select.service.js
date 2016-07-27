(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ClusterSelectService', [
      '$q',
      'DataService',
      ClusterSelectService
    ]);

  function ClusterSelectService($q, DataService) {
    var self = this;
    self.clusters = [];
    self.selectedCluster = null;

    self.getClusters = function() {
      var deferred = $q.defer();
      DataService.callAPI('ListActiveClusters', {components: ['clusterVersionInfo', 'clusterInfo']})
        .then(function(response) {
          var clusters = response.clusters || [];

          self.clusters = clusters.map(function(cluster) {
            if (!cluster.clusterName) {
              cluster.clusterName = 'Unnamed cluster';
              cluster.isUnnamed = true;
            }

            cluster.uuid = cluster.clusterInfo && cluster.clusterInfo.uuid || null;
            cluster.apiVersion = cluster.clusterVersionInfo && cluster.clusterVersionInfo.clusterAPIVersion || null;

            return cluster;
          });
          deferred.resolve(self.clusters);
        })
        .catch(function(error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    // selectedCluster is used for display in the cluster select-component to build navbar-component hrefs
    self.updateSelectedCluster = function(cluster) {
      self.selectedCluster = cluster;
    };
  }
})();
