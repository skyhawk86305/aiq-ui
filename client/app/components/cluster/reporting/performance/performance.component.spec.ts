'use strict';

describe('Component: performanceGraphs', function() {
  let scope,
    routeParams,
    controller,
    deferred,
    locals,
    filter,
    performanceService;


  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('SFD3LineGraph', function () {});
    $provide.value('SFD3BarGraph', function () {});
  }));

  beforeEach(inject(function($rootScope, $q, $filter, $componentController, $routeParams, PerformanceGraphsService) {
    scope = $rootScope;
    deferred = $q.defer();
    routeParams = $routeParams;
    routeParams.clusterID = 1;
    performanceService = PerformanceGraphsService;
    filter = $filter;
    locals = {
      $routeParams: routeParams,
      $filter: filter,
      PerformanceGraphsService: performanceService
    };
    spyOn(performanceService, 'update');
    controller = $componentController('performanceGraphs', locals);
  }));

  describe('initialization', function () {
    it('should expose date range options and sync graphs', function () {
      controller.$onInit();
      expect(controller.staticDateRangeOptions).toBeDefined();
      expect(controller.syncGraphs).toBeDefined();
    });
  });

  describe('.$onInit', function() {
    it('should update the performance graphs service with the clusterID from the route', function() {
      controller.$onInit();
      expect(performanceService.update).toHaveBeenCalledWith(routeParams.clusterID);
    });
  });

});
