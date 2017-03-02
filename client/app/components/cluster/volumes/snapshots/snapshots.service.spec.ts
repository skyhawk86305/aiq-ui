'use strict';

describe('service: SnapshotTableService', function() {
  let service,
    dataService,
    deferred,
    rootScope,
    apiResponse,
    deserializedResponse,
    parentService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {
      callGuzzleAPI: function() {}
    });
  }));

  beforeEach(inject(function($q, $rootScope, DataService, SnapshotTableService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = SnapshotTableService;
    dataService = DataService;
    parentService = SFTableService;
    spyOn(dataService, 'callGuzzleAPI').and.returnValue(deferred.promise);
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(parentService));
    });

    it('should keep track of the selectedClusterID and volumeID to be used in data retrieval', function() {
      expect(service.selectedClusterID).toBeNull();
      expect(service.volumeID).toBeNull();
    });
  });

  describe('.update', function() {
    it('should update the selectedClusterID to be used in data retrieval', function() {
      service.update('800', 20);
      expect(service.selectedClusterID).toEqual(800);
      expect(service.volumeID).toEqual(20);
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call expected API methods with the selectedClusterID', function() {
      service.selectedClusterID = 'foobar';
      service.getData(true);
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith('foobar', 'ListActiveVolumes');
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith('foobar', 'ListSnapshots');
    });

    it('should deserialize the response and resolve an array of data', function() {
      service.volumeID = 33;
      apiResponse = {
        volumes: [{volumeID: 33, accountID: 2, totalSize: 500000882688, status: 'active'}, {volumeID: 31, accountID: 1, totalSize: 500000882688, status: 'active'}],
        snapshots: [{snapshotID: 20, volumeID: 33, totalSize: 500000882688, expirationTime: null, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da384d4', enableRemoteReplication: false, groupID: 0, createTime: '2016-05-18T21:36:24Z'},
          {snapshotID: 21, volumeID: 30, totalSize: 500000882688, expirationTime: null, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da38422', enableRemoteReplication: true, groupID: 1, createTime: '2016-04-18T21:36:24Z'}]
      }
      deserializedResponse = [
        {
          snapshotID: 20,
          volumeID: 33,
          totalSize: 500000882688,
          expirationTime: null,
          snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da384d4',
          enableRemoteReplication: false,
          groupID: 0,
          createTime: '2016-05-18T21:36:24Z',
          accountID: 2,
          volumeSize: 500000882688
        }
      ];
      service.getData(true).then(function(response) {
        expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should return no snapshots when no volume associated with any snapshot', function() {
      service.volumeID = 31;
      apiResponse = {
        volumes: [{volumeID: 33, accountID: 2, totalSize: 500000882688, status: 'active'}, {volumeID: 31, accountID: 1, totalSize: 500000882688, status: 'active'}],
        snapshots: [{snapshotID: 20, volumeID: 33, totalSize: 500000882688, expirationTime: null, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da384d4', enableRemoteReplication: false, groupID: 0, createTime: '2016-05-18T21:36:24Z'},
          {snapshotID: 21, volumeID: 30, totalSize: 500000882688, expirationTime: null, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da38422', enableRemoteReplication: true, groupID: 1, createTime: '2016-04-18T21:36:24Z'}]
      }
      deserializedResponse = [];
      service.getData(true).then(function(response) {
        expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should return no snapshots when selected volume does not exists', function() {
      service.volumeID = 11;
      apiResponse = {
        volumes: [{volumeID: 33, accountID: 2, totalSize: 500000882688, status: 'active'}, {volumeID: 31, accountID: 1, totalSize: 500000882688, status: 'active'}],
        snapshots: [{snapshotID: 20, volumeID: 33, totalSize: 500000882688, expirationTime: null, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da384d4', enableRemoteReplication: false, groupID: 0, createTime: '2016-05-18T21:36:24Z'},
          {snapshotID: 21, volumeID: 30, totalSize: 500000882688, expirationTime: null, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da38422', enableRemoteReplication: true, groupID: 1, createTime: '2016-04-18T21:36:24Z'}]
      }
      service.getData(true).then(function(response) {
        expect(response).toBeUndefined();
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should reject the error message if the call fails', function() {

      let apiFailure = 'FooError';
      service.getData(true).catch(function(err) {
        expect(err).toEqual(apiFailure);
      });
      deferred.reject(apiFailure);
      rootScope.$apply();
    });
  });
});
