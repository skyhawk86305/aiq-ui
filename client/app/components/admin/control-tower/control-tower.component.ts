(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'controlTower';
  const template = require('./control-tower.tpl.html');

  angular
    .module(moduleName)
    .component(componentName, {
      template
    });

})();
