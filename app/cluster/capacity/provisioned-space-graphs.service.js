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
    var service = new SFGraphTimeSeriesService(function(params) {
      params.clusterID = this.selectedClusterID;
      params.start = params.start.toISOString();
      params.end = params.end.toISOString();
      params.res = $filter('graphResolution')(params.resolution, 'provisionedSpace');

      return DataService.callGraphAPI('provisionedSpace', params)
        .then(function(response) { return response.data; });
    });

    service.selectedClusterID = null;
    service.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return service;
  }
})();
