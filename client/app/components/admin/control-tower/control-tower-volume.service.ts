(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ControlTowerVolumeService', [
      'DataService',
      ControlTowerVolumeService
    ]);

  function ControlTowerVolumeService(DataService) {
    
    this.getVolumeData = function() {
      let data = {title: 'Volumes in Clusters', sumNum: 16.5, description: 'Total Volumes in Field', numUnit: 'k', clusterData: [
        {subTitle: 'Min Volumes Per Cluster', dataDisplay: '2.5k/17.5k'},
        {subTitle: 'Max Volumes Per Cluster', dataDisplay: '17k/17.5k'},
        {subTitle: 'Avg Volumes Per Cluster', dataDisplay: '5.5k/17.5k'},
        {subTitle: 'Standard Deviation', dataDisplay: '71%'}],
      nodeData: [
        {subTitle: 'Min Volumes Per Node', dataDisplay: '1.4k/17.5k'},
        {subTitle: 'Max Volumes Per Node', dataDisplay: '20k/17.5k'},
        {subTitle: 'Avg Volumes Per Node', dataDisplay: '7.1k/17.5k'},
        {subTitle: 'Standard Deviation', dataDisplay: '71%'}]
      };
      return data;
    }
  }
})();
