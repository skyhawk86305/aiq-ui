'use strict';

describe('Component: volumeDetails', function() {
  let $scope,
    q,
    routeParams,
    volumeDetailsService,
    volumePerformanceService,
    dataService,
    controller,
    dataServiceSpy,
    getVolumeSpy,
    getVolumeStatsSpy,
    getSnapshotsSpy,
    getAverageVolumePerformanceSpy;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $q, $rootScope, $routeParams, VolumeDetailsService, VolumePerformanceGraphService, DataService) {
    $scope = $rootScope.$new();
    q = $q;
    routeParams = $routeParams;
    volumeDetailsService = VolumeDetailsService;
    volumePerformanceService = VolumePerformanceGraphService;
    dataService = DataService;
    controller = $componentController('volumeDetails');
    dataServiceSpy = spyOn(dataService, 'callAPI').and.returnValue(q.resolve({cluster: {clusterName: 'clusterName'}}));
    getVolumeSpy =  spyOn(volumeDetailsService, 'getVolume').and.returnValue(q.resolve('foobar'));
    getVolumeStatsSpy = spyOn(volumeDetailsService, 'getVolumeStats').and.returnValue(q.resolve('barbaz'));
    getSnapshotsSpy = spyOn(volumeDetailsService, 'getSnapshots').and.returnValue(q.resolve('foobaz'));
    getAverageVolumePerformanceSpy = spyOn(volumeDetailsService, 'getAverageVolumePerformance').and.returnValue(q.resolve('barfoo'));
  }));

  describe('Initialization', function() {
    beforeEach(function() {
      routeParams.volumeID = 1;
      routeParams.clusterID = 2;
      spyOn(volumeDetailsService, 'setVolume');
      spyOn(volumePerformanceService, 'update');
    });

    it('should initialize bindings and update services', function() {
      controller.$onInit();
      expect(controller.volumeID).toEqual(1);
      expect(controller.clusterID).toEqual(2);
      expect(controller.staticDateRangeOptions).toBeDefined();
      expect(controller.syncGraphs).toBeDefined();
      expect(volumePerformanceService.update).toHaveBeenCalledWith(2, 1);
      expect(volumeDetailsService.setVolume).toHaveBeenCalledWith(2, 1);
    });

    it('should set the cluster name', function() {
      controller.clusterID = 2;
      controller.$onInit();
      $scope.$apply();
      expect(dataServiceSpy).toHaveBeenCalledWith('GetClusterSummary', {clusterID: 2});
      expect(controller.clusterName).toEqual('clusterName');
    });

    it('should set info bar data and loading states to loaded on success', function() {
      controller.$onInit();
      $scope.$apply();
      expect(controller.getVolumeStatus).toEqual('loaded');
      expect(controller.getVolumeStatsStatus).toEqual('loaded');
      expect(controller.getSnapshotsStatus).toEqual('loaded');
      expect(controller.getAverageVolumePerformanceStatus).toEqual('loaded');
      expect(controller.volume).toEqual('foobar');
      expect(controller.volumeStats).toEqual('barbaz');
      expect(controller.snapshots).toEqual('foobaz');
      expect(controller.averageVolumePerformance).toEqual('barfoo');
      expect(controller.infoBarLastUpdated).toBeDefined();
    });

    it('should not set info bar data and set loading states to error on error', function() {
      getVolumeSpy.and.returnValue(q.reject());
      getVolumeStatsSpy.and.returnValue(q.reject());
      getSnapshotsSpy.and.returnValue(q.reject());
      getAverageVolumePerformanceSpy.and.returnValue(q.reject());
      controller.$onInit();
      $scope.$apply();
      expect(controller.getVolumeStatus).toEqual('error');
      expect(controller.getVolumeStatsStatus).toEqual('error');
      expect(controller.getSnapshotsStatus).toEqual('error');
      expect(controller.getAverageVolumePerformanceStatus).toEqual('error');
      expect(controller.volume).not.toBeDefined();
      expect(controller.volumeStats).not.toBeDefined();
      expect(controller.snapshots).not.toBeDefined();
      expect(controller.averageVolumePerformance).not.toBeDefined();
      expect(controller.infoBarLastUpdated).toBeDefined();
    });
  });

  describe('refreshInfoBarData', function() {
    it('should set the states to loading and set info bar data', function() { 
      spyOn(controller, 'setInfoBarData');
      controller.refreshInfoBarData();
      expect(controller.getVolumeStatus).toEqual('loading');
      expect(controller.getVolumeStatsStatus).toEqual('loading');
      expect(controller.getSnapshotsStatus).toEqual('loading');
      expect(controller.getAverageVolumePerformanceStatus).toEqual('loading');
      expect(controller.setInfoBarData).toHaveBeenCalled();
    });
  });

  describe('getUsedCapacity', function() {
    it ('should calculate used capacity', function() {
      controller.volume = {blockSize: 10, totalSize: 100};
      controller.volumeStats = {nonZeroBlocks: 2};
      expect(controller.getUsedCapacity()).toEqual(.2);
    });
  });
});
