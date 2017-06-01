(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'dashberg';
  const template = require('./dashberg.tpl.html');

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [
        'DashbergNodeService',
        'DashbergVolumeService',
        'DashbergVolumeSizeService',
        'DashbergVolumeAccessService',
        'DashbergIOPService',
        'DashbergBandwidthService',
        'DashbergSessionService',
        'DashbergSnapshotService',
        '$filter',
        DashbergController
        ]
    });

  function DashbergController(DashbergNodeService, DashbergVolumeService, DashbergVolumeSizeService, DashbergVolumeAccessService,
    DashbergIOPService, DashbergBandwidthService, DashbergSessionService, DashbergSnapshotService, $filter) {
    let ctrl = this;

    ctrl.$onInit = function() {
      ctrl.items.forEach( item => {
        item.loadClusterData();
        item.loadNodeData();
      })
    }

    ctrl.items = [
      {title: 'Nodes in Clusters', sumNum: 'totalNodes', description: 'Total Nodes in Field', changeRate: 'changeRate', changeRatePer: 'changeRatePer',
        clusterFields: [
          {subTitle: 'Min Nodes Per Cluster', key: 'minNodesCluster', perCluster: '/', unitKey: 'unitNodesCluster'},
          {subTitle: 'Max Nodes Per Cluster', key: 'maxNodesCluster', perCluster: '/', unitKey: 'unitNodesCluster'},
          {subTitle: 'Avg Nodes Per Cluster', key: 'avgNodesCluster', perCluster: '/', unitKey: 'unitNodesCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return DashbergNodeService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.changeRatePer = percentDecFormat(Math.abs(this.clusterData.changeRate));
            })
        },
        nodeFields: [
          {subTitle: 'Min Nodes Per Node', key: 'minNodesNode', perNode: '/' , unitKey: 'unitNodesNode'},
          {subTitle: 'Max Nodes Per Node', key: 'maxNodesNode', perNode: '/' , unitKey: 'unitNodesNode'},
          {subTitle: 'Avg Nodes Per Node', key: 'avgNodesNode', perNode: '/' , unitKey: 'unitNodesNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return DashbergNodeService.getData()
            .then( response => {
              this.nodeData = response;
              this.nodeData.stdDevNode = percentFormat(this.nodeData.stdDevNode);
            })
        },
      },
      {title: 'Volumes in Clusters', sumNum: 'totalVolumes', description: 'Total Volumes in Field', changeRate: 'changeRate', changeRatePer: 'changeRatePer',
        clusterFields: [
          {subTitle: 'Min Volumes Per Cluster', key: 'minVolumesCluster', perCluster: '/' , unitKey: 'unitVolumeCluster'},
          {subTitle: 'Max Volumes Per Cluster', key: 'maxVolumesCluster', perCluster: '/' , unitKey: 'unitVolumeCluster'},
          {subTitle: 'Avg Volumes Per Cluster', key: 'avgVolumesCluster', perCluster: '/' , unitKey: 'unitVolumeCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return DashbergVolumeService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.minVolumesCluster = numFormat(this.clusterData.minVolumesCluster);
              this.clusterData.maxVolumesCluster = numFormat(this.clusterData.maxVolumesCluster);
              this.clusterData.avgVolumesCluster = numFormat(this.clusterData.avgVolumesCluster);
              this.clusterData.unitVolumeCluster = numFormat(this.clusterData.unitVolumeCluster);
              this.clusterData.totalVolumes = numFormat(this.clusterData.totalVolumes);
              this.clusterData.changeRatePer = percentDecFormat(Math.abs(this.clusterData.changeRate));
            })
        },
        nodeFields: [
          {subTitle: 'Min Volumes Per Node', key: 'minVolumesNode', perNode: '/' , unitKey: 'unitVolumeNode'},
          {subTitle: 'Max Volumes Per Node', key: 'maxVolumesNode', perNode: '/' , unitKey: 'unitVolumeNode'},
          {subTitle: 'Avg Volumes Per Node', key: 'avgVolumesNode', perNode: '/' , unitKey: 'unitVolumeNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return DashbergVolumeService.getData()
            .then( response => {
              this.nodeData = response;
              this.nodeData.stdDevNode = percentFormat(this.nodeData.stdDevNode);
              this.nodeData.minVolumesNode = numFormat(this.nodeData.minVolumesNode);
              this.nodeData.maxVolumesNode = numFormat(this.nodeData.maxVolumesNode);
              this.nodeData.avgVolumesNode = numFormat(this.nodeData.avgVolumesNode);
              this.nodeData.unitVolumeNode = numFormat(this.nodeData.unitVolumeNode);
              this.nodeData.totalVolumes = numFormat(this.nodeData.totalVolumes);
            })
        },
      },
      {title: 'Volume Size', sumNum: 'totalVolumeSize', description: 'Current Average Volume Size', changeRate: 'changeRate', changeRatePer: 'changeRatePer',
        clusterFields: [
          {subTitle: 'Min Volume Size Per Cluster', key: 'minVolumeSizeCluster', perCluster: '/' , unitKey: 'unitVolumeSizeCluster'},
          {subTitle: 'Max Volume Size Per Cluster', key: 'maxVolumeSizeCluster', perCluster: '/' , unitKey: 'unitVolumeSizeCluster'},
          {subTitle: 'Avg Volume Size Per Cluster', key: 'avgVolumeSizeCluster', perCluster: '/' , unitKey: 'unitVolumeSizeCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return DashbergVolumeSizeService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.minVolumeSizeCluster = bytesFormat(this.clusterData.minVolumeSizeCluster);
              this.clusterData.maxVolumeSizeCluster = bytesFormat(this.clusterData.maxVolumeSizeCluster);
              this.clusterData.avgVolumeSizeCluster = bytesFormat(this.clusterData.avgVolumeSizeCluster);
              this.clusterData.totalVolumeSize = bytesFormat(this.clusterData.totalVolumeSize);
              this.clusterData.unitVolumeSizeCluster = bytesFormat(this.clusterData.unitVolumeSizeCluster);
              this.clusterData.changeRatePer = percentDecFormat(Math.abs(this.clusterData.changeRate));
            })
        },
        nodeFields: [
          {subTitle: 'Min Volume Size Per Node', key: 'minVolumeSizeNode', perNode: '/' , unitKey: 'unitVolumeSizeNode'},
          {subTitle: 'Max Volume Size Per Node', key: 'maxVolumeSizeNode', perNode: '/' , unitKey: 'unitVolumeSizeNode'},
          {subTitle: 'Avg Volume Size Per Node', key: 'avgVolumeSizeNode', perNode: '/' , unitKey: 'unitVolumeSizeNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return DashbergVolumeSizeService.getData()
            .then( response => {
              this.nodeData = response;
              this.nodeData.stdDevNode = percentFormat(this.nodeData.stdDevNode);
              this.nodeData.minVolumeSizeNode = bytesFormat(this.nodeData.minVolumeSizeNode);
              this.nodeData.maxVolumeSizeNode = bytesFormat(this.nodeData.maxVolumeSizeNode);
              this.nodeData.avgVolumeSizeNode = bytesFormat(this.nodeData.avgVolumeSizeNode);
              this.nodeData.totalVolumeSize = bytesFormat(this.nodeData.totalVolumeSize);
              this.nodeData.unitVolumeSizeNode = bytesFormat(this.nodeData.unitVolumeSizeNode);
            })
        },
      },
      {title: 'Volume Access Groups', sumNum: 'totalVolumeAccess', description: 'Total Volume Access Groups in Field', changeRate: 'changeRate', changeRatePer: 'changeRatePer',
        clusterFields: [
          {subTitle: 'Min Vags Per Cluster', key: 'minVolumeAccessCluster', perCluster: '/' , unitKey: 'unitVolumeAccessCluster'},
          {subTitle: 'Max Vags Per Cluster', key: 'maxVolumeAccessCluster', perCluster: '/' , unitKey: 'unitVolumeAccessCluster'},
          {subTitle: 'Avg Vags Per Cluster', key: 'avgVolumeAccessCluster', perCluster: '/' , unitKey: 'unitVolumeAccessCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return DashbergVolumeAccessService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.changeRatePer = percentDecFormat(Math.abs(this.clusterData.changeRate));
            })
        },
        nodeFields: [
          {subTitle: 'Min Vags Per Node', key: 'minVolumeAccessNode', perNode: '/' , unitKey: 'unitVolumeAccessNode'},
          {subTitle: 'Max Vags Per Node', key: 'maxVolumeAccessNode', perNode: '/' , unitKey: 'unitVolumeAccessNode'},
          {subTitle: 'Avg Vags Per Node', key: 'avgVolumeAccessNode', perNode: '/' , unitKey: 'unitVolumeAccessNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return DashbergVolumeAccessService.getData()
            .then( response => {
              this.nodeData = response;
              this.nodeData.stdDevNode = percentFormat(this.nodeData.stdDevNode);
            })
        },
      },
      {title: 'Cluster IOPs', sumNum: 'totalIOPs', description: 'Field Average: IOPs Per all clusters', changeRate: 'changeRate', changeRatePer: 'changeRatePer',
        clusterFields: [
          {subTitle: 'Min IOPs Per Cluster', key: 'minIOPsCluster', perCluster: '/' , unitKey: 'unitIOPsCluster'},
          {subTitle: 'Max IOPs Per Cluster', key: 'maxIOPsCluster', perCluster: '/' , unitKey: 'unitIOPsCluster'},
          {subTitle: 'Avg IOPs Per Cluster', key: 'avgIOPsCluster', perCluster: '/' , unitKey: 'unitIOPsCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return DashbergIOPService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.minIOPsCluster = numFormat(this.clusterData.minIOPsCluster);
              this.clusterData.maxIOPsCluster = numFormat(this.clusterData.maxIOPsCluster);
              this.clusterData.avgIOPsCluster = numFormat(this.clusterData.avgIOPsCluster);
              this.clusterData.unitIOPsCluster = numFormat(this.clusterData.unitIOPsCluster);
              this.clusterData.totalIOPs = numFormat(this.clusterData.totalIOPs);
              this.clusterData.changeRatePer = percentDecFormat(Math.abs(this.clusterData.changeRate));
            })
        },
        nodeFields: [
          {subTitle: 'Min IOPs Per Node', key: 'minIOPsNode', perNode: '/' , unitKey: 'unitIOPsNode'},
          {subTitle: 'Max IOPs Per Node', key: 'maxIOPsNode', perNode: '/' , unitKey: 'unitIOPsNode'},
          {subTitle: 'Avg IOPs Per Node', key: 'avgIOPsNode', perNode: '/' , unitKey: 'unitIOPsNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return DashbergIOPService.getData()
            .then( response => {
              this.nodeData = response;
              this.nodeData.stdDevNode = percentFormat(this.nodeData.stdDevNode);
              this.nodeData.minIOPsNode = numFormat(this.nodeData.minIOPsNode);
              this.nodeData.maxIOPsNode = numFormat(this.nodeData.maxIOPsNode);
              this.nodeData.avgIOPsNode = numFormat(this.nodeData.avgIOPsNode);
              this.nodeData.unitIOPsNode = numFormat(this.nodeData.unitIOPsNode);
              this.nodeData.totalIOPs = numFormat(this.nodeData.totalIOPs);
            })
        },
      },
      {title: 'Cluster Bandwidth', sumNum: 'totalBandwidth', description: 'Field Average: Bandwidth in Field', changeRate: 'changeRate', changeRatePer: 'changeRatePer',
        clusterFields: [
          {subTitle: 'Min Bandwidth Per Cluster', key: 'minBandwidthCluster', perCluster: '/' , unitKey: 'unitBandwidthCluster'},
          {subTitle: 'Max Bandwidth Per Cluster', key: 'maxBandwidthCluster', perCluster: '/' , unitKey: 'unitBandwidthCluster'},
          {subTitle: 'Avg Bandwidth Per Cluster', key: 'avgBandwidthCluster', perCluster: '/' , unitKey: 'unitBandwidthCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return DashbergBandwidthService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.minBandwidthCluster = bytesPerSecondFormat(this.clusterData.minBandwidthCluster);
              this.clusterData.maxBandwidthCluster = bytesPerSecondFormat(this.clusterData.maxBandwidthCluster);
              this.clusterData.avgBandwidthCluster = bytesPerSecondFormat(this.clusterData.avgBandwidthCluster);
              this.clusterData.unitBandwidthCluster = bytesPerSecondFormat(this.clusterData.unitBandwidthCluster);
              this.clusterData.totalBandwidth = bytesPerSecondFormat(this.clusterData.totalBandwidth);
              this.clusterData.changeRatePer = percentDecFormat(Math.abs(this.clusterData.changeRate));
            })
        },
        nodeFields: [
          {subTitle: 'Min Bandwidth Per Node', key: 'minBandwidthNode', perNode: '/' , unitKey: 'unitBandwidthNode'},
          {subTitle: 'Max Bandwidth Per Node', key: 'maxBandwidthNode', perNode: '/' , unitKey: 'unitBandwidthNode'},
          {subTitle: 'Avg Bandwidth Per Node', key: 'avgBandwidthNode', perNode: '/' , unitKey: 'unitBandwidthNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return DashbergBandwidthService.getData()
            .then( response => {
              this.nodeData = response;
              this.nodeData.stdDevNode = percentFormat(this.nodeData.stdDevNode);
              this.nodeData.minBandwidthNode = bytesPerSecondFormat(this.nodeData.minBandwidthNode);
              this.nodeData.maxBandwidthNode = bytesPerSecondFormat(this.nodeData.maxBandwidthNode);
              this.nodeData.avgBandwidthNode = bytesPerSecondFormat(this.nodeData.avgBandwidthNode);
              this.nodeData.unitBandwidthNode = bytesPerSecondFormat(this.nodeData.unitBandwidthNode);
              this.nodeData.totalBandwidth = bytesPerSecondFormat(this.nodeData.totalBandwidth);
            })
        },
      },
      {title: 'iSCSI Sessions', sumNum: 'totalSessions', description: 'iSCSI Sessions per Node', changeRate: 'changeRate', changeRatePer: 'changeRatePer',
        clusterFields: [
          {subTitle: 'Min iSCSI Sessions Per Cluster', key: 'minSessionsCluster', perCluster: '/' , unitKey: 'unitSessionsCluster'},
          {subTitle: 'Max iSCSI Sessions Per Cluster', key: 'maxSessionsCluster', perCluster: '/' , unitKey: 'unitSessionsCluster'},
          {subTitle: 'Avg iSCSI Sessions Per Cluster', key: 'avgSessionsCluster', perCluster: '/' , unitKey: 'unitSessionsCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return DashbergSessionService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.changeRatePer = percentDecFormat(Math.abs(this.clusterData.changeRate));
            })
        },
        nodeFields: [
          {subTitle: 'Min iSCSI Sessions Per Node', key: 'minSessionsNode', perNode: '/' , unitKey: 'unitSessionsNode'},
          {subTitle: 'Max iSCSI Sessions Per Node', key: 'maxSessionsNode', perNode: '/' , unitKey: 'unitSessionsNode'},
          {subTitle: 'Avg iSCSI Sessions Per Node', key: 'avgSessionsNode', perNode: '/' , unitKey: 'unitSessionsNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return DashbergSessionService.getData()
            .then( response => {
              this.nodeData = response;
              this.nodeData.stdDevNode = percentFormat(this.nodeData.stdDevNode);
            })
        },
      },
      {title: 'Total Snapshots', sumNum: 'totalSnapshots', description: 'Field Average: Snapshots per Volume', changeRate: 'changeRate', changeRatePer: 'changeRatePer',
        clusterFields: [
          {subTitle: 'Min Snapshots Per Cluster', key: 'minSnapshotsCluster', perCluster: '/' , unitKey: 'unitSnapshotsCluster'},
          {subTitle: 'Max Snapshots Per Cluster', key: 'maxSnapshotsCluster', perCluster: '/' , unitKey: 'unitSnapshotsCluster'},
          {subTitle: 'Avg Snapshots Per Cluster', key: 'avgSnapshotsCluster', perCluster: '/' , unitKey: 'unitSnapshotsCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return DashbergSnapshotService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.changeRatePer = percentDecFormat(Math.abs(this.clusterData.changeRate));
            })
        },
        nodeFields: [
          {subTitle: 'Min Snapshots Per Volume', key: 'minSnapshotsVolume', perNode: '/' , unitKey: 'unitSnapshotsVolume'},
          {subTitle: 'Max Snapshots Per Volume', key: 'maxSnapshotsVolume', perNode: '/' , unitKey: 'unitSnapshotsVolume'},
          {subTitle: 'Avg Snapshots Per Volume', key: 'avgSnapshotsVolume', perNode: '/' , unitKey: 'unitSnapshotsVolume'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return DashbergSnapshotService.getData()
            .then( response => {
              this.nodeData = response;
              this.nodeData.stdDevNode = percentFormat(this.nodeData.stdDevNode);
            })
        },
      }
    ]

    function percentFormat(percent) {
      return $filter('percent')(percent, 0, true, false, false, null, null);
    }
    function percentDecFormat(percentDec) {
      return $filter('percent')(percentDec, 1, true, false, false, null, null);
    }
    function bytesFormat(bytes) {
      return $filter('bytes')(bytes, false, 0, false, false);
    }
    function bytesPerSecondFormat(bytesPerSecond) {
      return $filter('bytes')(bytesPerSecond, false, 0, true, false);
    }
    function numFormat(num) {
      if (num >= 1000) num = num / 1000 + 'k';
      return num;
    }
  }
})();
