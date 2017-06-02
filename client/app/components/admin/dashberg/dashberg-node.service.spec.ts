'use strict';

describe('DashbergNodeService', function() {
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
        'totalNodes': 539,
        'minNodesCluster': 4
      };
      const expectedResponse = {
        'totalNodes': 539,
        'minNodesCluster': 4
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

    it('should reject an error if DashbergNode fails', function() {
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
