'use strict';

describe('Component: suppressedClusters', function() {
  let service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, SuppressedClustersService) {
    service = SuppressedClustersService;
    controller = $componentController('suppressedClusters');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
