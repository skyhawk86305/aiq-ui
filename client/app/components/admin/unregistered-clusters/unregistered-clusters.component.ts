(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'unregisteredClusters';
  const template = require('./unregistered-clusters.tpl.html');
  const deps = [ 'UnregisteredClustersService' ];

  class UnregisteredClustersController {
    public service;

    constructor(private UnregisteredClustersService) {
      this.service = this.UnregisteredClustersService;
    }
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [ ...deps, UnregisteredClustersController]
    });

})();
