'use strict';

describe('Component: bindingTable', function() {
  var routeParams,
    service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $routeParams, BindingTableService) {
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = BindingTableService;
    spyOn(service, 'update');
    controller = $componentController('bindingTable');
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

