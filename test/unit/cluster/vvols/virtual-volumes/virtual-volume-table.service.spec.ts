'use strict';

describe('VirtualVolumeTableService', function () {
  var rootScope,
    deferred,
    apiResponse,
    deserializedResponse,
    apiFailure,
    service,
    dataService,
    parentService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callGuzzleAPI: function() {} });
  }));

  beforeEach(inject(function ($q, $rootScope, VirtualVolumeTableService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = VirtualVolumeTableService;
    service.page = {start: 0, limit:25};
    dataService = DataService;
    parentService = SFTableService;
    spyOn(dataService, 'callGuzzleAPI').and.returnValue(deferred.promise);
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
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith('ListVirtualVolumes', {clusterID: 'foobar'});
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {virtualVolumes: [
        {
          metadata: {
            VMW_GosType: 'foobar',
            VMW_VmID: 'barbaz'
          },
          volumeInfo: {
            qos: {minIOPS: 'foo', maxIOPS: 'bar', burstIOPS: 'baz'},
            access: 'readWrite',
            totalSize: 123,
            createTime: 'hello'
          }
        }
      ]};
      deserializedResponse = [
        {
          metadata: {
            VMW_GosType: 'foobar',
            VMW_VmID: 'barbaz'
          },
          volumeInfo: {
            qos: {minIOPS: 'foo', maxIOPS: 'bar', burstIOPS: 'baz'},
            access: 'readWrite',
            totalSize: 123,
            createTime: 'hello'
          },
          VMW_GosType: 'foobar',
          VMW_VmID: 'barbaz',
          minIOPS: 'foo',
          maxIOPS: 'bar',
          burstIOPS: 'baz',
          access: 'readWrite',
          totalSize: 123,
          createTime: 'hello'
        }
      ]
      service.getData(true).then(function(response) {
         expect(response).toEqual(deserializedResponse);
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
