'use strict';

describe('VolumePairsService', function () {
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

  beforeEach(inject(function ($rootScope, _$q_, _DataService_, _SFTableService_, VolumePairsService) {
    $scope = $rootScope.$new();
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;

    service = VolumePairsService;
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
      expect(DataService.callGuzzleAPI).toHaveBeenCalledWith(1234, 'ListClusterPairs');
      expect(DataService.callAPI).toHaveBeenCalledWith('ListActivePairedVolumes', { clusterID: 1234 });
    });

    it('should deserialize the responses and resolve an array of data', inject(function($routeParams, $filter) {
      const listActivePairedVolumesResponse = {
        volumes: [
          {
            volumeID: 70, access: 'replicationTarget', accountID: 1, status: 'active',
            volumeStats: { asyncDelay: null },
            volumePairs: [{
              clusterPairID: 1,
              remoteReplication: { mode: 'Sync' },
              remoteVolumeID: 80,
            }],
          },
          {
            volumeID: 71, access: 'readWrite', accountID: 2, status: 'active',
            volumeStats: { asyncDelay: '00:00:00.000000' },
            volumePairs: [{
              clusterPairID: 2,
              remoteReplication: { mode: 'Async' },
              remoteVolumeID: 81,
            }],
          },
        ],
      };
      const listClusterPairsResponse = {
        clusterPairs: [
          { clusterPairID: 1, clusterName: 'testCluster1' },
          { clusterPairID: 2, clusterName: 'testCluster2' },
        ],
      };
      const deserializedResponse = [
        {
          volumeID: 70,
          accountID: 1,
          volumeStatus: 'active',
          replicationMode: 'Sync',
          direction: 'Target',
          asyncDelay: null,
          remoteClusterName: 'testCluster1',
          remoteVolumeID: 80,
        },
        {
          volumeID: 71,
          accountID: 2,
          volumeStatus: 'active',
          replicationMode: 'Async',
          direction: 'Source',
          asyncDelay: '00:00:00.000000',
          remoteClusterName: 'testCluster2',
          remoteVolumeID: 81,
        },
      ];
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve(listActivePairedVolumesResponse));
      spyOn(DataService, 'callGuzzleAPI').and.returnValue($q.resolve(listClusterPairsResponse));
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

    it('should reject the error message if the JSON RPC call fails', function() {
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
