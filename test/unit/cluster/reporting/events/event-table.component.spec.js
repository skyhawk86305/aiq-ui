'use strict';

describe('Component: eventTable', function() {
  var scope,
    routeParams,
    service,
    locals,
    bindings,
    controller;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $componentController, $httpBackend, $routeParams, EventTableService) {
    scope = $rootScope.$new();
    $httpBackend.when('POST', '/v2/api').respond();
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = EventTableService;
    spyOn(service, 'update');
    locals = {
      $scope: scope
    };
    bindings = {
      AuthService: service
    };
    controller = $componentController('eventTable', locals, bindings);
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
