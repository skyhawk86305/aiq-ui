'use strict';

describe('Component: volumePairs', function() {
  let service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, VolumePairsService) {
    service = VolumePairsService;
    controller = $componentController('volumePairs');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
