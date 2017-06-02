'use strict';

describe('DashbergBandwidthService', function() {
    let dataService,
        rootScope,
        deferred,
        service;

    beforeEach(angular.mock.module('aiqUi', function ($provide) {
        $provide.value('DataService', {
          callAPI: function() {}
        });
    }));

    beforeEach(inject(function ($q, $rootScope, DashbergNodeService, DataService) {
    rootScope = $rootScope.$new();
    service = DashbergNodeService;
    dataService = DataService;

    deferred = $q.defer();
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
  }));

  describe('.getData', function() {
    it('should call API and get data from DashbergNode', function() {
      const apiResponse = {
        'totalBandwidth': 212000000,
        'minBandwidthCluster': 28000000,
        'maxBandwidthCluster': 356000000,
        'avgBandwidthCluster': 212000000,
        'unitBandwidthCluster': 356000000,
        'stdDevCluster': 0.11,
        'minBandwidthNode': 27000000,
        'maxBandwidthNode': 246000000,
        'avgBandwidthNode': 213000000,
        'unitBandwidthNode': 356000000,
        'stdDevNode': 0.21,
        'changeRate': 0.132
      };
      deferred.resolve(apiResponse);
      service.getData()
        .then(function(response) {
        expect(response).toEqual(apiResponse);
      })
        .catch(function() {
          fail('unexpected rejection');
      });
      rootScope.$apply();
    });

    it('should reject an error if DashbergNode fails', function() {
      deferred.reject('test error');
      service.getData()
        .then(function() {
          fail('unexpected rejection');
        })
        .catch(function(err) {
          expect(err).toEqual('test error');
      });
      rootScope.$apply();
    });
  });
})
