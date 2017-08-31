'use strict';

describe('VolumeTableService', function () {
  let $scope,
    $q,
    DataService,
    SFTableService,
    service;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {
      callAPI: function() {},
      callGuzzleAPI: function() {},
    });
  }));

  beforeEach(inject(function ($rootScope, _$q_, _DataService_, _SFTableService_, VolumeTableService) {
    $scope = $rootScope.$new();
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;

    service = VolumeTableService;
    service.page = {start: 0, limit:25};
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(SFTableService));
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
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      spyOn(DataService, 'callGuzzleAPI').and.returnValue($q.resolve());
      service.selectedClusterID = 1234;
      service.getData(true);
      expect(DataService.callGuzzleAPI).toHaveBeenCalledWith(1234, 'ListSnapshots');
      expect(DataService.callAPI).toHaveBeenCalledWith('ListActiveVolumes', { clusterID: 1234 });
    });

    it('should deserialize the responses and resolve an array of data', inject(function($routeParams, $filter) {
      const listActiveVolumesResponse = {
        volumes: [
          {volumeID: 10, qos: {minIOPS: 'foo', maxIOPS: 'bar', burstIOPS: 'baz'}, volumePairs: [1,2,3], volumeStats: {nonZeroBlocks: 23232}},
          {volumeID: 33, qos: {minIOPS: 'foo', maxIOPS: 'bar', burstIOPS: 'baz'}, volumePairs: [1,2,3], volumeStats: {nonZeroBlocks: 432}},
        ],
      };
      const listSnapshotsResponse = {
        snapshots: [
          {snapshotID: 20, volumeID: 33, totalSize: 500000882688, expirationTime: null,
            snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da384d4', enableRemoteReplication: false, groupID: 0, createTime: '2016-05-18T21:36:24Z'},
          {snapshotID: 21, volumeID: 33, totalSize: 500000882688, expirationTime: null,
            snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da38422', enableRemoteReplication: true, groupID: 1, createTime: '2016-04-18T21:36:24Z'}
        ]
      };
      const deserializedResponse = [
        {
          volumeID: 10,
          qos: { minIOPS: 'foo', maxIOPS: 'bar', burstIOPS: 'baz' },
          volumePairs: [1,2,3],
          volumeStats: {nonZeroBlocks: 23232},
          usedCapacity: NaN,
          minIOPS: 'foo',
          maxIOPS: 'bar',
          burstIOPS: 'baz',
          paired: true,
          snapshots: $filter('volumesSnapshotsLink')(0, 10),
          details: $filter('volumesDetailsLink')(10),
        },
        {
          volumeID: 33,
          qos: { minIOPS: 'foo', maxIOPS: 'bar', burstIOPS: 'baz' },
          volumePairs: [1,2,3],
          volumeStats: {nonZeroBlocks: 432},
          usedCapacity: NaN,
          minIOPS: 'foo',
          maxIOPS: 'bar',
          burstIOPS: 'baz',
          paired: true,
          snapshots: $filter('volumesSnapshotsLink')(2, 33),
          details: $filter('volumesDetailsLink')(33),
        }
      ];
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve(listActiveVolumesResponse));
      spyOn(DataService, 'callGuzzleAPI').and.returnValue($q.resolve(listSnapshotsResponse));
      service.getData(true).then( response => {
         expect(response).toEqual(deserializedResponse);
      });
      $scope.$digest();
    }));

    it('should reject the error message if the Guzzle call fails', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      spyOn(DataService, 'callGuzzleAPI').and.returnValue($q.reject('test error'));
      service.getData(true)
        .then( () => {
          fail('promise should have been rejected');
        })
        .catch( err => {
          expect(err).toEqual('test error');
        });
      $scope.$digest();
    });

    it('should reject the error message if the API call fails', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.reject('test error'));
      spyOn(DataService, 'callGuzzleAPI').and.returnValue($q.resolve());
      service.getData(true)
        .then( () => {
          fail('promise should have been rejected');
        })
        .catch( err => {
          expect(err).toEqual('test error');
        });
      $scope.$digest();
    });
  });
});
