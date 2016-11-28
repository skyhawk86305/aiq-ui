(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('VolumeTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      '$filter',
      VolumeTableService
    ]);

  function VolumeTableService(SFTableService, SFFilterComparators, DataService) {
    var columns = getColumns(),
      service = new SFTableService(listActiveVolumes, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getColumns() {
      return [
        {key: 'volumeID', label: 'ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'accountID', label: 'Account ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'totalSize', label: 'Volume Size', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'bytes'}},
        {key: 'enable512e', label: '512e', width: 100, filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'boolean', args: ['Yes', 'No']}},
        {key: 'access', label: 'Access', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'minIOPS', label: 'Min IOPS', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'maxIOPS', label: 'Max IOPS', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'burstIOPS', label: 'Burst IOPS',  filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'paired', label: 'Paired', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'boolean', args: ['Yes', 'No']}},
        {key: 'configuredAccessProtocols', filterComparators: SFFilterComparators.STRING_DEFAULT, label: 'Configured Access Protocols'}
      ];
    }

    function listActiveVolumes() {
      return DataService.callAPI('ListActiveVolumes', {clusterID: service.selectedClusterID})
        .then(function(response) {
          return response.volumes.map(function(volume) {
            volume.minIOPS = volume.qos.minIOPS;
            volume.maxIOPS = volume.qos.maxIOPS;
            volume.burstIOPS = volume.qos.burstIOPS;
            volume.paired = volume.volumePairs.length ? true : false;
            return volume;
          });
        });
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID);
    }
  }
})();
