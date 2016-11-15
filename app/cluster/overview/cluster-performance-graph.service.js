(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ClusterPerformanceGraphService', [
      'DataService',
      'SFGraphTimeSeriesService',
      ClusterPerformanceGraphService
    ]);


  function ClusterPerformanceGraphService(DataService,SFGraphTimeSeriesService) {
    /*jshint validthis:true*/
    var self = new SFGraphTimeSeriesService(getClusterPerformance);

    self.selectedClusterID = null;
    self.update = update;
    return self;

    /**********************************/

    function getClusterPerformance(params) {
      params.clusterID = this.selectedClusterID;

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
