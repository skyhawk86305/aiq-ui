(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('UsedSpaceGraphsService', [
      '$filter',
      'DataService',
      'SFGraphTimeSeriesService',
      UsedSpaceGraphsService
    ]);

  function UsedSpaceGraphsService($filter, DataService, SFGraphTimeSeriesService) {
    var service = new SFGraphTimeSeriesService(function(params) {
      params.clusterID = this.selectedClusterID;
      params.start = params.start.toISOString();
      params.end = params.end.toISOString();
      params.res = $filter('graphResolution')(params.resolution, 'usedSpace');

      return DataService.callGraphAPI('usedSpace', params)
        .then(function(response) { return response.data; });
    });

    service.selectedClusterID = null;
    service.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return service;
  }
})();
