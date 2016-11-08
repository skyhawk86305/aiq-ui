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
    var getUsedSpace = function(params) {
      params.clusterID = this.selectedClusterID;
      params.start = params.start.toISOString();
      params.end = params.end.toISOString();
      params.res = $filter('graphResolution')(params.resolution, 'provisionedSpace');
      params.res = 3600; //TODO: This is currently the only resolution with data in giraffe. Remove later.

      return DataService.callGraphAPI('usedSpace', params)
        .then(function(response) {
          var filteredResponse = {};

          filteredResponse.timestampSec = response.data.timestampSec.map(function(seconds) {
            return new Date(seconds * 1000).toISOString();
          });
          filteredResponse.usedSpace = response.data.usedSpace.map(function(bytes) {
            return parseFloat((bytes/1000000000000).toFixed(2));
          });
          filteredResponse.maxUsedSpace = response.data.maxUsedSpace.map(function(bytes) {
            return parseFloat((bytes/1000000000000).toFixed(2));
          });
          filteredResponse.usedMetadataSpace = response.data.usedMetadataSpace.map(function(bytes) {
            return parseFloat((bytes/1000000000000).toFixed(2));
          });
          filteredResponse.maxUsedMetadataSpace = response.data.maxUsedMetadataSpace.map(function(bytes) {
            return parseFloat((bytes/1000000000000).toFixed(2));
          });

          return filteredResponse;
        });
    };

    var usedGraphsService = new SFGraphTimeSeriesService(getUsedSpace);

    usedGraphsService.selectedClusterID = null;
    usedGraphsService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return usedGraphsService;
  }
})();
