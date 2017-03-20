(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('VolumePairsService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      '$q',
      VolumePairsService
    ]);

  function VolumePairsService(SFTableService, SFFilterComparators, DataService, $q) {
    const columns = [
      { label: 'Volume ID', key: 'volumeID', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Account ID', key: 'accountID', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Volume Status', key: 'volumeStatus', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Replication Mode', key: 'replicationMode', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Direction', key: 'direction', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Async Delay', key: 'asyncDelay', filterComparators: SFFilterComparators.STRING_DEFAULT, format: { filter: 'string' } },
      { label: 'Remote Cluster', key: 'remoteClusterName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Remote Volume ID', key: 'remoteVolumeID', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
    ];

    function listClusterPairs() {
      return $q
        .all([
          DataService.callAPI('ListActivePairedVolumes', { clusterID: service.selectedClusterID }),
          DataService.callGuzzleAPI(service.selectedClusterID, 'ListClusterPairs'),
        ])
        .then( ([{ volumes = [] }, { clusterPairs = [] }]) =>
          _.flatMap(volumes, volume => {
            const { volumeID, accountID, volumePairs } = volume;
            return volumePairs.map( vp => {
              const clusterPair = _.find(clusterPairs, ['clusterPairID', vp.clusterPairID]);
              return Object.assign({}, {
                volumeID,
                accountID,
                volumeStatus: _.get(volume, 'status'),
                replicationMode: _.get(vp, 'remoteReplication.mode'),
                direction: volume.access === 'replicationTarget' ? 'Target' : 'Source',
                asyncDelay: _.get(volume, 'volumeStats.asyncDelay'),
                remoteClusterName: _.get(clusterPair, 'clusterName'),
                remoteVolumeID: vp.remoteVolumeID,
              });
            });
          })
        );
    }

    const service = new SFTableService(listClusterPairs, columns);
    service.selectedClusterID = null;
    service.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID, 10);
    };
    return service;
  }

})();
