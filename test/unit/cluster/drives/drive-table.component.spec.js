'use strict';

describe('Component: driveTable', function() {
  var scope,
    routeParams,
    service,
    locals,
    bindings,
    controller;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $httpBackend, $componentController, $routeParams, DriveTableService) {
    scope = $rootScope.$new();
    $httpBackend.when('POST', '/v2/api').respond();
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = DriveTableService;
    spyOn(service, 'update');
    locals = {
      $scope: scope
    };
    bindings = {
      AuthService: service
    };
    controller = $componentController('driveTable', locals, bindings);
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
