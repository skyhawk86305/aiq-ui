(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('SnapshotTableService', [
      'SFTableService',
      'DataService',
      'SFFilterComparators',
      '$q',
      SnapshotTableService
    ]);

  function SnapshotTableService(SFTableService, DataService, SFFilterComparators, $q) {
    let columns = getColumns(),
      service = new SFTableService(listSnapshots, columns, false);

    service.selectedClusterID = null;
    service.volumeID = null;
    service.update = update;
    return service;

    function getColumns() {
      return [
        {key: 'snapshotID', label: 'ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'snapshotUUID', label: 'UUID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'totalSize', label: 'Size', format: {filter: 'bytes'}},
        {key: 'volumeID', label: 'Volume ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'accountID', label: 'Account ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'volumeSize', label: 'Volume Size', format: {filter: 'bytes'}},
        {key: 'createTime', label: 'Create Time', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
        {key: 'retainUntil', label: 'Retain Until', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
        {key: 'groupID', label: 'Group SnapshotID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'enableRemoteReplication', label: 'Remote Replication', format: {filter: 'boolean', args: ['Yes', 'No']}},
        {key: 'replicated', label: 'Replicated'}
      ];
    }

    function listSnapshots() {
      const methods = [
        DataService.callGuzzleAPI(service.selectedClusterID, 'ListActiveVolumes'),
        DataService.callGuzzleAPI(service.selectedClusterID, 'ListSnapshots')
      ];
      let volumes, snapshots, selectedVolume;

      return callGuzzleAPIs(methods).then( responseObj => {
        volumes = responseObj.volumes;
        snapshots = responseObj.snapshots;

        if (volumes) {
          selectedVolume = volumes.find( volume => {
            return volume.volumeID === service.volumeID;
          });
        }
        if (selectedVolume && snapshots) {
          return snapshots.filter(snapshot => {
            if (snapshot.volumeID === service.volumeID) {
              snapshot.accountID = selectedVolume.accountID;
              snapshot.volumeSize = selectedVolume.totalSize;
              return snapshot;
            };
          });
        }
      });
    }

    function callGuzzleAPIs(methods) {
      return $q.all(methods).then( responses => {
        let responseObj = {};
        responses.forEach(response => {
          Object.keys(response).forEach(key => responseObj[key] = response[key]);
        });
        return responseObj;
      });
    }

    function update(clusterID, volumeID) {
      service.selectedClusterID = parseInt(clusterID, 10);
      service.volumeID = parseInt(volumeID, 10);
    }
  }
})();
