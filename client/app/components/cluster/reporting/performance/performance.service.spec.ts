'use strict';

describe('PerformanceGraphsService', function () {
  let rootScope,
    deferred,
    apiResponse,
    apiFailure,
    service,
    dataService,
    parentService,
    currentDate = new Date();

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callGraphAPI: function () {} });
  }));

  beforeEach(inject(function ($q, $rootScope, $filter, PerformanceGraphsService, DataService, SFGraphTimeSeriesService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = PerformanceGraphsService;
    dataService = DataService;
    parentService = SFGraphTimeSeriesService;
    spyOn(dataService, 'callGraphAPI').and.returnValue(deferred.promise);
  }));

  describe('initialization', function () {
    it('should inherit from SFGraphTimeSeriesService', function () {
      expect(service).toEqual(jasmine.any(parentService));
    });

    it('should keep track of the selectedClusterID to be used in data retrieval', function () {
      expect(service.selectedClusterID).toBeNull();
    });
  });

  describe('.update', function () {
    it('should update the selectedClusterID to be used in data retrieval', function () {
      service.update('999');
      expect(service.selectedClusterID).toEqual(999);
    });
  });

  describe('.getData (inherited from SFGraphTimeSeriesService)', function () {
    it('should call the appropriate API method with the selectedClusterID', function () {
      service.selectedClusterID = 'foobar';
      service.getData(currentDate, currentDate, 300);
      expect(dataService.callGraphAPI).toHaveBeenCalledWith('performance', {resolution: 1, clusterID: 'foobar', start: currentDate, end: currentDate});
    });

    it('should deserialize the response and resolve an array of data', function () {
      let date = new Date().toISOString();
      apiResponse = {data: {timestamps: [ date, date, date], clusterUtilizationPct: [10, 20, 30], readOpsPerSec: [100, 200, 300], writeOpsPerSec: [400, 500, 600], totalOpsPerSec: [700, 800, 900], readBytesPerSec: [1000000000000, 2000000000000, 3000000000000], writeBytesPerSec: [4000000000000, 5000000000000, 6000000000000], totalBytesPerSec: [7000000000000, 8000000000000, 9000000000000]}};
      service.getData(currentDate, currentDate, 300).then(function(response) {
        expect(response).toEqual(apiResponse.data);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should reject the error message if the call fails', function () {
      apiFailure = 'FooError';
      service.getData(currentDate, currentDate, 300).catch(function(err) {
        expect(err).toEqual(apiFailure);
      });
      deferred.reject(apiFailure);
      rootScope.$apply();
    });
  });
});
