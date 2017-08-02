(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('IscsiSessionsGraphService', [
      'DataService',
      'SFGraphTimeSeriesService',
      IscsiSessionsGraphService
    ]);

  function IscsiSessionsGraphService(DataService, SFGraphTimeSeriesService) {

    function getIscsiSessions(params) {
      params.clusterID = service.selectedClusterID;
      return DataService.callGraphAPI('capacity', params)
        .then( ({data}) => Object.assign({}, data,
          data.timestamps.forEach((val,i) => {
            data.timestamps[i] = new Date(val);
          }),
           _.get(data, 'data'))
        )
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }

    const service = new SFGraphTimeSeriesService(getIscsiSessions);
    service.selectedClusterID = null;
    service.update = update;
    return service;
  }

})();
