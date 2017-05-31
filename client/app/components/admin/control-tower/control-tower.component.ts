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
          {subTitle: 'Min Nodes Per Cluster', key: 'minNodes' },
          {subTitle: 'Max Nodes Per Cluster', key: 'maxNodes'},
          {subTitle: 'Avg Nodes Per Cluster', key: 'avgNodes'},
          {subTitle: 'Standard Deviation', key: 'stdDev'}
        ],
        loadClusterData() {
          return ControlTowerNodeService.getData()
            .then( response => {
              this.clusterData = response;
            })
        },
        nodeFields: [
          {subTitle: 'Min Nodes Per Node', key: 'minNodes'},
          {subTitle: 'Max Nodes Per Node', key: 'maxNodes'},
          {subTitle: 'Avg Nodes Per Node', key: 'avgNodes'},
          {subTitle: 'Standard Deviation', key: 'stdDev'}
        ],
        loadNodeData() {
          return ControlTowerNodeService.getData()
            .then( response => {
              this.nodeData = response;
            })
        },
      },
      {title: 'Nodes in Clusters', sumNum: 'totalVolumes', description: 'Total Nodes in Field',
        clusterFields: [
          {subTitle: 'Min Nodes Per Cluster', key: 'minVolumes' },
          {subTitle: 'Max Nodes Per Cluster', key: 'maxVolumes'},
          {subTitle: 'Avg Nodes Per Cluster', key: 'avgVolumes'},
          {subTitle: 'Standard Deviation', key: 'stdDev'}
        ],
        loadClusterData() {
          return ControlTowerVolumeService.getData()
            .then( response => {
              this.clusterData = response;
            })
        },
        nodeFields: [
          {subTitle: 'Min Nodes Per Node', key: 'minVolumes'},
          {subTitle: 'Max Nodes Per Node', key: 'maxVolumes'},
          {subTitle: 'Avg Nodes Per Node', key: 'avgVolumes'},
          {subTitle: 'Standard Deviation', key: 'stdDev'}
        ],
        loadNodeData() {
          return ControlTowerVolumeService.getData()
            .then( response => {
              this.nodeData = response;
            })
        },
      },
      {title: 'Nodes in Clusters', sumNum: 'totalVolumeSize', description: 'Total Nodes in Field', numUnit: '',
        clusterFields: [
          {subTitle: 'Min Nodes Per Cluster', key: 'minVolumeSize' },
          {subTitle: 'Max Nodes Per Cluster', key: 'maxVolumeSize'},
          {subTitle: 'Avg Nodes Per Cluster', key: 'avgVolumeSize'},
          {subTitle: 'Standard Deviation', key: 'stdDev'}
        ],
        loadClusterData() {
          return ControlTowerVolumeSizeService.getData()
            .then( response => {
              this.clusterData = response;
            })
        },
        nodeFields: [
          {subTitle: 'Min Nodes Per Node', key: 'minVolumeSize'},
          {subTitle: 'Max Nodes Per Node', key: 'maxVolumeSize'},
          {subTitle: 'Avg Nodes Per Node', key: 'avgVolumeSize'},
          {subTitle: 'Standard Deviation', key: 'stdDev'}
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
