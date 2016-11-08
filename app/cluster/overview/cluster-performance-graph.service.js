(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ClusterPerformanceGraphService', [
      '$http',
      '$filter',
      'SFGraphTimeSeriesService',
      ClusterPerformanceGraphService
    ]);


  function ClusterPerformanceGraphService($http, $filter, SFGraphTimeSeriesService) {
    var getProvisionedSpace = function(params) {
      var start = params.start.toISOString(),
        end = params.end.toISOString(),
        res = $filter('graphResolution')(params.resolution, 'provisionedSpace');
      
      res = 3600; //TODO: This is currently the only resolution with data in giraffe. Remove later.

      return $http.get('/graph/cluster/'+this.selectedClusterID+'/provisionedSpace?start='+start+'&end='+end+'&resolution='+res)
        .then(function(response) {
          var filteredResponse = {};

          filteredResponse.timestampSec = response.data.timestampSec.map(function(seconds) {
            return new Date(seconds * 1000).toISOString();
          });
          filteredResponse.provisionedSpace = response.data.provisionedSpace.map(function(bytes) {
            return parseFloat((bytes/1000000000000).toFixed(2));
          });
          filteredResponse.maxProvisionedSpace = response.data.maxProvisionedSpace.map(function(bytes) {
            return parseFloat((bytes/1000000000000).toFixed(2));
          });

          return filteredResponse;
        });
    };

    var provisionedGraphsService = new SFGraphTimeSeriesService(getProvisionedSpace);

    provisionedGraphsService.selectedClusterID = null;
    provisionedGraphsService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return provisionedGraphsService;
  }
})();
