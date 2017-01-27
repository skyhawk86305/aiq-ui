'use strict';

describe('DriveTableService', function () {
  var rootScope,
    deferred,
    apiResponse,
    deserializedResponse,
    apiFailure,
    service,
    dataService,
    parentService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callGuzzleAPI: function(){}});
  }));

  beforeEach(inject(function ($q, $rootScope, DriveTableService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = DriveTableService;
    service.page = {start: 0, limit:25};
    dataService = DataService;
    parentService = SFTableService;
    spyOn(dataService, 'callGuzzleAPI').and.returnValue(deferred.promise);
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(parentService));
    });

    it('should keep track of the selectedClusterID to be used in data retrieval', function() {
      expect(service.selectedClusterID).toBeNull();
    });
  });

  describe('.update', function() {
    it('should update the selectedClusterID to be used in data retrieval', function() {
      service.update('999');
      expect(service.selectedClusterID).toEqual(999);
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call the appropriate API method with the selectedClusterID', function() {
      service.selectedClusterID = 'foobar';
      service.getData(true);
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith('ListDrives', {clusterID: 'foobar'});
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith('GetDriveStats', {clusterID: 'foobar'});
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {drives: [{driveID:1}], driveStats: [{driveID: 1, lifeRemainingPercent: 'foo', reserveCapacityPercent: 'bar'}]};
      deserializedResponse = [
        {
          driveID: 1,
          lifeRemainingPercent: 'foo',
          reserveCapacityPercent: 'bar'
        }
      ];
      service.getData(true).then(function(response) {
         expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should populate empty strings in the event of a missing driveStats object', function() {
      apiResponse = {drives: [{}]};
      deserializedResponse = [
        {
          lifeRemainingPercent: '',
          reserveCapacityPercent: ''
        }
      ];
      service.getData(true).then(function(response) {
         expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should reject the error message if the call fails', function() {
      apiFailure = 'FooError';
      service.getData(true).catch(function(err) {
        expect(err).toEqual(apiFailure);
      });
      deferred.reject(apiFailure);
      rootScope.$apply();
    });
  });
});
