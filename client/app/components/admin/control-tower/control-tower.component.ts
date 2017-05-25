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
        {subTitle: "Standard Deviation", dataDisplay: "71%"}]}
    ];
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [ ...deps, ControlTowerController]
    });

})();
