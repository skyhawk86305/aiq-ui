'use strict';

describe('Component: driveTable', function() {
  let routeParams,
    service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $routeParams, DriveTableService) {
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = DriveTableService;
    spyOn(service, 'update');
    controller = $componentController('driveTable');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
      expect(controller.quickFilter).toEqual({
        column: 'status',
        values: ['active', 'available', 'failed'],
        labels: {
          active: 'Active',
          available: 'Available',
          failed: 'Failed'
        },
        default: 'active'
      });
    });

    it('should update the table service with the clusterID from the route', function() {
      expect(service.update).toHaveBeenCalledWith('foobar');
    });
  });

});
