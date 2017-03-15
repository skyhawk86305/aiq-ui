'use strict';

describe('Component: clusterPairs', function() {
  let service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, ClusterPairsService) {
    service = ClusterPairsService;
    controller = $componentController('clusterPairs');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
