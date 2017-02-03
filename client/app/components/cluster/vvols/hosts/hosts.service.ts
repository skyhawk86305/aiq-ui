(function () {
  'use strict';

  angular
  .module('aiqUi')
  .service('HostTableService', [
    'SFTableService',
    'SFFilterComparators',
    'DataService',
    HostTableService
  ]);

  function HostTableService(SFTableService, SFFilterComparators, DataService) {
    let columns = getColumns(),
      service = new SFTableService(listHosts, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getColumns() {
      return [
        {key: 'virtualVolumeHostID', label: 'Host ID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'bindings', label: 'Bindings', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'clusterID', label: 'ESX Cluster ID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'initiatorNames', label: 'Initiator IQNs', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'visibleProtocolEndpointIDs', label: 'SolidFire Protocol Endpoint IDs', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}}
      ];
    }

    function listHosts() {
      return DataService.callGuzzleAPI(service.selectedClusterID, 'ListVirtualVolumeHosts')
        .then( response => response.hosts );
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
