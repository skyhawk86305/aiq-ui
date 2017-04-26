(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('EfficiencyGraphsService', [
      'DataService',
      'SFGraphTimeSeriesService',
      EfficiencyGraphsService
    ]);

  function EfficiencyGraphsService(DataService, SFGraphTimeSeriesService) {
    let service = new SFGraphTimeSeriesService(getClusterEfficiency);
    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getClusterEfficiency(params) {
      params.clusterID = service.selectedClusterID;
      return DataService.callGraphAPI('capacity', params)
        .then( ({ data }) => Object.assign({}, data,
          _(data)
            .pick([
              'thinProvisioningFactor', 'deDuplicationFactor', 'compressionFactor', 'efficiencyFactor',
            ])
            .mapValues( vals => vals.map( v => v < 0 ? null : v ) ) // remove negatives
            .value()
        ));
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
