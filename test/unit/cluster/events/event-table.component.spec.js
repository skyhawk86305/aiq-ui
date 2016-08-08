'use strict';

describe('Component: eventTable', function() {
  var el,
      rootScope,
      scope,
      routeParams,
      service,
      element,
      controller;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $compile, $httpBackend, $routeParams, EventTableService) {
    el = '<event-table></event-table>';
    rootScope = $rootScope;
    scope = $rootScope.$new();
    $httpBackend.when('POST', '/v2/api').respond();
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = EventTableService;
    spyOn(service, 'update');
    element = $compile(angular.element(el))(scope);
    scope.$digest();
    controller = element.controller('eventTable');
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
