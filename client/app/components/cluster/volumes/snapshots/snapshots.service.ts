(function () {
  'use strict';

  const _ = require('lodash');

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
        {key: 'volumeID', label: 'Volume ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'accountID', label: 'Account ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'snapshotUUID', label: 'UUID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'totalSize', label: 'Size', format: {filter: 'bytes'}},
        {key: 'volumeSize', label: 'Volume Size', format: {filter: 'bytes'}},
        {key: 'createTime', label: 'Create Time', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
        {key: 'retainUntil', label: 'Retain Until', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}},
        {key: 'groupID', label: 'Group SnapshotID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'enableRemoteReplication', label: 'Remote Replication', format: {filter: 'boolean', args: ['Yes', 'No']}},
        {key: 'replicated', label: 'Replicated'}
      ];
    }

    function listSnapshots() {
      return DataService.callGuzzleAPIs(service.selectedClusterID, 'ListActiveVolumes', 'ListSnapshots')
        .then( ({ volumes = [], snapshots = [] }) => {
          const selectedVolume = volumes.find( volume => volume.volumeID === service.volumeID );
          const accountID = _.get(selectedVolume, 'accountID');
          const volumeSize = _.get(selectedVolume, 'totalSize');
          return snapshots
            .filter( snapshot => snapshot.volumeID === service.volumeID )
            .map( snapshot => Object.assign({}, snapshot, { accountID, volumeSize }) );
      });
    }

    function update(clusterID, volumeID) {
      service.selectedClusterID = parseInt(clusterID, 10);
      service.volumeID = parseInt(volumeID, 10);
    }
  }
})();
