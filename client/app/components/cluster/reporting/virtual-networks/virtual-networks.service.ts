(function () {
  'use strict';

  angular
  .module('aiqUi')
  .service('VirtualNetworkTableService', [
    'SFTableService',
    'SFFilterComparators',
    'DataService',
    VirtualNetworkTableService
  ]);

  function VirtualNetworkTableService(SFTableService, SFFilterComparators, DataService) {
    let columns = getColumns(),
      service = new SFTableService(listVirtualNetworks, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getColumns() {
      return [
        {key: 'virtualNetworkID', label: 'ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true]}},
        {key: 'name', label: 'Name', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'virtualNetworkTag', label: 'VLAN Tag', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true]}},
        {key: 'svip', label: 'SVIP', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'netmask', label: 'Netmask', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'gateway', label: 'Gateway', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'namespace', label: 'VRF Enabled', format: {filter: 'boolean', args:['Yes','No']}},
        {key: 'addressBlocks', label: 'IPs Used', format: {filter: 'ipsUsed'}},
      ];
    }

    function listVirtualNetworks() {
      return DataService.callGuzzleAPI(service.selectedClusterID, 'ListVirtualNetworks')
        .then(response => response.virtualNetworks);
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
