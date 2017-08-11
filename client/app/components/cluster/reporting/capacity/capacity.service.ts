(function () {
  'use strict';

  const _ = require('lodash');

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
        .then( ({ data }) => Object.assign({}, data,
         { timestamps: data.timestamps.map( value => new Date(value)) },
          _(data)
            .pick([
              'maxUsedSpace', 'usedSpace',
              'maxUsedMetadataSpace', 'usedMetadataSpace',
              'maxProvisionedSpace', 'provisionedSpace',
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
