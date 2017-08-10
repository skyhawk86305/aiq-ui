(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('VolumePerformanceGraphsService', [
      'DataService',
      'SFGraphTimeSeriesService',
      VolumePerformanceGraphsService
    ]);

  function VolumePerformanceGraphsService(DataService, SFGraphTimeSeriesService) {
    let service = new SFGraphTimeSeriesService(getClusterPerformance);
    service.selectedClusterID = null;
    service.selectedVolumeID = null;
    service.update = update;
    return service;

    /**********************************/

    function getClusterPerformance(params) {
      params.clusterID = service.selectedClusterID;
      params.volumeID  = service.selectedVolumeID;
      return DataService.callGraphAPI('performance', params)
        .then( ({ data }) => Object.assign({}, data,
          { timestamps: data.timestamps.map(val => new Date(val)) },
          _(data)
            .pick([
              'readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec',
              'readOpsPerSec', 'writeOpsPerSec', 'totalOpsPerSec',
              'readLatencyUSec', 'writeLatencyUSec', 'latencyUSec',
              'clientQueueDepth',
              'averageIOPSize',
              'usedCapacity','provisionedCapacity',
            ])
            .mapValues( vals => vals.map( v => v < 0 ? null : v ) ) // remove negatives
            .value()
        ));
    }

    function update(clusterID, volumeID) {
      service.selectedClusterID = parseInt(clusterID, 10);
      service.selectedVolumeID = parseInt(volumeID, 10);
    }
  }
})();
