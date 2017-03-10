'use strict';

describe('VolumeTableService', function () {
  let rootScope,
    deferred,
    apiResponse,
    deserializedResponse,
    apiFailure,
    service,
    dataService,
    parentService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {
      callGuzzleAPIs: function() {}
    });
  }));

  beforeEach(inject(function ($q, $rootScope, VolumeTableService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = VolumeTableService;
    service.page = {start: 0, limit:25};
    dataService = DataService;
    parentService = SFTableService;
    spyOn(dataService, 'callGuzzleAPIs').and.returnValue(deferred.promise);
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
      expect(dataService.callGuzzleAPIs).toHaveBeenCalledWith('foobar', 'ListActiveVolumes', 'ListSnapshots');
    });

    it('should deserialize the response and resolve an array of data', inject(function($routeParams, $filter) {
      apiResponse = {volumes: [{volumeID: 10, qos: {minIOPS: 'foo', maxIOPS: 'bar', burstIOPS: 'baz'}, volumePairs: [1,2,3]}],
        snapshots: [{snapshotID: 20, volumeID: 33, totalSize: 500000882688, expirationTime: null,
          snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da384d4', enableRemoteReplication: false, groupID: 0, createTime: '2016-05-18T21:36:24Z'},
          {snapshotID: 21, volumeID: 30, totalSize: 500000882688, expirationTime: null, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da38422',
            enableRemoteReplication: true, groupID: 1, createTime: '2016-04-18T21:36:24Z'}]};
      deserializedResponse = [
        {
          volumeID: 10,
          qos: {
            minIOPS: 'foo',
            maxIOPS: 'bar',
            burstIOPS: 'baz'
          },
          volumePairs: [1,2,3],
          minIOPS: 'foo',
          maxIOPS: 'bar',
          burstIOPS: 'baz',
          paired: true,
          snapshots: $filter('volumesSnapshotsLink')(0, apiResponse.volumes[0].volumeID),
          details: $filter('volumesDetailsLink')(apiResponse.volumes[0].volumeID)
        }
      ];
      service.getData(true).then(function(response) {
         expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    }));

    it('should return link to snapshots table', inject(function($routeParams, $filter) {
      $routeParams.clusterID = 'foobar';
      apiResponse = {volumes: [{volumeID: 33, qos: {minIOPS: 'foo', maxIOPS: 'bar', burstIOPS: 'baz'}, volumePairs: [1,2,3]}],
        snapshots: [{snapshotID: 20, volumeID: 33, totalSize: 500000882688, expirationTime: null,
          snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da384d4', enableRemoteReplication: false, groupID: 0, createTime: '2016-05-18T21:36:24Z'},
          {snapshotID: 21, volumeID: 33, totalSize: 500000882688, expirationTime: null, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da38422',
            enableRemoteReplication: true, groupID: 1, createTime: '2016-04-18T21:36:24Z'}]};
      deserializedResponse = [
        {
          volumeID: 33,
          qos: {
            minIOPS: 'foo',
            maxIOPS: 'bar',
            burstIOPS: 'baz'
          },
          volumePairs: [1,2,3],
          minIOPS: 'foo',
          maxIOPS: 'bar',
          burstIOPS: 'baz',
          paired: true,
          snapshots: $filter('volumesSnapshotsLink')(apiResponse.snapshots.length, apiResponse.volumes[0].volumeID),
          details: $filter('volumesDetailsLink')(apiResponse.volumes[0].volumeID)
        }
      ];
      service.getData(true).then(function(response) {
        expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    }));

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
