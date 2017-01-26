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
      {key: 'lifeRemainingPercent', label: 'Wear', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber'}},
      {key: 'reserveCapacityPercent', label: 'Reserve', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber'}},
      {key: 'type', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}}
    ];

    const driveTableService = new SFTableService(listDrives, columns, false);

    driveTableService.selectedClusterID = null;

    driveTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return driveTableService;

    /***********************************************/

    function listDrives() {
      var methods = [
        DataService.callGuzzleAPI('ListDrives', {clusterID: this.selectedClusterID}),
        DataService.callGuzzleAPI('GetDriveStats', {clusterID: this.selectedClusterID})
      ],
      driveStatsLookup,
      drives;

      return callGuzzleAPIs(methods).then(function(responseObj) {
        drives = responseObj.drives;
        driveStatsLookup = createLookup(responseObj['driveStats'], 'driveID');

        return drives.map(function(drive) {
          var driveLookupExists = driveStatsLookup && driveStatsLookup[drive.driveID];
          drive.lifeRemainingPercent = driveLookupExists && driveStatsLookup[drive.driveID].lifeRemainingPercent || '';
          drive.reserveCapacityPercent  = driveLookupExists && driveStatsLookup[drive.driveID].reserveCapacityPercent || '';
          return drive;
        })

        function createLookup(data, uniqueKey) {
          if (data) {
            return data.reduce(function(lookup, currentObj) {
              lookup[currentObj[uniqueKey]] = currentObj;
              return lookup;
            }, {})
          }
        }
      });

      function callGuzzleAPIs(methods) {
        var deferred = $q.defer();

        $q.all(methods).then(function(responses) {
          var responseObj = {};
          responses.forEach(function(response) {
            Object.keys(response).forEach(function(key) {
              responseObj[key] = response[key];
            });
          });
          deferred.resolve(responseObj);
        }).catch(function(err) {
          deferred.reject(err);
        })

        return deferred.promise;
      }
    };
  }
})();
