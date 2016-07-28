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

  beforeEach(module('aiqUi', function ($provide) {
    $provide.value('DataService', {callAPI: function() {} });
  }));

  beforeEach(inject(function ($q, $rootScope, DriveTableService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = DriveTableService;
    dataService = DataService;
    parentService = SFTableService;
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
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
      service.getData();
      expect(dataService.callAPI).toHaveBeenCalledWith('ListActiveDrives', {clusterID: 'foobar'});
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {drives: [{driveStats: {lifeRemainingPercent: 'foo', reserveCapacityPercent: 'bar'}}]};
      deserializedResponse = apiResponse.drives;
      deserializedResponse.forEach(function(drive){
        drive.lifeRemainingPercent = drive.driveStats.lifeRemainingPercent;
        drive.reserveCapacityPercent = drive.driveStats.reserveCapacityPercent;
      });
      service.getData().then(function(response) {
         expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should reject the error message if the call fails', function() {
      apiFailure = 'FooError';
      service.getData().catch(function(err) {
        expect(err).toEqual(apiFailure);
      });
      deferred.reject(apiFailure);
      rootScope.$apply();
    });
  });
});
