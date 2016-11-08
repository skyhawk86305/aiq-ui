(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('CapacityUseGraphService', [
      '$http',
      '$filter',
      'SFGraphTimeSeriesService',
      CapacityUseGraphService
    ]);


  function CapacityUseGraphService($http, $filter, SFGraphTimeSeriesService) {
    /*jshint validthis:true*/
    var graphAPICall = getCapacityUse;

    var service = new SFGraphTimeSeriesService(graphAPICall);
    service.selectedClusterID = null;
    service.update = update;

    return service;

    /*********************************
    ********** HELPER FUNCS **********
    *********************************/
    function getCapacityUse(params) {
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
    }

    function update(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    }
  }
})();
