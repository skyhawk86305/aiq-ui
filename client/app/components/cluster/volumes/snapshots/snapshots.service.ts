(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('SnapshotTableService', [
      'SFTableService',
      'DataService',
      'SFFilterComparators',
      SnapshotTableService
    ]);

  function SnapshotTableService(SFTableService, DataService, SFFilterComparators) {
    const columns = [
      {key: 'snapshotID', label: 'ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'volumeID', label: 'Volume ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'accountID', label: 'Account ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'snapshotUUID', label: 'UUID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'totalSize', label: 'Size', format: {filter: 'bytes'}},
      {key: 'volumeSize', label: 'Volume Size', format: {filter: 'bytes'}},
      {key: 'createTime', label: 'Create Time', format: {filter: 'aiqDate'}},
      {key: 'retainUntil', label: 'Retain Until', format: {filter: 'aiqDate'}},
      {key: 'groupID', label: 'Group SnapshotID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
      {key: 'enableRemoteReplication', label: 'Remote Replication', format: {filter: 'boolean', args: ['Yes', 'No']}},
      {key: 'replicated', label: 'Replicated'}
    ];
    let service = new SFTableService(listSnapshots, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function listSnapshots() {
      return DataService.callGuzzleAPIs(service.selectedClusterID, 'ListActiveVolumes', 'ListSnapshots')
        .then( ({ volumes = [], snapshots = [] }) =>
          snapshots.map( snapshot => {
            const associatedVolume = volumes.find( volume => volume.volumeID === snapshot.volumeID );
            const accountID = _.get(associatedVolume, 'accountID');
            const volumeSize = _.get(associatedVolume, 'totalSize');
            return Object.assign({}, snapshot, { accountID, volumeSize });
          })
        );
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
