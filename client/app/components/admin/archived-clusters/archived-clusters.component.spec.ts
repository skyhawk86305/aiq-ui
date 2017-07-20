'use strict';

describe('Component: archivedClusters', function() {
  let service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, ArchivedClustersService) {
    service = ArchivedClustersService;
    controller = $componentController('archivedClusters');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
