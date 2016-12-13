(function () {
    'use strict';
    angular
        .module('aiqUi')
        .service('EfficiencyGraphsService', [
        'DataService',
        'SFGraphTimeSeriesService',
        EfficiencyGraphsService
    ]);
    function EfficiencyGraphsService(DataService, SFGraphTimeSeriesService) {
        var service = new SFGraphTimeSeriesService(getClusterEfficiency);
        service.selectedClusterID = null;
        service.update = update;
        return service;
        /**********************************/
        function getClusterEfficiency(params) {
            params.clusterID = service.selectedClusterID;
            return DataService.callGraphAPI('efficiency', params)
                .then(function (response) { return response.data; });
        }
        function update(clusterID) {
            service.selectedClusterID = parseInt(clusterID);
        }
    }
})();
//# sourceMappingURL=efficiency-graphs.service.js.map