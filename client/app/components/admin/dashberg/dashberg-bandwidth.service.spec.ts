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

    beforeEach(inject(function ($q, $rootScope, DashbergBandwidthService, DataService) {
    rootScope = $rootScope.$new();
    service = DashbergBandwidthService;
    dataService = DataService;

    deferred = $q.defer();
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
  }));

  describe('.getData', function() {
    it('should call API and get data from DashbergBandwidth', function() {
      const apiResponse = {
        'totalBandwidth': 212000000,
        'minBandwidthCluster': 28000000
      };
      const expectedResponse = {
        'totalBandwidth': 212000000,
        'minBandwidthCluster': 28000000
      };
      service.getData()
        .then(function(response) {
        expect(response).toEqual(expectedResponse);
      })
        .catch(function() {
          fail('promise was unexpectedly rejected');
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should reject an error if DashbergBandwidth fails', function() {
      deferred.reject('test error');
      service.getData()
        .then(function() {
          fail('promise was unexpectedly rejected');
        })
        .catch(function(err) {
          expect(err).toEqual('test error');
      });
      rootScope.$apply();
    });
  });
})
