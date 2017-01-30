(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DriveTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      '$q',
      DriveTableService
    ]);

  function DriveTableService(SFTableService, SFFilterComparators, DataService, $q) {
    const columns = [
      {key: 'driveID', label: 'ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true]}},
      {key: 'nodeID', label: 'Node ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true]}},
      {key: 'status', label: 'Status', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'slot', label: 'Slot', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'driveSlot'}},
      {key: 'capacity', label: 'Capacity', format: {filter: 'bytes'}},
      {key: 'serial', label: 'Serial', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'lifeRemainingPercent', label: 'Wear', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'drivesTableBadge', args: ['wear']}},
      {key: 'reserveCapacityPercent', label: 'Reserve', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'drivesTableBadge', args: ['reserve']}},
      {key: 'type', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}}
    ];

    const service = new SFTableService(listDrives, columns, false);

    service.selectedClusterID = null;

    service.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return service;

    /***********************************************/

    function listDrives() {
      const methods = [
        DataService.callGuzzleAPI(service.selectedClusterID, 'ListDrives'),
        DataService.callGuzzleAPI(service.selectedClusterID, 'GetDriveStats')
      ];
      let driveStatsLookup, drives;

      return callGuzzleAPIs(methods).then( responseObj => {
        drives = responseObj.drives;
        driveStatsLookup = createLookup(responseObj['driveStats'], 'driveID');

        return drives.map( drive => {
          const driveStats = driveStatsLookup ? driveStatsLookup[drive.driveID] : null;
          if (driveStats) {
            drive.lifeRemainingPercent = !isNaN(parseFloat(driveStats.lifeRemainingPercent)) ? driveStats.lifeRemainingPercent : '';
            drive.reserveCapacityPercent  = !isNaN(parseFloat(driveStats.reserveCapacityPercent)) ? driveStats.reserveCapacityPercent: '';
          }
          return drive;
        })

        function createLookup(data, uniqueKey) {
          if (data) {
            return data.reduce( (lookup, currentObj) => {
              lookup[currentObj[uniqueKey]] = currentObj;
              return lookup;
            }, {})
          }
        }
      });

      function callGuzzleAPIs(methods) {
        return $q.all(methods).then( responses => (<any>Object).assign({}, ...responses));
      }
    };
  }
})();
