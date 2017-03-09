(function () {
  'use strict';

  angular
  .module('aiqUi')
  .service('VolumeTableService', [
    'SFTableService',
    'SFFilterComparators',
    'DataService',
    '$routeParams',
    '$filter',
    VolumeTableService
  ]);

  function VolumeTableService(SFTableService, SFFilterComparators, DataService, $routeParams, $filter) {
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
      {key: 'snapshots', label: 'Snapshots', format: {filter: 'string'}},
      {key: 'details', label: 'View Details', width: 100, sortable: false, nonData: true}
    ];
    let service = new SFTableService(listActiveVolumes, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function listActiveVolumes() {
      return DataService.callGuzzleAPIs(service.selectedClusterID, 'ListActiveVolumes', 'ListSnapshots')
        .then( ({ volumes = [], snapshots = [] }) => {
          if (volumes) {
            return volumes.map( volume => {
              volume.minIOPS = volume.qos.minIOPS;
              volume.maxIOPS = volume.qos.maxIOPS;
              volume.burstIOPS = volume.qos.burstIOPS;
              volume.paired = volume.volumePairs.length ? true : false;
              let snapshotCount = snapshots.filter( snapshot => snapshot.volumeID === volume.volumeID ).length;
              volume.snapshots = $filter('volumesSnapshotsLink')(snapshotCount, volume.volumeID);
              volume.details = '<a class="view-details-link" ng-href="#/cluster/' + $routeParams.clusterID + '/volume/' + volume.volumeID +
                '" aria-label="Leave this page to view selected volume details"><i class="fa fa-arrow-right right-arrow" aria-hidden="true"</i></a>';
              return volume;
            });
          }
        });
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
