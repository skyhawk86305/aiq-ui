(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('clusterSelect', {
      template: require('./cluster-select.tpl.html'),
      controller: [
        '$rootScope',
        '$filter',
        '$location',
        '$routeParams',
        'ClusterSelectService',
        ClusterSelectController
      ]
    });

  function ClusterSelectController($rootScope, $filter, $location, $routeParams, ClusterSelectService) {
    let self = this,
        rawClusters = [],
        rawRecentlyViewed: Array<any> = [];
    self.clusters = [];
    self.recentlyViewed = [];
    self.filterInput = '';
    self.clusterSelect = ClusterSelectService;

    // Populate list of clusters and set the cached selected cluster using clusterID from route params
    self.init = function() {
      self.refresh().then(function() {
        let clusterFromRoute = rawClusters.filter(function(cluster) {
          return cluster.clusterID && cluster.clusterID.toString() === $routeParams.clusterID;
        });
        if (clusterFromRoute.length) {
          updateSelectedCluster(clusterFromRoute[0]);
        }
      });
    };

    self.$onDestroy = $rootScope.$on('$routeChangeSuccess', () => {
      if ($location.path() !== '/login') self.init();
    });

    // Re-populate the list of clusters to select from
    self.refresh = function() {
      self.state = 'loading';
      return self.clusterSelect.getClusters()
        .then(function(clusters) {
          self.state = 'loaded';
          rawClusters = clusters;
          self.filterClusters();
        })
        .catch(function(error) {
          self.state = 'error';
          self.errorMsg = error;
        });
    };

    self.filterClusters = function() {
      self.clusters = $filter('orderBy')($filter('toArray')($filter('groupBy')($filter('clusterSelect')(rawClusters, self.filterInput), 'customerName'), true), '$key');
      self.recentlyViewed = $filter('clusterSelect')(rawRecentlyViewed, self.filterInput);
    };

    // Update the cached selected cluster and navigate to the new cluster-specific route
    self.select = function(cluster) {
      let currentPath = $location.path(),
          defaultPath = '/reporting/overview',
          onClusterPath = currentPath.indexOf('/cluster/') >= 0,
          newPath = onClusterPath ? currentPath.replace(/\/cluster\/([0-9]*)/, '') : defaultPath;

      updateSelectedCluster(cluster);
      $location.path('/cluster/' + cluster.clusterID + newPath);
    };

    function updateSelectedCluster(cluster) {
      let index = rawRecentlyViewed.findIndex(function(aCluster) {
        return aCluster.clusterID === cluster.clusterID;
      });

      // deduplicate and push to front of recently viewed array
      if (index >= 0) { rawRecentlyViewed.splice(index, 1); }
      rawRecentlyViewed.unshift(cluster);
      // update the selected cluster in the display and navbar hrefs
      self.clusterSelect.updateSelectedCluster(cluster);
    }

    self.init();
  }
})();
