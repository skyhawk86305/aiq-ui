'use strict';

describe('Component: nodeTable', function() {
  var el,
      rootScope,
      scope,
      routeParams,
      service,
      element,
      controller;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $compile, $httpBackend, $routeParams, NodeTableService) {
    el = '<node-table></node-table>';
    rootScope = $rootScope;
    scope = $rootScope.$new();
    $httpBackend.when('POST', '/v2/api').respond();
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = NodeTableService;
    spyOn(service, 'update');
    element = $compile(angular.element(el))(scope);
    scope.$digest();
    controller = element.controller('nodeTable');
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
