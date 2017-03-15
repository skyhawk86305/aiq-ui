(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'clusterPairs';
  const template = require('./cluster-pairs.tpl.html');
  const deps = [ '$routeParams', 'ClusterPairsService' ];

  class ClusterPairsController {
    public service;

    constructor(private $routeParams, private ClusterPairsService) {
      this.service = this.ClusterPairsService;
      this.service.update(this.$routeParams.clusterID);
    }
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [ ...deps, ClusterPairsController]
    });

})();
