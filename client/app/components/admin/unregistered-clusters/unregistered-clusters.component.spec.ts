'use strict';

describe('Component: unregisteredClusters', function() {
  let service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, UnregisteredClustersService) {
    service = UnregisteredClustersService;
    controller = $componentController('unregisteredClusters');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
