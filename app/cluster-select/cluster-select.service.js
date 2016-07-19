(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ClusterSelectService', [
      '$q',
      '$rootScope',
      'DataService',
      ClusterSelectService
    ]);

  function ClusterSelectService($q, $rootScope, DataService) {
    var self = this;
    self.clusters = [];
    self.selectedCluster = null;

    self.getClusters = function() {
      var deferred = $q.defer();
      DataService.callAPI('ListActiveClusters')
        .then(function(response) {
          self.clusters = response.clusters;
          deferred.resolve(self.clusters);
        })
        .catch(function(error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    self.updateSelectedCluster = function(cluster) {
      self.selectedCluster = cluster;
      $rootScope.$broadcast('selectedClusterUpdated');
    };
  }
})();
