(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('UsedSpaceGraphsService', [
      '$http',
      '$filter',
      'SFGraphTimeSeriesService',
      UsedSpaceGraphsService
    ]);

  function UsedSpaceGraphsService($http, $filter, SFGraphTimeSeriesService) {
    var getUsedSpace = function(params) {
      var start = params.start.toISOString(),
        end = params.end.toISOString(),
        res = $filter('graphResolution')(params.resolution, 'usedSpace');

      res = 3600; //TODO: This is currently the only resolution with data in giraffe. Remove later.

      return $http.get('/graph/cluster/'+this.selectedClusterID+'/usedSpace?start='+start+'&end='+end+'&resolution='+res)
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
