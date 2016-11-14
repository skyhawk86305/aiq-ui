(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ClusterPerformanceGraphService', [
      '$filter',
      'DataService',
      'SFGraphTimeSeriesService',
      ClusterPerformanceGraphService
    ]);


  function ClusterPerformanceGraphService($filter, DataService,SFGraphTimeSeriesService) {
    /*jshint validthis:true*/
    var service = new SFGraphTimeSeriesService(getClusterPerformance);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getClusterPerformance(params) {
      params.clusterID = this.selectedClusterID;
      params.start = params.start.toISOString();
      params.end = params.end.toISOString();
      params.res = $filter('graphResolution')(params.resolution, 'provisionedSpace');

      return DataService.callGraphAPI('performance', params)
        .then(function(response) {
          return response.data;
        });
    }

    function update(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    }
  }
})();
