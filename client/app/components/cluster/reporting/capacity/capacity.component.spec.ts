'use strict';

describe('Component: capacityGraphs', function() {
  let $scope,
    $q,
    $routeParams,
    DataService,
    controller,
    deferred,
    apiFailure,
    locals,
    CapacityGraphsService;


  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('SFD3LineGraph', function () {});
    $provide.value('SFD3BarGraph', function () {});
  }));

  beforeEach(inject(function(_$q_, _$routeParams_, _DataService_, _CapacityGraphsService_, $rootScope, $componentController) {
    $q = _$q_;
    $routeParams = _$routeParams_;
    DataService = _DataService_;
    CapacityGraphsService = _CapacityGraphsService_;

    $scope = $rootScope.$new();
    $routeParams.clusterID = '1';
    deferred = $q.defer();
    locals = { $scope, $routeParams, DataService, CapacityGraphsService };
    spyOn(CapacityGraphsService, 'update');
    controller = $componentController('capacityGraphs', locals);
  }));

  describe('initialization', function () {
    it('should expose date range options and sync graphs', function () {
      expect(controller.staticDateRangeOptions).toBeDefined();
      expect(controller.syncGraphs).toBeDefined();
    });
  });

  describe('.$onInit', function() {
    it('should update the capacity graphs service with the clusterID from the route', function() {
      controller.$onInit();
      expect(CapacityGraphsService.update).toHaveBeenCalledWith($routeParams.clusterID);
    });

  });

  describe('.updateInfoBar', function () {
    it('should call the appropriate API methods with the clusterID', function () {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      controller.updateInfoBar();
      $scope.$digest();
      expect(DataService.callAPI).toHaveBeenCalledWith('GetClusterFullThreshold', {clusterID: 1});
      expect(DataService.callAPI).toHaveBeenCalledWith('GetClusterFullPrediction', {clusterID: 1});
    });

    it('should expose the data for use in the template', function () {
      const clusterFullThresholdResponse = { clusterFullThreshold: 'foo' };
      const clusterFullPredictionResponse = { clusterFullPrediction: 'bar' };
      spyOn(DataService, 'callAPI').and.callFake( (method, params) => {
        if (method === 'GetClusterFullThreshold') return $q.resolve(clusterFullThresholdResponse);
        if (method === 'GetClusterFullPrediction') return $q.resolve(clusterFullPredictionResponse);
      });
      controller.updateInfoBar()
        .then( () => {
          expect(controller.clusterFullThreshold).toEqual('foo');
          expect(controller.clusterFullPrediction).toEqual('bar');
        });
      $scope.$digest();
    });

    it('should set getClusterFullThresholdState to \'error\' if the callAPI promise is rejected', function (done) {
      spyOn(DataService, 'callAPI').and.callFake( (method, params) => {
        if (method === 'GetClusterFullThreshold') return $q.reject();
        if (method === 'GetClusterFullPrediction') return $q.resolve();
      });
      controller.updateInfoBar()
        .then( () => {
          expect(controller.getClusterFullThresholdState).toEqual('error');
          done();
        });
      $scope.$digest();
    });

    it('should set getClusterFullPredictionState to \'error\' if the callAPI promise is rejected', function (done) {
      spyOn(DataService, 'callAPI').and.callFake( (method, params) => {
        if (method === 'GetClusterFullThreshold') return $q.resolve();
        if (method === 'GetClusterFullPrediction') return $q.reject();
      });
      controller.updateInfoBar()
        .then( () => {
          expect(controller.getClusterFullPredictionState).toEqual('error');
          done();
        });
      $scope.$digest();
    });
  });

});
