'use strict';

describe('StorageContainerTableService', function () {
  let rootScope,
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

  beforeEach(inject(function ($q, $rootScope, StorageContainerTableService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = StorageContainerTableService;
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
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith('foobar', 'ListStorageContainers');
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {storageContainers: [
        {
          status: 'active',
          storageContainerID: 'ea9af423-8991-41a1-ab92-51e8b159dee7',
          name: 'test-name',
          initiatorSecret: 'secret123',
          virtualVolumes: [
            'e7e8a8c9-bc21-4ead-b929-0285c5bba8b9',
            'b4458a77-423e-40ae-89ce-c878bd409038',
            '2ac385c2-abc8-4940-9bad-f22a0c057b38',
            'd8a1015b-57b0-457e-b9d1-d593eebb501b',
            'b4c1528b-d073-416f-a00b-11b7b0680767',
            '3f04354f-fcfa-46e2-a5a3-d11245f4c5a8',
            '29f8f0ca-fe54-405a-bd6a-05e622eb3cc7',
            '981ce454-b018-4a70-a524-d7ef14f561d0',
            '0875f7e6-e3be-4f8c-8390-de9367fc29b1',
            'f112b4cd-f7eb-480d-9c42-4717354c8cb6',
          ],
          targetSecret: 'secret234',
          protocolEndpointType: 'SCSI',
          accountID: 3
        }
      ]};
      deserializedResponse = [
        {
          status: 'active',
          storageContainerID: 'ea9af423-8991-41a1-ab92-51e8b159dee7',
          name: 'test-name',
          initiatorSecret: 'secret123',
          virtualVolumes: [
            'e7e8a8c9-bc21-4ead-b929-0285c5bba8b9',
            'b4458a77-423e-40ae-89ce-c878bd409038',
            '2ac385c2-abc8-4940-9bad-f22a0c057b38',
            'd8a1015b-57b0-457e-b9d1-d593eebb501b',
            'b4c1528b-d073-416f-a00b-11b7b0680767',
            '3f04354f-fcfa-46e2-a5a3-d11245f4c5a8',
            '29f8f0ca-fe54-405a-bd6a-05e622eb3cc7',
            '981ce454-b018-4a70-a524-d7ef14f561d0',
            '0875f7e6-e3be-4f8c-8390-de9367fc29b1',
            'f112b4cd-f7eb-480d-9c42-4717354c8cb6',
          ],
          targetSecret: 'secret234',
          protocolEndpointType: 'SCSI',
          accountID: 3,

          activeVirtualVolumesCount: 10,
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
