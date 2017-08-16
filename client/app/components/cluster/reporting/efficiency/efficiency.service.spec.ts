'use strict';

describe('EfficiencyGraphsService', function () {
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

  beforeEach(inject(function ($q, $rootScope, $filter, EfficiencyGraphsService, DataService, SFGraphTimeSeriesService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = EfficiencyGraphsService;
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
      expect(dataService.callGraphAPI).toHaveBeenCalledWith('capacity', {resolution: 1, clusterID: 'foobar', start: currentDate, end: currentDate});
    });

    it('should deserialize the response and resolve an array of data', function () {
      let date = new Date();
      apiResponse = {data: {timestamps: [ date, date, date], thinProvisioningFactor: [1, 2, 3], deDuplicationFactor: [4, 5, 6], compressionFactor: [7, 8, 9], thinTimesDeDupFactor: [4, 10, 18], thinTimesCompressionFactor: [7, 16, 27], deDupTimesCompressionFactor: [28, 40, 54], efficiencyFactor: [10, 11, 12]}};
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
