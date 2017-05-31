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
        ControlTowerController
        ]
    });

  function ControlTowerController(ControlTowerNodeService, ControlTowerVolumeService, ControlTowerVolumeSizeService) {
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
            })
        },
        nodeFields: [
          {subTitle: 'Min Nodes Per Node', key: 'minNodesNode', perCluster: '/' , unitKey: 'unitNodesNode'},
          {subTitle: 'Max Nodes Per Node', key: 'maxNodesNode', perCluster: '/' , unitKey: 'unitNodesNode'},
          {subTitle: 'Avg Nodes Per Node', key: 'avgNodesNode', perCluster: '/' , unitKey: 'unitNodesNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return ControlTowerNodeService.getData()
            .then( response => {
              this.nodeData = response;
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
            })
        },
        nodeFields: [
          {subTitle: 'Min Volumes Per Node', key: 'minVolumesNode', perCluster: '/' , unitKey: 'unitVolumeNode'},
          {subTitle: 'Max Volumes Per Node', key: 'maxVolumesNode', perCluster: '/' , unitKey: 'unitVolumeNode'},
          {subTitle: 'Avg Volumes Per Node', key: 'avgVolumesNode', perCluster: '/' , unitKey: 'unitVolumeNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return ControlTowerVolumeService.getData()
            .then( response => {
              this.nodeData = response;
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
            })
        },
        nodeFields: [
          {subTitle: 'Min Volume Size Per Node', key: 'minVolumeSizeNode', perCluster: '/' , unitKey: 'unitVolumeSizeNode'},
          {subTitle: 'Max Volume Size Per Node', key: 'maxVolumeSizeNode', perCluster: '/' , unitKey: 'unitVolumeSizeNode'},
          {subTitle: 'Avg Volume Size Per Node', key: 'avgVolumeSizeNode', perCluster: '/' , unitKey: 'unitVolumeSizeNode'},
          {subTitle: 'Standard Deviation', key: 'stdDevNode'}
        ],
        loadNodeData() {
          return ControlTowerVolumeSizeService.getData()
            .then( response => {
              this.nodeData = response;
            })
        },
      }
    ];
  }
})();
