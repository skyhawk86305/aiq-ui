'use strict';

describe('ClusterPairsService', function () {
  let $scope,
    $q,
    DataService,
    SFTableService,
    service;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callGuzzleAPIs: function() {} });
  }));

  beforeEach(inject(function (ClusterPairsService, $rootScope, _$q_, _DataService_, _SFTableService_) {
    $scope = $rootScope.$new();
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;
    service = ClusterPairsService;
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(SFTableService));
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call the appropriate API method with the selectedClusterID', function() {
      spyOn(DataService, 'callGuzzleAPIs').and.returnValue($q.resolve());
      service.selectedClusterID = 123;
      service.getData(true);
      expect(DataService.callGuzzleAPIs).toHaveBeenCalledWith(123, 'ListClusterPairs', 'ListActivePairedVolumes');
    });

    it('should deserialize the response and resolve an array of data', function() {
      spyOn(DataService, 'callGuzzleAPIs').and.returnValue($q.resolve({
        clusterPairs: [ { clusterPairID: 1 }, { clusterPairID: 2 }, { clusterPairID: 3 } ],
        volumes: [
          { id: 1, volumePairs: [ { clusterPairID: 1 } ] },
          { id: 2, volumePairs: [ { clusterPairID: 1 } ] },
          { id: 3, volumePairs: [ { clusterPairID: 1 } ] },
          { id: 4, volumePairs: [ { clusterPairID: 2 } ] },
          { id: 5, volumePairs: [ { clusterPairID: 2 } ] },
          { id: 6, volumePairs: [ { clusterPairID: 3 } ] },
        ],
      }));
      service.getData(true)
        .then( response => {
          expect(response).toEqual([
            { clusterPairID: 1, replicatingVolumes: 3 },
            { clusterPairID: 2, replicatingVolumes: 2 },
            { clusterPairID: 3, replicatingVolumes: 1 },
          ]);
        })
        .catch( err => {
          fail('promise was unexpectedly rejected');
        });
      $scope.$digest();
    });

    it('should reject the error message if the call fails', function() {
      spyOn(DataService, 'callGuzzleAPIs').and.returnValue($q.reject('FooError'));
      service.getData(true)
        .then( () => {
          fail('promise should have been rejected');
        })
        .catch( err => {
          expect(err).toEqual('FooError');
        });
      $scope.$digest();
    });
  });
});
