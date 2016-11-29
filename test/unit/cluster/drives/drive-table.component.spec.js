'use strict';

describe('Component: driveTable', function() {
  var routeParams,
    service,
    controller;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

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
    });

    it('should update the table service with the clusterID from the route', function() {
      expect(service.update).toHaveBeenCalledWith('foobar');
    });
  });

});
