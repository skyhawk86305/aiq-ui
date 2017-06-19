'use strict';

describe('ClusterService', function () {
  let $rootScope,
    $q,
    DataService,
    SFTableService,
    service;

  beforeEach(angular.mock.module('aiqUi', function($provide) {
    $provide.value('DataService', {
      callAPI() {},
    });
  }));

  beforeEach(inject(function (_$rootScope_, _$q_, _DataService_, _SFTableService_, ClusterService) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;

    service = ClusterService;
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(SFTableService));
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call the appropriate API method', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getData(true);
      expect(DataService.callAPI).toHaveBeenCalledWith('ListActiveClusters', {
        components: [ 'clusterInfo', 'clusterStats', 'clusterCapacity', 'volumesInfo', 'faultInfo' ],
      });
    });

    it('should deserialize the responses and resolve an array of data', function() {
      const apiResponse = {
        clusters: [{
          clusterID: 2148796,
          clusterName: 'Magneto',
          lastUpdateTime: 1497298152,
          clusterVersion: '8.1.1.4',
          clusterInfo: {
            ensemble: [ '172.27.15.10', '172.27.15.11', '172.27.15.12' ],
            mvip: '172.27.1.55',
            svip: '172.27.15.55',
          },
          clusterStats: {
            clusterUtilization: 0.007410860154777765,
          },
          clusterCapacity: {
            activeSessions: 368,
            maxUsedSpace: 20404327071744,
            usedSpace: 7289735639346,
            efficiencyFactor: 12.47749600986532,
          },
          activeVolumes: 89,
          unresolvedFaults: 2,
        }],
      };
      const expectedResult = [{
        clusterID: 2148796,
        clusterName: 'Magneto',
        lastUpdateTime: new Date(1497298152000),
        clusterVersion: '8.1.1.4',
        clusterInfo_ensemble: [ '172.27.15.10', '172.27.15.11', '172.27.15.12' ],
        clusterInfo_ensemble_length: 3,
        clusterInfo_mvip: '172.27.1.55',
        clusterInfo_svip: '172.27.15.55',
        clusterInfo: {
          ensemble: [ '172.27.15.10', '172.27.15.11', '172.27.15.12' ],
          mvip: '172.27.1.55',
          svip: '172.27.15.55',
        },
        clusterStats_clusterUtilization: 0.007410860154777765,
        clusterStats: {
          clusterUtilization: 0.007410860154777765,
        },
        clusterCapacity_activeSessions: 368,
        clusterCapacity_maxUsedSpace: 20404327071744,
        clusterCapacity_usedSpace: 7289735639346,
        clusterCapacity_efficiencyFactor: 12.47749600986532,
        clusterCapacity: {
          activeSessions: 368,
          maxUsedSpace: 20404327071744,
          usedSpace: 7289735639346,
          efficiencyFactor: 12.47749600986532,
        },
        activeVolumes: 89,
        unresolvedFaults: 2,
      }];
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve(apiResponse));
      service.getData(true)
        .then( response => {
           expect(response).toEqual(expectedResult);
        })
        .catch( err => {
          fail('promise was unexpectedly rejected');
        });
      $rootScope.$digest();
    });

    it('should reject the error message if the JSON RPC call fails', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.reject('test error'));
      service.getData(true)
        .then( () => {
          fail('promise should have been rejected');
        })
        .catch( err => {
          expect(err).toEqual('test error');
        });
      $rootScope.$digest();
    });
  });
});
