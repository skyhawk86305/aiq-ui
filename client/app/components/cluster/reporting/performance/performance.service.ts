(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('PerformanceGraphsService', [
      'DataService',
      'SFGraphTimeSeriesService',
      PerformanceGraphsService
    ]);

  function PerformanceGraphsService(DataService, SFGraphTimeSeriesService) {
    let service = new SFGraphTimeSeriesService(getClusterPerformance);
    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getClusterPerformance(params) {
      params.clusterID = service.selectedClusterID;
      return DataService.callGraphAPI('performance', params)
        .then( ({ data }) => Object.assign({}, data,
          { timestamps: data.timestamps.map( value => new Date(value).toISOString()) },
          _(data)
            .pick([
              'readOpsPerSec', 'writeOpsPerSec', 'totalOpsPerSec',
              'readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec',
              'clusterUtilizationPct',
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
