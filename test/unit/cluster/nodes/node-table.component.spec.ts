'use strict';

describe('Component: nodeTable', function() {
  var routeParams,
    service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(angular.mock.module('componentTemplates'));

  beforeEach(inject(function($componentController, $routeParams, NodeTableService) {
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = NodeTableService;
    spyOn(service, 'update');
    controller = $componentController('nodeTable');
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
