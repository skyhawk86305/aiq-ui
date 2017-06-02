'use strict';

describe('DashbergSnapshotService', function() {
    let dataService,
        rootScope,
        deferred,
        service;

    beforeEach(angular.mock.module('aiqUi', function ($provide) {
        $provide.value('DataService', {
          callAPI: function() {}
        });
    }));

    beforeEach(inject(function ($q, $rootScope, DashbergSnapshotService, DataService) {
    rootScope = $rootScope.$new();
    service = DashbergSnapshotService;
    dataService = DataService;

    deferred = $q.defer();
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
  }));

  describe('.getData', function() {
    it('should call API and get data from DashbergSnapshot', function() {
      const apiResponse = {
        'totalSnapshots': 28,
        'minSnapshotsCluster': 1
      };
      const expectedResponse = {
        'totalSnapshots': 28,
        'minSnapshotsCluster': 1
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

    it('should reject an error if DashbergSnapshot fails', function() {
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
