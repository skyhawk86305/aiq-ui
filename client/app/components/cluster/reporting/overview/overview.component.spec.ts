'use strict';

describe('Component: overviewDashboard', function() {
  let scope,
    routeParams,
    location,
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

  beforeEach(inject(function($rootScope, $q, $filter, $location, $componentController, $routeParams, PerformanceGraphsService, ClusterAlertTableService, DataService) {
    scope = $rootScope;
    deferred = $q.defer();
    routeParams = $routeParams;
    routeParams.clusterID = '1';
    location = $location;
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
    spyOn(dataService, 'callGuzzleAPI').and.returnValue(deferred.promise);
    spyOn(location, 'path');
    controller = $componentController('overviewDashboard', locals);
  }));

  describe('initialization', function () {
    it('should expose graphs', function () {
      expect(controller.graphs).toBeDefined();
    });
  });

  describe('.$onInit', function() {
    it('should update the performance graphs service with the clusterID from the route', function() {
      controller.$onInit();
      expect(performanceService.update).toHaveBeenCalledWith(routeParams.clusterID);
    });
    describe('when given API responses with data', function () {
      it('should set controller data', function() {
        controller.$onInit();
        deferred.resolve({data: 'foo', cluster: { name: 'bar', clusterVersion: 'baz'}, clusterInfo: {encryptionAtRestState: 'enabled'}, sessions: [1,2,3,4,5], volumes: [1,2,3,4,5,6,7,8], nodes: [{platformInfo: {nodeType: 'ABC'}}, {platformInfo: {nodeType: 'ABC'}}]});
        scope.$apply();
        expect(controller.clusterSummary).toEqual({name: 'bar', clusterVersion: 'baz'});
        expect(controller.encryptionAtRestState).toEqual('ENABLED');
        expect(controller.iSCSISessionsCount).toEqual(5);
        expect(controller.volumesCount).toEqual(8);
        expect(controller.nodeCount).toEqual('2 - ABC');
      });
    });

    describe('when given empty API responses', function () {
      it('should set controller data with defaults', function () {
        controller.$onInit();
        deferred.resolve({});
        scope.$apply();
        expect(controller.clusterSummary).toBeUndefined();
        expect(controller.encryptionAtRestState).toEqual('-');
        expect(controller.iSCSISessionsCount).toEqual(0);
        expect(controller.volumesCount).toEqual(0);
        expect(controller.nodeCount).toEqual('-');
      });
    });

    describe('when given an error API response', function () {
      it('should set error states', function () {
        controller.$onInit();
        deferred.reject();
        scope.$apply();
        expect(controller.getClusterSummaryState).toEqual('error');
        expect(controller.getActiveVolumesState).toEqual('error');
        expect(controller.getActiveNodesState).toEqual('error');
        expect(controller.getClusterInfoState).toEqual('error');
        expect(controller.getISCSISessionsState).toEqual('error');
      });
    });
  });

   describe('.refreshInfoBarData', function () {
    it('should call .setInfoBarData', function () {
      controller.refreshInfoBarData();
      expect(dataService.callAPI).toHaveBeenCalled();
    });
  });

   describe('.getHref', function() {
     describe('when provided a path with a leading /', function() {
       it('should set the location to the correct cluster path', function() {
         expect(controller.getHref('/path/to/page')).toEqual('#/cluster/' + routeParams.clusterID + '/path/to/page');
       });
     });

     describe('when provided a path without a leading /', function() {
       it('should set the location to the correct cluster path', function() {
         expect(controller.getHref('path/to/page')).toEqual('#/cluster/' + routeParams.clusterID + '/path/to/page');
       });
     });
   });
});
