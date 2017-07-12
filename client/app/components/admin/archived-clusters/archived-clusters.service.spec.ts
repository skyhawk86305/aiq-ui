'use strict';

describe('ArchivedClustersService', function() {
  let $scope,
    $q,
    DataService,
    SFTableService,
    service;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {
      callAPI: function() {},
    });
  }));

  beforeEach(inject(function($rootScope, _$q_, _DataService_, _SFTableService_, ArchivedClustersService) {
    $scope = $rootScope.$new();
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;
    service = ArchivedClustersService;
    service.page = {start: 0, limit:25};
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(SFTableService));
    });
  });

  describe('.getData (inherited from SFTableService)', function() {

    it('should deserialize the responses and resolve an array of data', function() {
      const apiResponse = {
        clusters: [{
          clusterID: 2147039,
          customer: 'AT2 Clusters',
          clusterName: 'Test cluster 1',
          lastUpdateTime: '1492450284',
          archiveTime: '1466075'
        }, {
          clusterID: 2147040,
          customer: 'HCI Testing',
          clusterName: 'Test cluster 2',
          lastUpdateTime: '1492450284',
          archiveTime: '1466075'
        }]
      };
      const expectedResult = [{
        clusterID: 2147039,
          customer: 'AT2 Clusters',
          clusterName: 'Test cluster 1',
          lastUpdateTime: 1492450284000,
          archiveTime: 1466075000
      }, {
         clusterID: 2147040,
          customer: 'HCI Testing',
          clusterName: 'Test cluster 2',
          lastUpdateTime: 1492450284000,
          archiveTime: 1466075000
      }];

      spyOn(DataService, 'callAPI').and.returnValue($q.resolve(apiResponse));
      service.getData(true)
        .then( response => {
          expect(response).toEqual(expectedResult);
        })
        .catch( () => {
          fail('promise was unexpectedly rejected');
        });

      $scope.$digest();
    });

    it('should reject the error message if the JSON RPC call fails', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.reject('test error'));
      service.getData(true)
        .then( () => {
          fail('promise was unexpectedly rejected');
        })
        .catch( err => {
          expect(err).toEqual('test error');
        });
      $scope.$digest();
    });
  });
});
