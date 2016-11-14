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
    var self = new SFGraphTimeSeriesService(getClusterPerformance);

    self.selectedClusterID = null;
    self.update = update;
    return self;

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
