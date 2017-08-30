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
      expect(DataService.callAPI).toHaveBeenCalledWith('ListClusterDetails');
    });

    it('should deserialize the responses and resolve an array of data', function() {
      const testname = '<a class=\"cluster-details-link\" href =\"#\/cluster\/2148796\/\>Magneto"</a>';
      const apiResponse = {
        clusters: [{
          id: 2148796,
          name: 'Magneto',
          lastUpdateTime: 1497298152,
          version: '8.1.1.4',
          mvip: '172.27.1.55',
          svip: '172.27.15.55',
          utilization: 0.007410860154777765,
          activeSessions: 368,
          maxUsedSpace: 20404327071744,
          usedSpace: 7289735639346,
          efficiencyFactor: 12.47749600986532,
          activeVolumes: 89,
          unresolvedFaults: 2,
        }],
      };
      const expectedResult = [{
        id: 2148796,
        name: 'Magneto',
        version: '8.1.1.4',
        mvip: '172.27.1.55',
        svip: '172.27.15.55',
        utilization: 0.007410860154777765,
        activeSessions: 368,
        maxUsedSpace: 20404327071744,
        usedSpace: 7289735639346,
        efficiencyFactor: 12.47749600986532,
        activeVolumes: 89,
        unresolvedFaults: 2,
        lastUpdateTime: new Date(1497298152000),
      }];
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve(apiResponse));
      service.getData(true)
        .then( response => {
            expect(response[0].id).toEqual(expectedResult[0].id);
            expect(response[0].lastUpdateTime).toEqual(expectedResult[0].lastUpdateTime);
            expect(response[0].version).toEqual(expectedResult[0].version);
            expect(response[0].mvip).toEqual(expectedResult[0].mvip);
            expect(response[0].svip).toEqual(expectedResult[0].svip);
            expect(response[0].utilization).toEqual(expectedResult[0].utilization);
            expect(response[0].activeSessions).toEqual(expectedResult[0].activeSessions);
            expect(response[0].maxUsedSpace).toEqual(expectedResult[0].maxUsedSpace);
            expect(response[0].usedSpace).toEqual(expectedResult[0].usedSpace);
            expect(response[0].efficiencyFactor).toEqual(expectedResult[0].efficiencyFactor);
            expect(response[0].activeVolumes).toEqual(expectedResult[0].activeVolumes);
            expect(response[0].unresolvedFaults).toEqual(expectedResult[0].unresolvedFaults);
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
