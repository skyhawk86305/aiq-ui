(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerVolumeSizeService', [
      'DataService',
      ControlTowerVolumeSizeService
    ]);

  function ControlTowerVolumeSizeService(DataService) {
    
    this.getVolumeSizeData = function() {
      let data = {title: 'Volume Size', sumNum: 2.5, description: 'Current Average Volume Size', numUnit: 'TB', clusterData: [
        {subTitle: 'Min Volume Size Per Cluster', dataDisplay: '1.3GB/8TB'},
        {subTitle: 'Max Volume Size Per Cluster', dataDisplay: '7TB/8TB'},
        {subTitle: 'Avg Volume Size Per Cluster', dataDisplay: '2.5TB/8TB'},
        {subTitle: 'Standard Deviation', dataDisplay: '52%'}],
      nodeData: [
        {subTitle: 'Min Volume Size Per Node', dataDisplay: '2GB/8TB'},
        {subTitle: 'Max Volume Size Per Node', dataDisplay: '9TB/8TB'},
        {subTitle: 'Avg Volume Size Per Node', dataDisplay: '3TB/8TB'},
        {subTitle: 'Standard Deviation', dataDisplay: '52%'}]
      };
      return data;
    }
  }
})();
