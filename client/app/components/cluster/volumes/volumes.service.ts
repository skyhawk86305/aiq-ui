(function () {
  'use strict';

  angular
  .module('aiqUi')
  .service('VolumeTableService', [
    'SFTableService',
    'SFFilterComparators',
    'DataService',
    '$q',
    '$routeParams',
    VolumeTableService
  ]);

  function VolumeTableService(SFTableService, SFFilterComparators, DataService, $q, $routeParams) {
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
        {key: 'snapshots', label: 'Snapshots', format: {filter: 'string'}}
      ];
    }

    function listActiveVolumes() {
      const methods = [
        DataService.callGuzzleAPI(service.selectedClusterID, 'ListActiveVolumes'),
        DataService.callGuzzleAPI(service.selectedClusterID, 'ListSnapshots')
      ];
      let volumes, snapshots;

      return callGuzzleAPIs(methods).then( responseObj => {
        volumes = responseObj.volumes;
        snapshots = responseObj.snapshots;

        if (volumes) {
          return volumes.map( volume => {
            volume.minIOPS = volume.qos.minIOPS;
            volume.maxIOPS = volume.qos.maxIOPS;
            volume.burstIOPS = volume.qos.burstIOPS;
            volume.paired = volume.volumePairs.length ? true : false;
            let snapshotCount = (snapshots.filter(snapshot => {
              return snapshot.volumeID === volume.volumeID;
            })).length;

            volume.snapshots = snapshotCount === 0 ? snapshotCount : '<a ng-href="#/cluster/' + $routeParams.clusterID + '/snapshot/' + volume.volumeID + '" ' +
              'aria-label="Leave this page to view snapshots associated with selected volume">' + snapshotCount + '</a>';

            return volume;
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

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
