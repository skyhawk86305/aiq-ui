'use strict';

describe('UnregisteredClustersService', function() {
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

  beforeEach(inject(function($rootScope, _$q_, _DataService_, _SFTableService_, UnregisteredClustersService) {
    $scope = $rootScope.$new();
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;

    service = UnregisteredClustersService;
    service.page = {start: 0, limit:25};
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(SFTableService));
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call the appropriate API method', function() {

    });

    it('should deserialize the responses and resolve an array of data', function() {
      const apiResponse = {
        clusters: [{
          clusterID: 2147039,
          clusterName: 'Test cluster 1',
          clusterUUID: 'ef1d6265-e24f-4f36-b095-586e369e018a',
          clusterVersion: '8.1.0.95',
          lastUpdateTime: '2017-04-24T17:31:24Z',
        }, {
          clusterID: 2147040,
          clusterName: 'Test cluster 2',
          clusterUUID: 'abcd6265-e24f-4f36-b095-586e369e018a',
          clusterVersion: '8.1.0.96',
          lastUpdateTime: '2017-05-24T17:31:24Z',
        }]
      };
      const expectedResult = [{
        clusterID: 2147039,
        clusterName: 'Test cluster 1',
        clusterUUID: 'ef1d6265-e24f-4f36-b095-586e369e018a',
        clusterVersion: '8.1.0.95',
        lastUpdateTime: '2017-04-24T17:31:24Z',
      }, {
        clusterID: 2147040,
        clusterName: 'Test cluster 2',
        clusterUUID: 'abcd6265-e24f-4f36-b095-586e369e018a',
        clusterVersion: '8.1.0.96',
        lastUpdateTime: '2017-05-24T17:31:24Z',
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
