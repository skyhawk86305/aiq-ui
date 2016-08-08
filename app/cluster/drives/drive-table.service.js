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
      {key: 'driveID', label: 'ID', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'integer'}}},
      {key: 'nodeID', label: 'Node ID', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'integer'}}},
      {key: 'slot', label: 'Slot', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'integer'}}},
      {key: 'capacity', label: 'Capacity', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'serial', label: 'Serial', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'lifeRemainingPercent', label: 'Wear', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'integer'}}},
      {key: 'reserveCapacityPercent', label: 'Reserve', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'integer'}}},
      {key: 'type', label: 'Type', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}}
    ];

    var driveTableService = new SFTableService(listDrives, columns, false);

    driveTableService.selectedClusterID = null;

    driveTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return driveTableService;
  }
})();
