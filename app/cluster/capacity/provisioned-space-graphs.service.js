(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ProvisionedSpaceGraphsService', [
      '$http',
      'SFGraphTimeSeriesService',
      ProvisionedSpaceGraphsService
    ]);


  function ProvisionedSpaceGraphsService($http, SFGraphTimeSeriesService) {
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

      return $http.get('/graph/cluster/'+this.selectedClusterID+'/provisionedSpace?start='+start+'&end='+end+'&resolution='+res)
        .then(function(response) {
          var filteredResponse = {};

          filteredResponse.timestampSec = response.data.timestampSec.map(function(seconds) {
            return new Date(seconds * 1000).toISOString();
          });
          filteredResponse.provisionedSpace = response.data.provisionedSpace.map(function(bytes) {
            return (bytes/1000000000000).toFixed(2);
          });
          filteredResponse.maxProvisionedSpace = response.data.maxProvisionedSpace.map(function(bytes) {
            return parseFloat((bytes/1000000000000).toFixed(2));
          });

          return filteredResponse;
        });
    };

    var provisionedGraphsService = new SFGraphTimeSeriesService(getUsedSpace);

    provisionedGraphsService.selectedClusterID = null;
    provisionedGraphsService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return provisionedGraphsService;
  }
})();
