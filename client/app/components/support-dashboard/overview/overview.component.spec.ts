'use strict';

describe('Component: SupportDashboardOverviewComponent', function() {
  let service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, AlertService) {
    service = AlertService;
    controller = $componentController('supportOverview');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
