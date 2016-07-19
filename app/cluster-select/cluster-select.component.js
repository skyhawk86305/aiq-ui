(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('clusterSelect', {
      templateUrl: 'cluster-select/cluster-select.tpl.html',
      controller: ['$state', 'ClusterSelectService', ClusterSelectController]
    });

  function ClusterSelectController($state, ClusterSelectService) {
    var self = this;
    self.clusters = [];
    self.recentlyViewed = [];
    self.selectedClusterDisplay = ClusterSelectService.selectedCluster;

    self.refresh = function() {
      self.state = 'loading';
      ClusterSelectService.getClusters()
        .then(function(clusters) {
          self.state = 'loaded';
          self.clusters = clusters;
        })
        .catch(function(error) {
          self.state = 'error';
          self.errorMsg = error;
        });
    };

    self.select = function(cluster) {
      self.selectedClusterDisplay = cluster;
      updateRecentlyViewed();
      ClusterSelectService.updateSelectedCluster(cluster);
      $state.go('cluster');

      function updateRecentlyViewed() {
        var index = self.recentlyViewed.indexOf(cluster);
        if (index >= 0) {
          self.recentlyViewed.splice(index, 1);
        }
        self.recentlyViewed.unshift(cluster);
      }
    };

    self.refresh();
  }
})();
