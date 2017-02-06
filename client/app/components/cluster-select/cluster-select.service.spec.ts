'use strict';

describe('ClusterSelectService', function () {
  let rootScope,
      deferred,
      apiResponse,
      apiFailure,
      service,
      dataService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callAPI: function() {} });
  }));

  beforeEach(inject(function ($q, $rootScope, ClusterSelectService, DataService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = ClusterSelectService;
    dataService = DataService;
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
  }));

  describe('initialization', function() {
    it('should store the array of clusters to select from and the currently selected cluster', function() {
      expect(service.clusters).toBeDefined();
      expect(service.selectedCluster).toBeNull();
    });
  });

  describe('.getClusters', function() {
    it('should resolve and set the array of clusters from ListActiveClusters', function(done) {
      apiResponse = {clusters:[{foo:'bar'}, {clusterName:'baz', clusterInfo:{uuid:'foo'}, clusterVersionInfo:{clusterAPIVersion:2}}]};
      deferred.resolve(apiResponse);
      service.getClusters().then(function(response) {
        expect(response).toEqual(apiResponse.clusters);
        expect(service.clusters).toEqual(apiResponse.clusters);
        done();
      });
      rootScope.$apply();
    });

    it('should reject an error if ListActiveClusters fails', function(done) {
      apiFailure = 'Error Message';
      deferred.reject(apiFailure);
      service.getClusters().catch(function(err) {
        expect(err).toEqual(apiFailure);
        done();
      });
      rootScope.$apply();
    });
  });

  describe('.updateSelectedCluster', function() {
    it('should update the cached selectedCluster object', function() {
      service.updateSelectedCluster('foo');
      expect(service.selectedCluster).toEqual('foo');
      service.updateSelectedCluster('bar');
      expect(service.selectedCluster).toEqual('bar');
    });
  });

});
