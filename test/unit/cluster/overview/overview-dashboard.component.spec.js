'use strict';

describe('Component: overviewDashboard', function() {
  var scope,
    routeParams,
    controller,
    callAPIResponse,
    callGraphAPIResponse,
    callAPIDeferred,
    callGraphAPIDeferred,
    locals,
    filter,
    performanceService,
    clusterAlertTableService,
    dataService;

  beforeEach(module('aiqUi', function ($provide) {
    $provide.value('SFD3LineGraph', function () {});
  }));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $q, $filter, $componentController, $routeParams, PerformanceGraphsService, ClusterAlertTableService, DataService) {
    scope = $rootScope;
    callAPIDeferred = $q.defer();
    callGraphAPIDeferred = $q.defer();
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
    spyOn(dataService, 'callAPI').and.returnValue(callAPIDeferred.promise);
    spyOn(dataService, 'callGraphAPI').and.returnValue(callGraphAPIDeferred.promise);
    controller = $componentController('overviewDashboard', locals);
  }));

  describe('initialization', function () {
    it('should expose graphs', function () {
      expect(controller.graphs).toBeDefined();
    });
  });

  describe('.$onInit', function() {
    beforeEach(function() {
      callAPIResponse = {
        cluster: {
          clusterName: 'foo',
          nodeCount: 1,
          clusterFull: {
            blockFullness: 'bar',
            metadataFullness: 'baz'
          },
          unresolvedFaults: {
            warning: 2,
            error:3
          }
        }
      };
      callGraphAPIResponse = {
        data: {
          clusterUtilizationPct: 1,
          totalOpsPerSec: 2,
          totalBytesPerSec: 3,
          efficiencyFactor: 2
        }
      };
    });

    it('should update the performance graphs service and clsuter alert table service with the clusterID from the route', function() {
      controller.$onInit();
      expect(performanceService.update).toHaveBeenCalledWith(routeParams.clusterID);
      expect(clusterAlertTableService.update).toHaveBeenCalledWith(routeParams.clusterID);
    });
    it('should expose cluster alert table service', function() {
      controller.$onInit();
      expect(controller.clusterAlertTableService).toBeDefined();
    });
    it('should set cluster name and infobar data', function() {
      controller.$onInit();
      callAPIDeferred.resolve(callAPIResponse);
      callGraphAPIDeferred.resolve(callGraphAPIResponse);
      scope.$apply();
      expect(controller.clusterName).toBe('foo');
      expect(controller.infoBar).toEqual({
        nodeCount: 1,
        blockCapacity: 'bar',
        metadataCapacity: 'baz',
        clusterFaults: {
          warning: 2,
          error: 3
        },
        efficiency: 2,
        utilization: 1,
        iops: 2,
        throughput:3
      });
    });
    it('should set clustersFaults warning and error to 0 if unresolved faults warning or error is undefined', function() {
      controller.$onInit();
      callAPIResponse.cluster.unresolvedFaults = {};
      callAPIDeferred.resolve(callAPIResponse);
      callGraphAPIDeferred.resolve(callGraphAPIResponse);
      scope.$apply();
      expect(controller.clusterName).toBe('foo');
      expect(controller.infoBar.clusterFaults).toEqual({
          warning: 0,
          error: 0
      });
    });
  });
});
