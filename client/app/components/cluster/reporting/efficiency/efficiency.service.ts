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
        .then( ({ data }) => {
          const newObj = Object.assign({}, data,
            {
              timestamps: data.timestamps.map( value => new Date(value)),
              thinTimesDeDupFactor: data.thinProvisioningFactor.map((value, idx) => value * data.deDuplicationFactor[idx]),
              thinTimesCompressionFactor: data.thinProvisioningFactor.map((value, idx) => value * data.compressionFactor[idx]),
              deDupTimesCompressionFactor: data.deDuplicationFactor.map((value, idx) => value * data.compressionFactor[idx]),
            }
          );
          return Object.assign({}, newObj,
            _(newObj)
              .pick([
                'thinProvisioningFactor', 'deDuplicationFactor', 'compressionFactor', 'efficiencyFactor',
                'thinTimesDeDupFactor', 'thinTimesCompressionFactor', 'deDupTimesCompressionFactor',
              ])
              .mapValues( vals => vals.map( v => v < 0 ? null : v ) ) // remove negatives
              .value(),
          )
        });
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
