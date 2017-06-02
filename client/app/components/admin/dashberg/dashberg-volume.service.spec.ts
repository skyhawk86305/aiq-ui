'use strict';

describe('DashbergVolumeService', function() {
    let dataService,
        rootScope,
        deferred,
        service;

    beforeEach(angular.mock.module('aiqUi', function ($provide) {
        $provide.value('DataService', {
          callAPI: function() {}
        });
    }));

    beforeEach(inject(function ($q, $rootScope, DashbergVolumeService, DataService) {
    rootScope = $rootScope.$new();
    service = DashbergVolumeService;
    dataService = DataService;

    deferred = $q.defer();
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
  }));

  describe('.getData', function() {
    it('should call API and get data from DashbergVolume', function() {
      const apiResponse = {
        'totalVolumes': 16500,
        'minVolumesCluster': 2500
      };
      const expectedResponse = {
        'totalVolumes': 16500,
        'minVolumesCluster': 2500
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

    it('should reject an error if DashbergVolume fails', function() {
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
