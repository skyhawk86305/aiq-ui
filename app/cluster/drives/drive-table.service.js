(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('DriveTableService', [
      '$q',
      'SFTableService',
      'DataService',
      DriveTableService
    ]);

  function DriveTableService(SFTableService, DataService) {
    var listDrives = function() {
      return DataService.callAPI('ListActiveDrives', {clusterID: this.selectedClusterID})
        .then(function(response) {
          var drives = response.drives;
          drives.forEach(function(drive){
            drive.lifeRemainingPercent = drive.driveStats ? drive.driveStats.lifeRemainingPercent :'';
            drive.reserveCapacityPercent  = drive.driveStats ? drive.driveStats.reserveCapacityPercent : '';
          });
          return drives;
      });
    };

    var columns = [
      {key: 'driveID', label: 'ID', widthPercentage: '12.5%'},
      {key: 'nodeID', label: 'Node ID', widthPercentage: '12.5%'},
      {key: 'slot', label: 'Slot', widthPercentage: '12.5%'},
      {key: 'capacity', label: 'Capacity', widthPercentage: '12.5%'},
      {key: 'serial', label: 'Serial', widthPercentage: '12.5%'},
      {key: 'lifeRemainingPercent', label: 'Wear', widthPercentage: '12.5%'},
      {key: 'reserveCapacityPercent', label: 'Reserve', widthPercentage: '12.5%'},
      {key: 'type', label: 'Type', widthPercentage: '12.5%'}
    ];

    var driveTableService = new SFTableService(listDrives, columns, false);

    driveTableService.selectedClusterID = null;

    driveTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return driveTableService;
  }
})();
