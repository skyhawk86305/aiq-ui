'use strict';

describe('Component: volumeTable', function() {
  var routeParams,
    service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $routeParams, VolumeTableService) {
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = VolumeTableService;
    spyOn(service, 'update');
    controller = $componentController('volumeTable');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });

    it('should update the table service with the clusterID from the route', function() {
      expect(service.update).toHaveBeenCalledWith('foobar');
    });
  });

});
