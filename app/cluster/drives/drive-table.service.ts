(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DriveTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      DriveTableService
    ]);

  function DriveTableService(SFTableService, SFFilterComparators, DataService) {
    var listDrives = function() {
      return DataService.callAPI('ListDrives', {clusterID: this.selectedClusterID})
        .then(function(response) {
          return response.drives
            .map(function(drive) {
              drive.lifeRemainingPercent = drive.driveStats && drive.driveStats.lifeRemainingPercent || '';
              drive.reserveCapacityPercent  = drive.driveStats && drive.driveStats.reserveCapacityPercent || '';
              return drive;
            });
      });
    };

    var columns = [
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

    var driveTableService = new SFTableService(listDrives, columns, false);

    driveTableService.selectedClusterID = null;

    driveTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return driveTableService;
  }
})();
