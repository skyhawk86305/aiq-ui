(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('VolumeDetailsService', [
      'DataService',
      VolumeDetailsService
    ]);

  function VolumeDetailsService(DataService) {
    this.clusterID = null;
    this.volumeID  = null;

    return {
      setVolume(clusterID: number, volumeID: number) {
        this.clusterID = clusterID;
        this.volumeID  = volumeID;
      },

      getVolume() {
        return DataService.callGuzzleAPI(this.clusterID, 'ListActiveVolumes')
          .then(response => {
            return response.volumes.find(volume => {
              return volume.volumeID === this.volumeID;
            });
          });
      },

      getVolumeStats() {
        return DataService.callGuzzleAPI(this.clusterID, 'ListVolumeStatsByVolume')
          .then(response => {
            return response.volumeStats.find(volume => {
              return volume.volumeID === this.volumeID;
            });
          });
      },

      getSnapshots() {
        return DataService.callGuzzleAPI(this.clusterID, 'ListSnapshots')
          .then(response => {
            return (response.snapshots.map(snapshot => {
              if (snapshot.volumeID === this.volumeID) {
                return snapshot;
              };
            }).filter(function(snapshot) {
              if (snapshot) {
                return snapshot;
              }
            }));
          });
      },

      getAverageVolumePerformance() {
        const now = Date.now(),
          params = {
            clusterID:  this.clusterID,
            volumeID:   this.volumeID,
            start:      new Date(now - 1800000),
            end:        new Date(now),
            resolution: 60
          };
        let averageVolumePerformance = {
          iops:       null,
          throughput: null,
          latency:    null
        };
        return DataService.callGraphAPI('performance', params)
          .then(response => {
            const length = response.data.timestamps.length;
            averageVolumePerformance.iops       = response.data.totalOpsPerSec.reduce( ( p, c )   => p + c, 0 ) / length;
            averageVolumePerformance.throughput = response.data.totalBytesPerSec.reduce( ( p, c ) => p + c, 0 ) / length;
            averageVolumePerformance.latency    = response.data.latencyUSec.reduce( ( p, c )      => p + c, 0 ) / length;
            return averageVolumePerformance;
          });
      }
    };
  };
})();

