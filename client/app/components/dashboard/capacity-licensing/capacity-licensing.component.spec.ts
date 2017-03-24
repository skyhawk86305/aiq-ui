'use strict';

describe('Component: capacityLicensing', function() {
  let service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, CapacityLicensingService) {
    service = CapacityLicensingService;
    controller = $componentController('capacityLicensing');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
