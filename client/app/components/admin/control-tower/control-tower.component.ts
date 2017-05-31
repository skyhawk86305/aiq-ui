(function () {
  'use strict';

  const d3 = require('d3');
  const moduleName = 'aiqUi';
  const componentName = 'controlTower';
  const template = require('./control-tower.tpl.html');

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [
        'ControlTowerNodeService',
        'ControlTowerVolumeService',
        'ControlTowerVolumeSizeService',
        '$filter',
        ControlTowerController
        ]
    });

  function ControlTowerController(ControlTowerNodeService, ControlTowerVolumeService, ControlTowerVolumeSizeService, $filter) {
    let ctrl = this;

    ctrl.$onInit = function() {
      ctrl.items.forEach( item => {
        item.loadClusterData();
        item.loadNodeData();
      })
    }

    ctrl.items = [
      {title: 'Nodes in Clusters', sumNum: 'totalNodes', description: 'Total Nodes in Field',
        clusterFields: [
          {subTitle: 'Min Nodes Per Cluster', key: 'minNodesCluster', perCluster: '/', unitKey: 'unitNodesCluster'},
          {subTitle: 'Max Nodes Per Cluster', key: 'maxNodesCluster', perCluster: '/', unitKey: 'unitNodesCluster'},
          {subTitle: 'Avg Nodes Per Cluster', key: 'avgNodesCluster', perCluster: '/', unitKey: 'unitNodesCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return ControlTowerNodeService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.totalNodes = numFormat(this.clusterData.totalNodes);
            })
        },
        nodeFields: [
          {subTitle: 'Min Nodes Per Node', key: 'minNodesNode', perNode: '/' , unitKey: 'unitNodesNode'},
          {subTitle: 'Max Nodes Per Node', key: 'maxNodesNode', perNode: '/' , unitKey: 'unitNodesNode'},
          {subTitle: 'Avg Nodes Per Node', key: 'avgNodesNode', perNode: '/' , unitKey: 'unitNodesNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return ControlTowerNodeService.getData()
            .then( response => {
              this.nodeData = response;
              this.nodeData.stdDevNode = percentFormat(this.nodeData.stdDevNode);
              this.nodeData.totalNodes = numFormat(this.nodeData.totalNodes);
            })
        },
      },
      {title: 'Volumes in Clusters', sumNum: 'totalVolumes', description: 'Total Volumes in Field',
        clusterFields: [
          {subTitle: 'Min Volumes Per Cluster', key: 'minVolumesCluster', perCluster: '/' , unitKey: 'unitVolumeCluster'},
          {subTitle: 'Max Volumes Per Cluster', key: 'maxVolumesCluster', perCluster: '/' , unitKey: 'unitVolumeCluster'},
          {subTitle: 'Avg Volumes Per Cluster', key: 'avgVolumesCluster', perCluster: '/' , unitKey: 'unitVolumeCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return ControlTowerVolumeService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.minVolumesCluster = numFormat(this.clusterData.minVolumesCluster);
              this.clusterData.maxVolumesCluster = numFormat(this.clusterData.maxVolumesCluster);
              this.clusterData.avgVolumesCluster = numFormat(this.clusterData.avgVolumesCluster);
              this.clusterData.unitVolumeCluster = numFormat(this.clusterData.unitVolumeCluster);
              this.clusterData.totalVolumes = numFormat(this.clusterData.totalVolumes);
            })
        },
        nodeFields: [
          {subTitle: 'Min Volumes Per Node', key: 'minVolumesNode', perNode: '/' , unitKey: 'unitVolumeNode'},
          {subTitle: 'Max Volumes Per Node', key: 'maxVolumesNode', perNode: '/' , unitKey: 'unitVolumeNode'},
          {subTitle: 'Avg Volumes Per Node', key: 'avgVolumesNode', perNode: '/' , unitKey: 'unitVolumeNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return ControlTowerVolumeService.getData()
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
      {title: 'Volume Size', sumNum: 'totalVolumeSize', description: 'Current Average Volume Size',
        clusterFields: [
          {subTitle: 'Min Volume Size Per Cluster', key: 'minVolumeSizeCluster', perCluster: '/' , unitKey: 'unitVolumeSizeCluster'},
          {subTitle: 'Max Volume Size Per Cluster', key: 'maxVolumeSizeCluster', perCluster: '/' , unitKey: 'unitVolumeSizeCluster'},
          {subTitle: 'Avg Volume Size Per Cluster', key: 'avgVolumeSizeCluster', perCluster: '/' , unitKey: 'unitVolumeSizeCluster'},
          {subTitle: 'Standard Deviation', key: 'stdDevCluster'}
        ],
        loadClusterData() {
          return ControlTowerVolumeSizeService.getData()
            .then( response => {
              this.clusterData = response;
              this.clusterData.stdDevCluster = percentFormat(this.clusterData.stdDevCluster);
              this.clusterData.minVolumeSizeCluster = bytesFormat(this.clusterData.minVolumeSizeCluster);
              this.clusterData.maxVolumeSizeCluster = bytesFormat(this.clusterData.maxVolumeSizeCluster);
              this.clusterData.avgVolumeSizeCluster = bytesFormat(this.clusterData.avgVolumeSizeCluster);
              this.clusterData.totalVolumeSize = bytesFormat(this.clusterData.totalVolumeSize);
              this.clusterData.unitVolumeSizeCluster = bytesFormat(this.clusterData.unitVolumeSizeCluster);
            })
        },
        nodeFields: [
          {subTitle: 'Min Volume Size Per Node', key: 'minVolumeSizeNode', perNode: '/' , unitKey: 'unitVolumeSizeNode'},
          {subTitle: 'Max Volume Size Per Node', key: 'maxVolumeSizeNode', perNode: '/' , unitKey: 'unitVolumeSizeNode'},
          {subTitle: 'Avg Volume Size Per Node', key: 'avgVolumeSizeNode', perNode: '/' , unitKey: 'unitVolumeSizeNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return ControlTowerVolumeSizeService.getData()
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
      }
    ]

    function percentFormat(percent) {
      return $filter('percent')(percent, 0, true, false, false, null, null);
    }
    function bytesFormat(bytes) {
      return $filter('bytes')(bytes, false, 0, false, false);
    }
    function numFormat(num) {
      if(num >= 1000) num = num/1000 + 'k';
      return num;
    }
  }
})();
