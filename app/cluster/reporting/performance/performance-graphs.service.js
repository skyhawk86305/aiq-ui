(function () {
    'use strict';
    angular
        .module('aiqUi')
        .service('PerformanceGraphsService', [
        'DataService',
        'SFGraphTimeSeriesService',
        PerformanceGraphsService
    ]);
    function PerformanceGraphsService(DataService, SFGraphTimeSeriesService) {
        var service = new SFGraphTimeSeriesService(getClusterPerformance);
        service.selectedClusterID = null;
        service.update = update;
        return service;
        /**********************************/
        function getClusterPerformance(params) {
            params.clusterID = service.selectedClusterID;
            return DataService.callGraphAPI('performance', params)
                .then(function (response) { return response.data; });
        }
        function update(clusterID) {
            service.selectedClusterID = parseInt(clusterID);
        }
    }
})();
//# sourceMappingURL=performance-graphs.service.js.map