(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerNodeService', [
      'DataService',
      ControlTowerNodeService
    ]);

  function ControlTowerNodeService(DataService) {
    
    this.getNodeData = function() {
      let data = {title: 'Nodes in Clusters', sumNum: 539, description: 'Total Nodes in Field', numUnit: '', clusterData: [
          {subTitle: 'Min Nodes Per Cluster', dataDisplay: '4/100'},
          {subTitle: 'Max Nodes Per Cluster', dataDisplay: '82/100'},
          {subTitle: 'Avg Nodes Per Cluster', dataDisplay: '24/100'},
          {subTitle: 'Standard Deviation', dataDisplay: '62%'}],
        nodeData: [
          {subTitle: '', dataDisplay: ''},
          {subTitle: '', dataDisplay: ''},
          {subTitle: '', dataDisplay: ''},
          {subTitle: '', dataDisplay: ''}
        ]
      };
      return data;
    }
  }
})();
