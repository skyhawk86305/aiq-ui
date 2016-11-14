(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('CapacityGraphsService', [
      '$filter',
      'DataService',
      'SFGraphTimeSeriesService',
      CapacityGraphsService
    ]);

  function CapacityGraphsService($filter, DataService, SFGraphTimeSeriesService) {
    var service = new SFGraphTimeSeriesService(getClusterCapacity);
    service.selectedClusterID = null;
    service.update = update;
    return service;
    
    /**********************************/
    
    function getClusterCapacity(params) {
      params.clusterID = this.selectedClusterID;
      params.start = params.start.toISOString();
      params.end = params.end.toISOString();
      params.res = $filter('graphResolution')(params.resolution, 'capacity');

      return DataService.callGraphAPI('capacity', params)
        .then(function(response) { return response.data; });
    }

    function update(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    }
  }
})();
