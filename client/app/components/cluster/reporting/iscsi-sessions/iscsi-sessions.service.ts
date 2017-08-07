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
       .then( ({ data }) => Object.assign({}, data,
        { timestamps: data.timestamps.map( value => new Date(value)) }
        ))
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
