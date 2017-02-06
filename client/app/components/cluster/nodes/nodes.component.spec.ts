'use strict';

describe('Component: nodeTable', function() {
  let scope,
    deferred,
    routeParams,
    service,
    dataService,
    locals,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $rootScope, $q, $routeParams, NodeTableService, DataService) {
    scope = $rootScope;
    deferred = $q.defer();
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    service = NodeTableService;
    dataService = DataService;
    locals = {
      $routeParams: routeParams,
      DataService: dataService
    };
    spyOn(service, 'update');
    spyOn(dataService, 'callGuzzleAPI').and.returnValue(deferred.promise);
    controller = $componentController('nodeTable', locals);
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

  describe('.$onInit', function() {
    it('should update the table service with the clusterID from the route', function() {
      controller.$onInit();
      expect(service.update).toHaveBeenCalledWith('foobar');
    });

    it('should callGuzzleAPI and bind the response to the controller', function() {
      controller.$onInit();
      deferred.resolve({clusterInfo: 'foobar'});
      scope.$apply();
      expect(controller.clusterInfo).toEqual('foobar');
    });

    it('should handle errors from callGuzzleAPI', function() {
      controller.$onInit();
      deferred.reject();
      scope.$apply();
      expect(controller.getClusterInfoState).toEqual('error');
    });
  });
});
