'use strict';

describe('DashbergVolumeAccessService', function() {
    let dataService,
        rootScope,
        deferred,
        service;

    beforeEach(angular.mock.module('aiqUi', function ($provide) {
        $provide.value('DataService', {
          callAPI: function() {}
        });
    }));

    beforeEach(inject(function ($q, $rootScope, DashbergVolumeAccessService, DataService) {
    rootScope = $rootScope.$new();
    service = DashbergVolumeAccessService;
    dataService = DataService;

    deferred = $q.defer();
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
  }));

  describe('.getData', function() {
    it('should call API and get data from DashbergVolumeAccess', function() {
      const apiResponse = {
        'totalVolumeAccess': 911,
        'minVolumeAccessCluster': 3
      };
      const expectedResponse = {
        'totalVolumeAccess': 911,
        'minVolumeAccessCluster': 3
      };
      deferred.resolve(apiResponse);
      service.getData()
        .then(function(response) {
        expect(response).toEqual(expectedResponse);
      })
        .catch(function() {
          fail('promise was unexpectedly rejected');
      });
      rootScope.$apply();
    });

    it('should reject an error if DashbergVolumeAccess fails', function() {
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
