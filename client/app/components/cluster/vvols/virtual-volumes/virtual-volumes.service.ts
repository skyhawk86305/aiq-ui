(function () {
  'use strict';

  angular
  .module('aiqUi')
  .service('VirtualVolumeTableService', [
    'SFTableService',
    'SFFilterComparators',
    'DataService',
    VirtualVolumeTableService
  ]);

  function VirtualVolumeTableService(SFTableService, SFFilterComparators, DataService) {
    let columns = getColumns(),
      service = new SFTableService(listVirtualVolumes, columns, false);

    service.selectedClusterID = null;
    service.update = update;
    return service;

    /**********************************/

    function getColumns() {
      return [
        {key: 'volumeID', label: 'ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'snapshotID', label: 'Snapshot ID', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'string'}},
        {key: 'parentVirtualVolumeID', label: 'Parent Virtual Volume ID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'virtualVolumeID', label: 'Virtual Volume ID', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'VMW_VVolName', label: 'Name', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'VMW_GosType', label: 'Guest OS Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'virtualVolumeType', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'access', label: 'Access', format: {filter: 'access'}},
        {key: 'totalSize', label: 'Size', format: {filter: 'bytes'}},
        {key: 'snapshotInfo', label: 'Snapshot', format: {filter: 'string'}},
        {key: 'minIOPS', label: 'Min IOPS', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, false, true]}},
        {key: 'maxIOPS', label: 'Max IOPS', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, false, true]}},
        {key: 'burstIOPS', label: 'Burst IOPS',  filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, false, true]}},
        {key: 'VMW_VmID', label: 'VMW_VmId', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
        {key: 'createTime', label: 'Create Time', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}}
      ];
    }

    function listVirtualVolumes() {
      return DataService.callGuzzleAPI(service.selectedClusterID, 'ListVirtualVolumes')
      .then(response => {
        if (response.virtualVolumes) {
          return response.virtualVolumes.map(volume => {
            volume.VMW_GosType = volume.metadata.VMW_GosType;
            volume.VMW_VmID = volume.metadata.VMW_VmID;
            volume.VMW_VVolName = volume.metadata.VMW_VVolName;
            volume.access = volume.volumeInfo.access;
            volume.totalSize = volume.volumeInfo.totalSize;
            volume.minIOPS = volume.volumeInfo.qos.minIOPS;
            volume.maxIOPS = volume.volumeInfo.qos.maxIOPS;
            volume.burstIOPS = volume.volumeInfo.qos.burstIOPS;
            volume.createTime = volume.volumeInfo.createTime;
            return volume;
          });
        }
      });
    }

    function update(clusterID) {
      service.selectedClusterID = parseInt(clusterID, 10);
    }
  }
})();
