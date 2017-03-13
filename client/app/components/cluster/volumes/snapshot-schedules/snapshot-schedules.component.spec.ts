'use strict';

describe('Component: snapshotSchedulesTable', function() {
  let routeParams,
    service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $routeParams, SnapshotSchedulesTableService) {
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = SnapshotSchedulesTableService;
    spyOn(service, 'update');
    controller = $componentController('snapshotSchedulesTable');
  }));

  describe('snapshot schedules table initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });

    it('should update the table service with the clusterID from the route', function() {
      expect(service.update).toHaveBeenCalledWith('foobar');
    });
  });
});
