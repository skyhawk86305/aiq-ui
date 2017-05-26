(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'controlTower';
  const template = require('./control-tower.tpl.html');

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [
        ControlTowerController
        ]
    });

  function ControlTowerController() {
    let ctrl = this;

    ctrl.items = [
      {title: 'Nodes in Clusters', sumNum: 539, description: 'Total Nodes in Field', numUnit: '', clusterData: [
        {subTitle: 'Min Nodes Per Cluster', dataDisplay: '4/100'},
        {subTitle: 'Max Nodes Per Cluster', dataDisplay: '82/100'},
        {subTitle: 'Avg Nodes Per Cluster', dataDisplay: '24/100'},
        {subTitle: 'Standard Deviation', dataDisplay: '62%'}],
      nodeData: [
        {subTitle: '', dataDisplay: ''},
        {subTitle: '', dataDisplay: ''},
        {subTitle: '', dataDisplay: ''},
        {subTitle: '', dataDisplay: ''}]
      },
      {title: 'Volumes in Clusters', sumNum: 16.5, description: 'Total Volumes in Field', numUnit: 'k', clusterData: [
        {subTitle: 'Min Volumes Per Cluster', dataDisplay: '2.5k/17.5k'},
        {subTitle: 'Max Volumes Per Cluster', dataDisplay: '17k/17.5k'},
        {subTitle: 'Avg Volumes Per Cluster', dataDisplay: '5.5k/17.5k'},
        {subTitle: 'Standard Deviation', dataDisplay: '71%'}],
      nodeData: [
        {subTitle: 'Min Volumes Per Node', dataDisplay: '1.4k/17.5k'},
        {subTitle: 'Max Volumes Per Node', dataDisplay: '20k/17.5k'},
        {subTitle: 'Avg Volumes Per Node', dataDisplay: '7.1k/17.5k'},
        {subTitle: 'Standard Deviation', dataDisplay: '71%'}]
      },
      {title: 'Volume Size', sumNum: 2.5, description: 'Current Average Volume Size', numUnit: 'TB', clusterData: [
        {subTitle: 'Min Volume Size Per Cluster', dataDisplay: '1.3GB/8TB'},
        {subTitle: 'Max Volume Size Per Cluster', dataDisplay: '7TB/8TB'},
        {subTitle: 'Avg Volume Size Per Cluster', dataDisplay: '2.5TB/8TB'},
        {subTitle: 'Standard Deviation', dataDisplay: '52%'}],
        nodeData: [
        {subTitle: 'Min Volume Size Per Node', dataDisplay: '2GB/8TB'},
        {subTitle: 'Max Volume Size Per Node', dataDisplay: '9TB/8TB'},
        {subTitle: 'Avg Volume Size Per Node', dataDisplay: '3TB/8TB'},
        {subTitle: 'Standard Deviation', dataDisplay: '52%'}]
      }
    ];
  }
})();
