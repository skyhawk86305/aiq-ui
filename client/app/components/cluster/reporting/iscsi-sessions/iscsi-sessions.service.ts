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
      return DataService.callGraphAPI('activeISCSISessions', params)
        .then( response => _.get(response, 'data') );
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
