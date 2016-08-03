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
      return DataService.callAPI('ListActiveDrives', {clusterID: this.selectedClusterID})
        .then(function(response) {
          return response.drives
            .map(function(drive) {
              drive.lifeRemainingPercent = drive.driveStats ? drive.driveStats.lifeRemainingPercent :'';
              drive.reserveCapacityPercent  = drive.driveStats ? drive.driveStats.reserveCapacityPercent : '';
              return drive;
            });
      });
    };

    var columns = [
      {key: 'driveID', label: 'ID', filter:SFFilterComparators.INTEGER_DEFAULT},
      {key: 'nodeID', label: 'Node ID', filter:SFFilterComparators.INTEGER_DEFAULT},
      {key: 'slot', label: 'Slot', filter:SFFilterComparators.INTEGER_DEFAULT},
      {key: 'capacity', label: 'Capacity'},
      {key: 'serial', label: 'Serial', filter:SFFilterComparators.STRING_DEFAULT},
      {key: 'lifeRemainingPercent', label: 'Wear', filter:SFFilterComparators.INTEGER_DEFAULT},
      {key: 'reserveCapacityPercent', label: 'Reserve', filter:SFFilterComparators.INTEGER_DEFAULT},
      {key: 'type', label: 'Type', filter:SFFilterComparators.STRING_DEFAULT}
    ];

    var driveTableService = new SFTableService(listDrives, columns, false);

    driveTableService.selectedClusterID = null;

    driveTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return driveTableService;
  }
})();
