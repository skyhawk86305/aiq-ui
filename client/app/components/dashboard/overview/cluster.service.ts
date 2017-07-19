import * as _ from 'lodash';

export class ClusterService {

  static $inject = [ 'SFTableService', 'SFFilterComparators', 'DataService', '$filter' ];
  constructor(SFTableService, SFFilterComparators, DataService, $filter) {
    const columnDefs = {
      customerName: {
        key: 'customerName',
        label: 'Customer',
        filterComparators: SFFilterComparators.STRING_DEFAULT,
      },
      clusterName: {
        key: 'name',
        label: 'Cluster Name',
        filterComparators: SFFilterComparators.STRING_DEFAULT,
      },
      clusterID: {
        key: 'id',
        label: 'Cluster ID',
        filterComparators: SFFilterComparators.INTEGER_DEFAULT,
      },
      version: {
        key: 'version',
        label: 'Version',
        filterComparators: SFFilterComparators.STRING_DEFAULT,
      },
      nodes: {
        key: 'nodes',
        label: 'Nodes',
        filterComparators: SFFilterComparators.INTEGER_DEFAULT,
      },
      volumes: {
        key: 'activeVolumes',
        label: 'Volumes',
        filterComparators: SFFilterComparators.INTEGER_DEFAULT,
      },
      usedBlockCapacityPercent: {
        key: 'usedSpacePercent',
        label: 'Used Block Capacity',
        format: { filter: 'percent', args: [ 1, true, false, true ] },
      },
      totalBlockCapacity: {
        key: 'maxUsedSpace',
        label: 'Total Block Capacity',
        format: { filter: 'bytes', args: [ false, 2 ] },
      },
      usedBlockCapacity: {
        key: 'usedSpace',
        label: 'Used Block Capacity',
        format: { filter: 'bytes', args: [ false, 2 ] },
      },
      totalMetadataCapacity: {
        key: 'maxUsedMetadataSpace',
        label: 'Total Metadata Capacity',
        format: { filter: 'bytes', args: [ false, 2 ] },
      },
      usedMetadataCapacity: {
        key: 'usedMetadataSpace',
        label: 'Used Metadata Capacity',
        format: { filter: 'bytes', args: [ false, 2 ] },
      },
      provisionedSpace: {
        key: 'provisionedSpace',
        label: 'Provisioned Space',
        format: { filter: 'bytes', args: [ false, 2 ] },
      },
      currentIOPS: {
        key: 'currentIOPS',
        label: 'Current IOPS',
      },
      averageIOPS: {
        key: 'averageIOPS',
        label: 'Average IOPS',
      },
      peakIOPS: {
        key: 'peakIOPS',
        label: 'Peak IOPS',
      },
      performanceUtilization: {
        key: 'utilization',
        label: 'Performance Utilization',
        format: { filter: 'percent', args: [ 2, true ] },
      },
      iscsiSessions: {
        key: 'activeSessions',
        label: 'iSCSI Sessions',
        filterComparators: SFFilterComparators.INTEGER_DEFAULT,
      },
      compression: {
        key: 'compressionFactor',
        label: 'Compression',
        format: { filter: 'percent', args: [ 1, true, true ] },
      },
      deduplication: {
        key: 'deDuplicationFactor',
        label: 'Deduplication',
        format: { filter: 'percent', args: [ 1, true, true ] },
      },
      thinProvisioning: {
        key: 'thinProvisioningFactor',
        label: 'Thin Provisioning',
        format: { filter: 'percent', args: [ 1, true, true ] },
      },
      efficiency: {
        key: 'efficiencyFactor',
        label: 'Efficiency',
        format: { filter: 'percent', args: [ 1, true, true ] },
      },
      unresolvedAlerts: {
        key: 'unresolvedFaults',
        label: 'Unresolved Alerts',
        filterComparators: SFFilterComparators.INTEGER_DEFAULT,
      },
      svip: {
        key: 'svip',
        label: 'SVIP',
        filterComparators: SFFilterComparators.IP_ADDRESS_DEFAULT,
      },
      mvip: {
        key: 'mvip',
        label: 'MVIP',
        filterComparators: SFFilterComparators.IP_ADDRESS_DEFAULT,
      },
      lastUpdateTime: {
        key: 'lastUpdateTime',
        label: 'Last Update Time',
        format: {
          filter: 'timestampWithWarning',
          args: [ 60 * 60, 'Last collector update was over one hour ago' ],
        },
        titleValue: 'Timestamp of last update from the collector',
      },
    };

    const groups = [
      {
        name: 'Overview',
        columns: [
          columnDefs.version,
          columnDefs.nodes,
          columnDefs.volumes,
          columnDefs.usedBlockCapacityPercent,
          columnDefs.averageIOPS,
          columnDefs.efficiency,
          columnDefs.unresolvedAlerts,
          columnDefs.svip,
          columnDefs.mvip,
          columnDefs.lastUpdateTime,
        ],
      },
      {
        name: 'Performance Details',
        columns: [
          columnDefs.averageIOPS,
          columnDefs.peakIOPS,
          columnDefs.performanceUtilization,
          columnDefs.iscsiSessions,
        ],
      },
      {
        name: 'Capacity Details',
        columns: [
          columnDefs.totalBlockCapacity,
          columnDefs.usedBlockCapacity,
          columnDefs.totalMetadataCapacity,
          columnDefs.usedMetadataCapacity,
          columnDefs.provisionedSpace,
          columnDefs.efficiency,
          columnDefs.deduplication,
          columnDefs.compression,
          columnDefs.thinProvisioning,
        ],
      },
      {
        name: 'Cluster Stats',
        columns: [
          columnDefs.version,
          columnDefs.nodes,
          columnDefs.currentIOPS,
          columnDefs.averageIOPS,
          columnDefs.peakIOPS,
          columnDefs.compression,
          columnDefs.deduplication,
          columnDefs.thinProvisioning,
          columnDefs.efficiency,
          columnDefs.volumes,
          columnDefs.iscsiSessions,
          columnDefs.performanceUtilization,
          columnDefs.usedBlockCapacity,
          columnDefs.provisionedSpace,
        ],
      }
    ];

    const groupColumns = _.flatMap(groups, group =>
      group.columns.map( column => Object.assign({}, column, { groups: [ group.name ] }) )
    );

    const columns = [
      columnDefs.customerName,
      columnDefs.clusterName,
      columnDefs.clusterID,
      ...groupColumns,
    ];

    function listClusters() {
      return DataService.callAPI('ListClusterDetails').then( ({ clusters = [] }) =>
        clusters.map( cluster =>
          Object.assign({}, cluster, {
            lastUpdateTime: new Date(cluster.lastUpdateTime * 1000),
          })
        )
      );
    }

    return new SFTableService(listClusters, columns, false)
  }
}
