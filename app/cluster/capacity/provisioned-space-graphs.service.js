(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ProvisionedSpaceGraphsService', [
      '$filter',
      'DataService',
      'SFGraphTimeSeriesService',
      ProvisionedSpaceGraphsService
    ]);

  function ProvisionedSpaceGraphsService($filter, DataService, SFGraphTimeSeriesService) {
    var getProvisionedSpace = function(params) {
      params.clusterID = this.selectedClusterID;
      params.start = params.start.toISOString();
      params.end = params.end.toISOString();
      params.res = $filter('graphResolution')(params.resolution, 'provisionedSpace');
      params.res = 3600; //TODO: This is currently the only resolution with data in giraffe. Remove later.

      return DataService.callGraphAPI('provisionedSpace', params)
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
