(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'controlTower';
  const template = require('./control-tower.tpl.html');
  const deps = [];


  class ControlTowerController {
    public service;
    public items = [
      {title: "Nodes in Clusters", sumNum: 539, description: "Total Nodes in Field", numUnit: "", viewData: [
        {subTitle: "Min Nodes Per Cluster", dataDisplay: "4/100"},
        {subTitle: "Max Nodes Per Cluster", dataDisplay: "82/100"},
        {subTitle: "Avg Nodes Per Cluster", dataDisplay: "24/100"},
        {subTitle: "Standard Deviation", dataDisplay: "62%"}]},
      {title: "Volumes in Clusters", sumNum: 16.5, description: "Total Volumes in Field", numUnit: "k", viewData: [
        {subTitle: "Min Volumes Per Cluster", dataDisplay: "2.5k/17.5k"},
        {subTitle: "Max Volumes Per Cluster", dataDisplay: "17k/17.5k"},
        {subTitle: "Avg Volumes Per Cluster", dataDisplay: "5.5k/17.5k"},
        {subTitle: "Standard Deviation", dataDisplay: "71%"}]},
      {title: "Volume Size", sumNum: 2.5, description: "Current Average Volume Size", numUnit: "TB", viewData: [
        {subTitle: "Min Volume Size Per Cluster", dataDisplay: "1.3GB/8TB"},
        {subTitle: "Max Volume Size Per Cluster", dataDisplay: "7TB/8TB"},
        {subTitle: "Avg Volume Size Per Cluster", dataDisplay: "2.5TB/8TB"},
        {subTitle: "Standard Deviation", dataDisplay: "52%"}]}
    ];
    
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [ ...deps, ControlTowerController]
    });

})();
