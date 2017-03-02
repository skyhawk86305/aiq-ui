'use strict';

describe('NodeTableService', function () {
  let rootScope,
      deferred,
      apiResponse,
      deserializedResponse,
      apiFailure,
      service,
      dataService,
      parentService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callAPI: function() {} });
  }));

  beforeEach(inject(function ($q, $rootScope, NodeTableService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = NodeTableService;
    service.page = {start: 0, limit:25};
    dataService = DataService;
    parentService = SFTableService;
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(parentService));
    });

    it('should keep track of the selectedClusterID to be used in data retrieval', function() {
      expect(service.selectedClusterID).toBeNull();
    });
  });

  describe('.update', function() {
    it('should update the selectedClusterID to be used in data retrieval', function() {
      service.update('999');
      expect(service.selectedClusterID).toEqual(999);
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call the appropriate API method with the selectedClusterID', function() {
      service.selectedClusterID = 'foobar';
      service.getData(true);
      expect(dataService.callAPI).toHaveBeenCalledWith('ListActiveNodes', {clusterID: 'foobar'});
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {nodes: [{id: 'bar', platformInfo: {nodeType: 'baz'}}, {id: 'foo', platformInfo: {nodeType: 'fiz'}}]};
      deserializedResponse = [
        {
          id: 'bar',
          nodeType: 'baz',
          platformInfo: {
            nodeType: 'baz'
          }
        },
        {
          id: 'foo',
          nodeType: 'fiz',
          platformInfo: {
            nodeType: 'fiz'
          }
        }
      ];
      service.getData(true).then(function(response) {
        expect(response).toEqual(apiResponse.nodes);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should reject the error message if the call fails', function() {
      apiFailure = 'FooError';
      service.getData(true).catch(function(err) {
        expect(err).toEqual(apiFailure);
      });
      deferred.reject(apiFailure);
      rootScope.$apply();
    });
  });
});
