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
    var service = new SFGraphTimeSeriesService(function(params) {
      params.clusterID = this.selectedClusterID;
      params.start = params.start.toISOString();
      params.end = params.end.toISOString();
      params.res = $filter('graphResolution')(params.resolution, 'capacity');

      return DataService.callGraphAPI('capacity', params)
        .then(function(response) { return response.data; });
    });

    service.selectedClusterID = null;
    service.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return service;
  }
})();
