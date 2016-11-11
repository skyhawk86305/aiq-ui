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
    var srvc = new SFGraphTimeSeriesService(getClusterPerformance);

    srvc.selectedClusterID = null;
    srvc.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };
    return srvc;

    /**********************************/

    function getClusterPerformance(params) {
      /*jshint validthis:true*/
      params.clusterID = this.selectedClusterID;
      params.start = params.start.toISOString();
      params.end = params.end.toISOString();
      params.res = $filter('graphResolution')(params.resolution, 'provisionedSpace');

      return DataService.callGraphAPI('performance', params)
        .then(function(response) {
          return response.data;
        });
    }
  }
})();
