'use strict';

describe('Component: errorLogTable', function() {
  var routeParams,
    service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $routeParams, ErrorLogTableService) {
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = ErrorLogTableService;
    spyOn(service, 'update');
    controller = $componentController('errorLogTable');
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
