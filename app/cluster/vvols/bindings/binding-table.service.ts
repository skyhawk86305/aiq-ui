(function () {
  'use strict';

  angular
  .module('aiqUi')
  .service('BindingTableService', [
    'SFTableService',
    'SFFilterComparators',
    'DataService',
    BindingTableService
  ]);

  function BindingTableService(SFTableService, SFFilterComparators, DataService) {
    const columns = [
      {label: 'Host ID', key: 'virtualVolumeHostID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {label: 'Protocol Endpoint ID', key: 'protocolEndpointID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {label: 'Protocol Endpoint In Band ID', key: 'protocolEndpointInBandID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {label: 'Protocol Endpoint Type', key: 'protocolEndpointType', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {label: 'VVol Binding ID', key: 'virtualVolumeBindingID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {label: 'VVol ID', key: 'virtualVolumeID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {label: 'VVol Secondary ID', key: 'virtualVolumeSecondaryID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
    ];

    function listBindings() {
      return DataService.callGuzzleAPI(service.selectedClusterID, 'ListVirtualVolumeBindings')
        .then( response => response.bindings )
        .catch( err => {
          if (err.status !== 404) {
            return err;
          }
        })
    }

    const service = new SFTableService(listBindings, columns, false);

    service.selectedClusterID = null;
    service.update = function(clusterID) {
      service.selectedClusterID = parseInt(clusterID);
    };

    return service;
  }
})();
