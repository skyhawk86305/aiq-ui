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
      params.res = $filter('graphResolution')(params.resolution, 'usedSpace');
      params.res = 3600; //TODO: This is currently the only resolution with data in giraffe. Remove later.

      return DataService.callGraphAPI('clusterPerformance', params)
        .then(function(response) {
          var filteredResponse = {};
          filteredResponse.timestampSec = response.data.timestampSec.map(function(seconds) {
            return new Date(seconds * 1000).toISOString();
          });
          filteredResponse.iops = response.data.totalOpsPerSec;
          filteredResponse.bandwidth = response.data.totalBytesPerSec.map(function(bytes) {
            return parseFloat((bytes/1000000000000).toFixed(2));
          });
          return filteredResponse;
        });
    }
  }
})();
