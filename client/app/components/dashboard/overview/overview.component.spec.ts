'use strict';

describe('Component: dashboardOverview', function() {
  let service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, ClusterService) {
    service = ClusterService;
    controller = $componentController('dashboardOverview');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.ClusterService).toEqual(service);
    });
  });

});
