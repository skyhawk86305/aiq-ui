'use strict';

describe('UsedSpaceGraphsService', function () {
  var rootScope,
    deferred,
    apiResponse,
    apiFailure,
    service,
    dataService,
    parentService,
    currentDate = new Date();

  beforeEach(module('aiqUi', function ($provide) {
    $provide.value('DataService', {callGraphAPI: function () {} });
  }));

  beforeEach(inject(function ($q, $rootScope, $filter, UsedSpaceGraphsService, DataService, SFGraphTimeSeriesService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = UsedSpaceGraphsService;
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
      expect(dataService.callGraphAPI).toHaveBeenCalledWith('usedSpace', {resolution: 1, clusterID: 'foobar', start: currentDate.toISOString(), end: currentDate.toISOString(), res: 300});
    });

    it('should deserialize the response and resolve an array of data', function () {
      apiResponse = {data: {timestampSec: [1, 2, 3], usedSpace: [1000000000000, 2000000000000, 3000000000000], maxUsedSpace: [4000000000000, 5000000000000, 6000000000000], usedMetadataSpace: [7000000000000, 8000000000000, 9000000000000], maxUsedMetadataSpace: [10000000000000, 11000000000000, 12000000000000]}};
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
