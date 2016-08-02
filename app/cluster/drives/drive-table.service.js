(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DriveTableService', [
      'SFTableService',
      'DataService',
      DriveTableService
    ]);

  function DriveTableService(SFTableService, DataService) {
    var listDrives = function() {
      return DataService.callAPI('ListActiveDrives', {clusterID: this.selectedClusterID})
        .then(function(response) {
          return response.drives.map(function(drive) {
            drive.lifeRemainingPercent = drive.driveStats ? drive.driveStats.lifeRemainingPercent :'';
            drive.reserveCapacityPercent  = drive.driveStats ? drive.driveStats.reserveCapacityPercent : '';
            return drive;
          });
      });
    };

    var columns = [
      {key: 'driveID', label: 'ID'},
      {key: 'nodeID', label: 'Node ID'},
      {key: 'slot', label: 'Slot'},
      {key: 'capacity', label: 'Capacity'},
      {key: 'serial', label: 'Serial'},
      {key: 'lifeRemainingPercent', label: 'Wear'},
      {key: 'reserveCapacityPercent', label: 'Reserve'},
      {key: 'type', label: 'Type'}
    ];

    var driveTableService = new SFTableService(listDrives, columns, false);

    driveTableService.selectedClusterID = null;

    driveTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return driveTableService;
  }
})();
