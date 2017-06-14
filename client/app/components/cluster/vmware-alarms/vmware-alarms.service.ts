import * as _ from 'lodash';
import * as moment from 'moment';

export class VmwareAlarmsService {

  static $inject = [ '$rootScope', '$uibModal', 'SFTableService', 'SFFilterComparators', 'DataService' ];
  constructor(
    private $rootScope,
    private $uibModal,
    private SFTableService,
    private SFFilterComparators,
    private DataService
  ) {
    const columns = [
      { label: 'Creation ID', key: 'creationEventId', width: 100, format: { filter: 'aiqNumber', args: [0, true] }, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Alarm ID', key: 'alarmId', width: 100, filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Alarm Name', key: 'name', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Description', key: 'description', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Last Modified Time', key: 'lastModifiedTime', width: 200, format: { filter: 'aiqDate' }, filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Last Modified User', key: 'lastModifiedUser', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Entity ID', key: 'entityId', filterComparators: SFFilterComparators.STRING_DEFAULT }
    ];

    function listVmwareAlarms() {
      return DataService.callGuzzleAPI(service.selectedClusterID, 'get_alarm_info')
        .then( response =>  _.get(response, 'vcenter-alarms', []))
        .then( alarms =>
          alarms.map( alarm => {
            return Object.assign({}, alarm, {
              alarmId: _.get(alarm, 'alarm._moId'),
              entityId: _.get(alarm, 'entity._moId'),
              lastModifiedTime: moment(_.get(alarm, 'lastModifiedTime')).format('x')
            });
          })
        );
    }

    const service = new SFTableService(listVmwareAlarms, columns, false);

    service.selectedClusterID = null;
    service.update = function(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    };

    return service;
  }
}
