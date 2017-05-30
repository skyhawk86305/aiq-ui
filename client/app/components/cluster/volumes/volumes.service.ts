(function () {
  'use strict';

  const _ = require('lodash');

  angular
  .module('aiqUi')
  .service('VolumeTableService', [
    'SFTableService',
    'SFFilterComparators',
    'DataService',
    '$routeParams',
    '$filter',
    '$q',
    VolumeTableService
  ]);

  function VolumeTableService(SFTableService, SFFilterComparators, DataService, $routeParams, $filter, $q) {
    const columns = [
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
      {key: 'snapshots', label: 'Snapshots', format: {filter: 'string'}, titleValue: 'Click to View Volume Snapshots'},
      {key: 'details', label: 'View Details', width: 100, sortable: false, nonData: true, titleValue: 'Click to View Volume Details'}
    ];
    let service = new SFTableService(listActiveVolumes, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function listActiveVolumes() {
      return $q
        .all([
          DataService.callAPI('ListActiveVolumes', { clusterID: service.selectedClusterID }),
          DataService.callGuzzleAPI(service.selectedClusterID, 'ListSnapshots'),
        ])
        .then( ([{ volumes = [] }, { snapshots = [] }]) =>
          volumes.map( volume => {
            const snapshotCount = _(snapshots).filter(['volumeID', volume.volumeID]).size();
            return Object.assign({}, volume, {
              minIOPS: volume.qos.minIOPS,
              maxIOPS: volume.qos.maxIOPS,
              burstIOPS: volume.qos.burstIOPS,
              paired: volume.volumePairs.length ? true : false,
              snapshots: $filter('volumesSnapshotsLink')(snapshotCount, volume.volumeID),
              details: $filter('volumesDetailsLink')(volume.volumeID),
            });
          })
        );
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
