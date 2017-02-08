(function () {
  'use strict';

  angular
  .module('aiqUi')
  .service('ProtocolEndpointTableService', [
    'SFTableService',
    'SFFilterComparators',
    'DataService',
    ProtocolEndpointTableService
  ]);

  function ProtocolEndpointTableService(SFTableService, SFFilterComparators, DataService) {
    let columns = getColumns(),
      service = new SFTableService(listProtocolEndpoints, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getColumns() {
      return [
        {key: 'primaryProviderID', label: 'Primary Provider ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'secondaryProviderID', label: 'Secondary Provider ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'protocolEndpointID', label: 'Protocol Endpoint ID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'protocolEndpointState', label: 'Protocol Endpoint State', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'providerType', label: 'Provider Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'scsiNAADeviceID', label: 'SCSI NAA Device ID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}}
      ];
    }

    function listProtocolEndpoints() {
      return DataService.callGuzzleAPI(service.selectedClusterID, 'ListProtocolEndpoints')
        .then( response => response.protocolEndpoints );
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
