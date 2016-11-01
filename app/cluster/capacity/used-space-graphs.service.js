(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('UsedSpaceGraphsService', [
      '$http',
      'SFGraphTimeSeriesService',
      'DataService',
      UsedSpaceGraphsService
    ]);

  function UsedSpaceGraphsService($http, SFGraphTimeSeriesService) {
    var getUsedSpace = function(params) {
      var start = params.start.toISOString(),
          end = params.end.toISOString(),
          res = params.resolution / 1000;

      /*if(res <= 60) {
        res = 60;
      } else if (res > 60 && res <=3600) {
        res = 3600;
      } else if (res > 3600 && res <= 43200) {
        res = 43200;
      } else if (res > 43200 && res <= 86400) {
        res = 86400;
      } else {
        res = 2592000;
      }*/

      res = 3600;

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
