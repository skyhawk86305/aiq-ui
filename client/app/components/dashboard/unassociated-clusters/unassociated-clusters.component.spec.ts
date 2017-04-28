'use strict';

describe('Component: unassociatedClusters', function() {
  let service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, UnassociatedClustersService) {
    service = UnassociatedClustersService;
    controller = $componentController('unassociatedClusters');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
