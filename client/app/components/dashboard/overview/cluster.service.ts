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
        key: 'clusterName',
        label: 'Cluster Name',
        filterComparators: SFFilterComparators.STRING_DEFAULT,
      },
      clusterID: {
        key: 'clusterID',
        label: 'Cluster ID',
        filterComparators: SFFilterComparators.INTEGER_DEFAULT,
      },
      version: {
        key: 'clusterVersion',
        label: 'Version',
        filterComparators: SFFilterComparators.STRING_DEFAULT,
      },
      nodes: {
        key: 'clusterInfo_ensemble_length',
        label: 'Nodes',
        filterComparators: SFFilterComparators.INTEGER_DEFAULT,
      },
      volumes: {
        key: 'activeVolumes',
        label: 'Volumes',
        filterComparators: SFFilterComparators.INTEGER_DEFAULT,
      },
      usedBlockCapacityPercent: {
        key: 'clusterCapacity_usedSpacePercent',
        label: 'Used Block Capacity',
        format: { filter: 'percent', args: [ 1, true, false, true ] },
      },
      totalBlockCapacity: {
        key: 'clusterCapacity_maxUsedSpace',
        label: 'Total Block Capacity',
        format: { filter: 'bytes', args: [ false, 2 ] },
      },
      usedBlockCapacity: {
        key: 'clusterCapacity_usedSpace',
        label: 'Used Block Capacity',
        format: { filter: 'bytes', args: [ false, 2 ] },
      },
      totalMetadataCapacity: {
        key: 'clusterCapacity_maxUsedMetadataSpace',
        label: 'Total Metadata Capacity',
        format: { filter: 'bytes', args: [ false, 2 ] },
      },
      usedMetadataCapacity: {
        key: 'clusterCapacity_usedMetadataSpace',
        label: 'Used Metadata Capacity',
        format: { filter: 'bytes', args: [ false, 2 ] },
      },
      provisionedSpace: {
        key: 'clusterCapacity_provisionedSpace',
        label: 'Provisioned Space',
        format: { filter: 'bytes', args: [ false, 2 ] },
      },
      currentIOPS: {
        key: 'clusterCapacity_currentIOPS',
        label: 'Current IOPS',
      },
      averageIOPS: {
        key: 'clusterCapacity_averageIOPS',
        label: 'Average IOPS',
      },
      peakIOPS: {
        key: 'clusterCapacity_peakIOPS',
        label: 'Peak IOPS',
      },
      performanceUtilization: {
        key: 'clusterStats_clusterUtilization',
        label: 'Performance Utilization',
        format: { filter: 'percent', args: [ 2, true ] },
      },
      iscsiSessions: {
        key: 'clusterCapacity_activeSessions',
        label: 'iSCSI Sessions',
        filterComparators: SFFilterComparators.INTEGER_DEFAULT,
      },
      compression: {
        key: 'clusterCapacity_compressionFactor',
        label: 'Compression',
        format: { filter: 'percent', args: [ 1, true, true ] },
      },
      deduplication: {
        key: 'clusterCapacity_deDuplicationFactor',
        label: 'Deduplication',
        format: { filter: 'percent', args: [ 1, true, true ] },
      },
      thinProvisioning: {
        key: 'clusterCapacity_thinProvisioningFactor',
        label: 'Thin Provisioning',
        format: { filter: 'percent', args: [ 1, true, true ] },
      },
      efficiency: {
        key: 'clusterCapacity_efficiencyFactor',
        label: 'Efficiency',
        format: { filter: 'percent', args: [ 1, true, true ] },
      },
      unresolvedAlerts: {
        key: 'unresolvedFaults',
        label: 'Unresolved Alerts',
        filterComparators: SFFilterComparators.INTEGER_DEFAULT,
      },
      svip: {
        key: 'clusterInfo_svip',
        label: 'SVIP',
      },
      mvip: {
        key: 'clusterInfo_mvip',
        label: 'MVIP',
      },
      lastUpdateTime: {
        key: 'lastUpdateTime',
        label: 'Last Update Time',
        format: {
          filter: 'timestampWithWarning',
          args: [ 60 * 1000, 'Last collector update was over one hour ago' ],
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
      const components = [
        'clusterInfo',
        'clusterStats',
        'clusterCapacity',
        'volumesInfo',
        'faultInfo',
      ];
      return DataService.callAPI('ListActiveClusters', { components }).then( ({ clusters = [] }) =>
        clusters.map( cluster =>
          Object.assign({}, cluster,
            _.mapKeys(cluster.clusterCapacity, (val, key) => `clusterCapacity_${key}` ),
            _.mapKeys(cluster.clusterInfo, (val, key) => `clusterInfo_${key}` ),
            _.mapKeys(cluster.clusterStats, (val, key) => `clusterStats_${key}` ),
            {
              clusterInfo_ensemble_length: _.get(cluster, 'clusterInfo.ensemble.length'),
              activeVolumes: cluster.activeVolumes || 0,
              unresolvedFaults: cluster.unresolvedFaults || 0,
              lastUpdateTime: new Date(cluster.lastUpdateTime * 1000),
            }
          )
        )
      );
    }

    return new SFTableService(listClusters, columns, false)
  }
}
