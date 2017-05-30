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

    ctrl.items = [
      ControlTowerNodeService.getNodeData(),
      ControlTowerVolumeService.getVolumeData(),
      ControlTowerVolumeSizeService.getVolumeSizeData()
    ];
  }
})();
