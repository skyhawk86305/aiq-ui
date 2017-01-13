'use strict';

describe('Component: overviewDashboard', function() {
  var scope,
    routeParams,
    controller,
    deferred,
    locals,
    filter,
    performanceService,
    clusterAlertTableService,
    dataService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('SFD3LineGraph', function () {});
  }));
  beforeEach(angular.mock.module('componentTemplates'));

  beforeEach(inject(function($rootScope, $q, $filter, $componentController, $routeParams, PerformanceGraphsService, ClusterAlertTableService, DataService) {
    scope = $rootScope;
    deferred = $q.defer();
    routeParams = $routeParams;
    routeParams.clusterID = '1';
    performanceService = PerformanceGraphsService;
    clusterAlertTableService = ClusterAlertTableService;
    dataService = DataService;
    filter = $filter;
    locals = {
      $routeParams: routeParams,
      $filter: filter,
      DataService: dataService,
      PerformanceGraphsService: performanceService,
      ClusterAlertTableService: clusterAlertTableService
    };
    spyOn(performanceService, 'update');
    spyOn(clusterAlertTableService, 'update');
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
    spyOn(dataService, 'callGraphAPI').and.returnValue(deferred.promise);
    controller = $componentController('overviewDashboard', locals);
  }));

  describe('initialization', function () {
    it('should expose graphs', function () {
      expect(controller.graphs).toBeDefined();
    });
  });

  describe('.$onInit', function() {
    it('should update the performance graphs service and clsuter alert table service with the clusterID from the route', function() {
      controller.$onInit();
      expect(performanceService.update).toHaveBeenCalledWith(routeParams.clusterID);
      expect(clusterAlertTableService.update).toHaveBeenCalledWith(routeParams.clusterID);
    });
    it('should expose cluster alert table service', function() {
      controller.$onInit();
      expect(controller.clusterAlertTableService).toBeDefined();
    });
    it('should set controller data', function() {
      controller.$onInit();
      deferred.resolve({data: 'foo', cluster: 'bar'});
      scope.$apply();
      expect(controller.clusterSummary).toEqual('bar');
      expect(controller.capacitySnapshot).toEqual('foo');
      expect(controller.performanceSnapshot).toEqual('foo');
    });
  });
});
