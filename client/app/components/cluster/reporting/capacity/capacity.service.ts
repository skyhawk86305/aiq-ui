(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('CapacityGraphsService', [
      'DataService',
      'SFGraphTimeSeriesService',
      CapacityGraphsService
    ]);

  function CapacityGraphsService(DataService, SFGraphTimeSeriesService) {
    let service = new SFGraphTimeSeriesService(getClusterCapacity);
    service.selectedClusterID = null;
    service.update = update;
    return service;

    function getClusterCapacity(params) {
      params.clusterID = service.selectedClusterID;
      return DataService.callGraphAPI('capacity', params)
        .then(function(response) { return response.data; });
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
