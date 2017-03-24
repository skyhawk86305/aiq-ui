(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'capacityLicensing';
  const template = require('./capacity-licensing.tpl.html');
  const deps = [ 'CapacityLicensingService' ];

  class CapacityLicensingController {
    public service;

    constructor(private CapacityLicensingService) {
      this.service = this.CapacityLicensingService;
    }
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [ ...deps, CapacityLicensingController]
    });

})();
