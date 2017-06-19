(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('SnapshotSchedulesTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      SnapshotSchedulesTableService
    ]);

  function SnapshotSchedulesTableService(SFTableService, SFFilterComparators, DataService) {
    const columns = [
      {key: 'scheduleID', label: 'ID', width: '80px', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'scheduleName', label: 'Name', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'scheduleFrequency', label: 'Frequency', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'recurring', label: 'Recurring', width: '100px', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'boolean', args: ['Yes', 'No']}},
      {key: 'scheduleVolumeIDs', label: 'Volume IDs', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'lastRunTimeStarted', label: 'Last Run', width: '150px', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqDate'}},
      {key: 'lastRunStatus', label: 'Last Run Status', width: '120px', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'paused', label: 'Manually Paused', width: '100px', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'boolean', args: ['Yes', 'No']}}
    ];
    let service = new SFTableService(listSnapshotSchedules, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function listSnapshotSchedules() {
      return DataService.callGuzzleAPI(service.selectedClusterID, 'ListSchedules')
        .then( response => {
          if (response.schedules) {
            return response.schedules.map(schedule => {
              const volumeID = _.get(schedule, 'scheduleInfo.volumeID');
              const volumeIDs = _.get(schedule, 'scheduleInfo.volumes');
              schedule.scheduleFrequency = _.get(schedule, 'attributes.frequency');
              schedule.scheduleVolumeIDs = volumeID ? volumeID : ( volumeIDs ? volumeIDs.join(', ') : null);
              return Object.assign({}, schedule);
            });
          }
        });
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
