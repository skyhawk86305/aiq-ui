(function () {
  'use strict';

  const _ = require('lodash');

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
      {key: 'version', label: 'Firmware Version', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'serial', label: 'Serial', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'lifeRemainingPercent', label: 'Wear Remaining', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'drivesTableBadge', args: ['wear']}},
      {key: 'reserveCapacityPercent', label: 'Reserve', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'drivesTableBadge', args: ['reserve']}},
      {key: 'type', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}}
    ];

    const service = new SFTableService(listDrives, columns, false);

    service.selectedClusterID = null;

    service.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID, 10);
    };

    return service;

    function listDrives() {
      return DataService
        .callGuzzleAPIs(service.selectedClusterID, 'ListDrives', 'GetDriveStats', 'GetClusterHardwareInfo')
        .then( ({ drives = [], driveStats = [], clusterHardwareInfo = {} }) =>
          drives.map( drive => {
            const stats = _.find(driveStats, ['driveID', drive.driveID]) || {};
            const hardwareInfo = _.get(clusterHardwareInfo, `drives[${drive.driveID}]`, {});

            return Object.assign({}, drive, {
              lifeRemainingPercent: !isNaN(parseFloat(stats.lifeRemainingPercent)) ? stats.lifeRemainingPercent : '',
              reserveCapacityPercent: !isNaN(parseFloat(stats.reserveCapacityPercent)) ? stats.reserveCapacityPercent : '',
              type: drive.type === 'volume' ? 'metadata' : drive.type,
              version: hardwareInfo.version,
            });
          })
        );
    }
  }
})();
