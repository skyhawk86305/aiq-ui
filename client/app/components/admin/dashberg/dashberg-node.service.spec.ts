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
        'minNodesCluster': 4,
        'maxNodesCluster': 82,
        'avgNodesCluster': 24,
        'unitNodesCluster': 100,
        'stdDevCluster': 0.62,
        'minNodesNode': 0,
        'maxNodesNode': 0,
        'avgNodesNode': 0,
        'unitNodesNode': 0,
        'stdDevNodeaaaa': 0,
        'changeRate': -0.032
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
