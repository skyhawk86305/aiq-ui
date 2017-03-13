(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'suppressedClusters';
  const template = require('./suppressed-clusters.tpl.html');
  const deps = [ 'SuppressedClustersService' ];

  class SuppressedClustersController {
    public service;

    constructor(private SuppressedClustersService) {
      this.service = this.SuppressedClustersService;
    }
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [ ...deps, SuppressedClustersController]
    });

})();
