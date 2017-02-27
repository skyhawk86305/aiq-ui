(function () {
  'use strict';

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
        .then(function(response) { return response.data; });
    }

    function update(clusterID, volumeID) {
      service.selectedClusterID = parseInt(clusterID, 10);
      service.selectedVolumeID = parseInt(volumeID, 10);
    }
  }
})();
