(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'volumePairs';
  const template = require('./volume-pairs.tpl.html');
  const deps = [ '$routeParams', 'VolumePairsService' ];

  class VolumePairsController {
    public service;

    constructor(private $routeParams, private VolumePairsService) {
      this.service = this.VolumePairsService;
      this.service.update(this.$routeParams.clusterID);
    }
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [ ...deps, VolumePairsController]
    });

})();
