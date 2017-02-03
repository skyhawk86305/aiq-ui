'use strict';

describe('BindingTableService', function () {
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

  beforeEach(inject(function ($q, $rootScope, BindingTableService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = BindingTableService;
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
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith('foobar', 'ListVirtualVolumeBindings');
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {bindings: [
        {
          virtualVolumeHostID: "4c4c4544-0053-3710-8052-c8c04f383432",
          protocolEndpointID: "94d446de-bc9a-4213-a65a-a93f00b38e98",
          virtualVolumeBindingID: 80,
          virtualVolumeSecondaryID: "0xe20000000041",
          protocolEndpointInBandID: "naa.6f47acc2000000036467306a00000000",
          protocolEndpointType: "SCSI",
          virtualVolumeID: "9b3b837f-99b0-464a-8061-77167f887130"
        }
      ]};
      deserializedResponse = [
        {
          virtualVolumeHostID: "4c4c4544-0053-3710-8052-c8c04f383432",
          protocolEndpointID: "94d446de-bc9a-4213-a65a-a93f00b38e98",
          virtualVolumeBindingID: 80,
          virtualVolumeSecondaryID: "0xe20000000041",
          protocolEndpointInBandID: "naa.6f47acc2000000036467306a00000000",
          protocolEndpointType: "SCSI",
          virtualVolumeID: "9b3b837f-99b0-464a-8061-77167f887130"
        }
      ];
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
