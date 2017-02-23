(function () {
  'use strict';

  angular
  .module('aiqUi')
  .service('VolumeTableService', [
    'SFTableService',
    'SFFilterComparators',
    'DataService',
    '$routeParams',
    VolumeTableService
  ]);

  function VolumeTableService(SFTableService, SFFilterComparators, DataService, $routeParams) {
    let columns = getColumns(),
      service = new SFTableService(listActiveVolumes, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getColumns() {
      return [
        {key: 'volumeID', label: 'ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'accountID', label: 'Account ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'totalSize', label: 'Volume Size', format: {filter: 'bytes'}},
        {key: 'enable512e', label: '512e', width: 100, format: {filter: 'boolean', args: ['Yes', 'No']}},
        {key: 'access', label: 'Access', format: {filter: 'access'}},
        {key: 'minIOPS', label: 'Min IOPS', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, false, true]}},
        {key: 'maxIOPS', label: 'Max IOPS', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, false, true]}},
        {key: 'burstIOPS', label: 'Burst IOPS',  filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, false, true]}},
        {key: 'paired', label: 'Paired', format: {filter: 'boolean', args: ['Yes', 'No']}},
        {key: 'configuredAccessProtocols', label: 'Configured Access Protocols', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'details', label: 'Details', width: 60, sortable: false, hideable: false}
      ];
    }

    function listActiveVolumes() {
      return DataService.callGuzzleAPI(service.selectedClusterID, 'ListActiveVolumes')
      .then(function(response) {
        return response.volumes.map(function(volume) {
          volume.minIOPS = volume.qos.minIOPS;
          volume.maxIOPS = volume.qos.maxIOPS;
          volume.burstIOPS = volume.qos.burstIOPS;
          volume.paired = volume.volumePairs.length ? true : false;
          volume.details = '<a ng-href="#/cluster/' + $routeParams.clusterID + '/volume/' + volume.volumeID +'">View ></a>';
          return volume;
        });
      });
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
