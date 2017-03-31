(function () {
  'use strict';

  const _ = require('lodash');

  const moduleName = 'aiqUi';
  const componentName = 'capacityLicensingDetails';
  const template = require('./capacity-licensing-details.tpl.html');
  const deps = [
    '$routeParams',
    'DataService',
    'CapacityLicensedClusterService',
    'CapacityLicensedNodeService',
  ];

  class CapacityLicensingDetailsController {
    public customerName: String;
    public entitledCapacity: Number;
    public provisionedLicensedCapacity: Number;

    public getEntitledCapacityState: String;

    private customerID: Number;

    constructor(
      private $routeParams,
      private DataService,
      private CapacityLicensedClusterService,
      private CapacityLicensedNodeService
    ) {
      this.customerID = parseInt($routeParams.customerID, 10);
    }

    $onInit() {
      this.CapacityLicensedClusterService.update(this.customerID);
      this.CapacityLicensedNodeService.update(this.customerID);
      this.getInfoBarData();
    }

    private getInfoBarData() {
      this.getEntitledCapacityState = 'loading';
      return this.DataService.callAPI('GetEntitledCapacity', { customerID: this.customerID })
        .then( result => {
          this.getEntitledCapacityState = 'loaded';
          Object.assign(this, _.pick(result, [
            'customerName', 'entitledCapacity', 'provisionedLicensedCapacity',
          ]));
        })
        .catch( err => {
          this.getEntitledCapacityState = 'error';
        });
    }
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [ ...deps, CapacityLicensingDetailsController]
    });

})();
