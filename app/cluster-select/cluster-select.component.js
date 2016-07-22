(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('clusterSelect', {
      templateUrl: 'cluster-select/cluster-select.tpl.html',
      controller: [
        '$location',
        '$q',
        '$routeParams',
        'ClusterSelectService',
        ClusterSelectController
      ]
    });

  function ClusterSelectController($location, $q, $routeParams, ClusterSelectService) {
    var self = this;
    self.clusters = [];
    self.recentlyViewed = [];
    self.clusterSelect = ClusterSelectService;

    // Populate list of clusters and set the cached selected cluster using clusterID from route params
    self.init = function() {
      self.refresh().then(function() {
        var clusterFromRoute = self.clusters.find(function(cluster) {
          return cluster.clusterID.toString() === $routeParams.clusterID;
        });
        updateSelectedCluster(clusterFromRoute);
      });
    };

    // Re-populate the list of clusters to select from
    self.refresh = function() {
      var deferred = $q.defer();
      self.state = 'loading';
      self.clusterSelect.getClusters()
        .then(function(clusters) {
          self.state = 'loaded';
          self.clusters = clusters;
          deferred.resolve();
        })
        .catch(function(error) {
          self.state = 'error';
          self.errorMsg = error;
          deferred.reject();
        });
      return deferred.promise;
    };

    // Update the cached selected cluster and navigate to the new cluster-specific route
    self.select = function(cluster) {
      var currentPath = $location.path(),
          defaultPath = '/reporting/overview',
          onClusterPath = currentPath.indexOf('#/cluster/') >= 0,
          newPath = onClusterPath ? currentPath.replace(/#\/cluster\/([0-9]*)/, '') : defaultPath;

      updateSelectedCluster(cluster);
      $location.path('/cluster/' + cluster.clusterID + newPath);
    };

    function updateSelectedCluster(cluster) {
      var index = self.recentlyViewed.indexOf(cluster);
      // deduplicate and push to front of recently viewed array
      if (index >= 0) { self.recentlyViewed.splice(index, 1); }
      self.recentlyViewed.unshift(cluster);
      // update the selected cluster in the display and navbar hrefs
      self.clusterSelect.updateSelectedCluster(cluster);
    }

    self.init();
  }
})();
