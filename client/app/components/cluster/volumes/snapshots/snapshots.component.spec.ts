'use strict';

describe('Component: snapshotTable', function() {
  let routeParams,
    service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $routeParams, SnapshotTableService) {
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = SnapshotTableService;
    spyOn(service, 'update');
    controller = $componentController('snapshotTable');
  }));

  describe('snapshot table initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });

    it('should update the table service with the clusterID from the route', function() {
      expect(service.update).toHaveBeenCalledWith('foobar');
    });
  });
});
