(function () {
  'use strict';

  angular
  .module('aiqUi')
  .service('StorageContainerTableService', [
    'SFTableService',
    'SFFilterComparators',
    'DataService',
    StorageContainerTableService
  ]);

  function StorageContainerTableService(SFTableService, SFFilterComparators, DataService) {
    const columns = [
      {key: 'accountID', label: 'Account ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'name', label: 'Name', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'status', label: 'Status', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'protocolEndpointType', label: 'PE Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'storageContainerID', label: 'Storage Container ID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'activeVirtualVolumesCount', label: 'Active Virtual Volumes', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
    ];

    function listStorageContainers() {
      return DataService.callGuzzleAPI(service.selectedClusterID, 'ListStorageContainers')
        .then( response => {
          if (response.storageContainers) {
            return response.storageContainers.map( storageContainer => {
              storageContainer.activeVirtualVolumesCount = storageContainer.virtualVolumes.length;
              return storageContainer;
            })
          }
        });
    }

    const service = new SFTableService(listStorageContainers, columns, false);

    service.selectedClusterID = null;
    service.update = function(clusterID) {
      service.selectedClusterID = parseInt(clusterID);
    }

    return service;
  }
})();
