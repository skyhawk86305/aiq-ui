'use strict';

describe('Component: nodeTable', function() {
  var scope,
    routeParams,
    service,
    locals,
    controller;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $componentController, $httpBackend, $routeParams, NodeTableService) {
    scope = $rootScope.$new();
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = NodeTableService;
    spyOn(service, 'update');
    locals = {
      $scope: scope
    };
    controller = $componentController('nodeTable', locals);
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
