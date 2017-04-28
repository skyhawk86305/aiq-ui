(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'unassociatedClusters';
  const template = require('./unassociated-clusters.tpl.html');
  const deps = [ 'UnassociatedClustersService' ];

  class UnassociatedClustersController {
    public service;

    constructor(private UnassociatedClustersService) {
      this.service = this.UnassociatedClustersService;
    }
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [ ...deps, UnassociatedClustersController]
    });

})();
