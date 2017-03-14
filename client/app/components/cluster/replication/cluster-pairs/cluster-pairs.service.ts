(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('ClusterPairsService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      ClusterPairsService
    ]);

  function ClusterPairsService(SFTableService, SFFilterComparators, DataService) {
    const columns = [
      { label: 'Cluster Pair ID', key: 'clusterPairID', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Remote Cluster Name', key: 'clusterName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Remote MVIP', key: 'mvip', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Replicating Volumes', key: 'replicatingVolumes', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Status', key: 'status', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'UUID', key: 'clusterPairUUID', filterComparators: SFFilterComparators.STRING_DEFAULT },
    ];

    function listClusterPairs() {
      return DataService.callGuzzleAPIs(this.selectedClusterID, 'ListClusterPairs', 'ListActivePairedVolumes')
        .then( ({ clusterPairs = [], volumes = [] }) => {
          const volumePairCounts = _(volumes).flatMap('volumePairs').countBy('clusterPairID').value();
          return clusterPairs.map( clusterPair => {
            const replicatingVolumes = volumePairCounts[clusterPair.clusterPairID];
            return Object.assign({}, clusterPair, { replicatingVolumes });
          });
        });
    }

    const service = new SFTableService(listClusterPairs, columns);
    service.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID, 10);
    };
    return service;
  }

})();
