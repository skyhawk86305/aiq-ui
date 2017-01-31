'use strict';

describe('Component: apiCollectionTable', function() {
  let routeParams,
      service,
      controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $routeParams, APICollectionTableService) {
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = APICollectionTableService;
    spyOn(service, 'update');
    controller = $componentController('apiCollectionTable');
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
