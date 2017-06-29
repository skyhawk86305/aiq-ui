'use strict';

describe('DriveTableService', function () {
  let $q,
    rootScope,
    service,
    dataService,
    parentService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callGuzzleAPIs: function(){}});
  }));

  beforeEach(inject(function (_$q_, $rootScope, DriveTableService, DataService, SFTableService) {
    $q = _$q_;
    rootScope = $rootScope;
    service = DriveTableService;
    service.page = {start: 0, limit:25};
    dataService = DataService;
    parentService = SFTableService;
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
      spyOn(dataService, 'callGuzzleAPIs').and.returnValue($q.resolve());
      service.selectedClusterID = 'foobar';
      service.getData(true);
      expect(dataService.callGuzzleAPIs)
        .toHaveBeenCalledWith('foobar', 'ListDrives', 'GetDriveStats', 'GetClusterHardwareInfo');
    });

    it('should deserialize the response and resolve an array of data', function() {
      spyOn(dataService, 'callGuzzleAPIs').and.returnValue($q.resolve({
        drives: [
          { driveID: 1, type: 'volume' },
          { driveID: 2, type: 'block' },
        ],
        driveStats: [
          { driveID: 1, lifeRemainingPercent: 5, reserveCapacityPercent: 8 },
          { driveID: 2, lifeRemainingPercent: 2, reserveCapacityPercent: 7 },
        ],
        clusterHardwareInfo: {
          drives: {
            1: { version: '515ABBF0' },
            2: { version: 'D2010350' },
          },
        },
      }));
      const deserializedResponse = [
        {
          driveID: 1,
          type: 'metadata',
          lifeRemainingPercent: 5,
          reserveCapacityPercent: 8,
          version: '515ABBF0',
        },
        {
          driveID: 2,
          type: 'block',
          lifeRemainingPercent: 2,
          reserveCapacityPercent: 7,
          version: 'D2010350',
        }
      ];
      service.getData(true)
        .then( response => {
           expect(response).toEqual(deserializedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        });
      rootScope.$apply();
    });

    it('should populate empty strings in the event of a missing driveStats object', function() {
      spyOn(dataService, 'callGuzzleAPIs').and.returnValue($q.resolve({
        drives: [{}],
        clusterHardwareInfo: {drives: {}}
      }));
      const expectedData = [
        { lifeRemainingPercent: '', reserveCapacityPercent: '', type: undefined, version: '-' }
      ];
      service.getData(true)
        .then( response => {
           expect(response).toEqual(expectedData);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        });
      rootScope.$apply();
    });

    it('should populate in the event of a null drive in GetClusterHardwareInfo', function() {
      spyOn(dataService, 'callGuzzleAPIs').and.returnValue($q.resolve({
        drives: [
          { driveID: 1, type: 'volume' },
          { driveID: 2, type: 'block' },
        ],
        driveStats: [
          { driveID: 1, lifeRemainingPercent: 5, reserveCapacityPercent: 8 },
          { driveID: 2, lifeRemainingPercent: 2, reserveCapacityPercent: 7 },
        ],
        clusterHardwareInfo: {
          drives: {
            1: { version: '515ABBF0' },
            2: null,
          },
        },
      }));
      const deserializedResponse = [
        {
          driveID: 1,
          type: 'metadata',
          lifeRemainingPercent: 5,
          reserveCapacityPercent: 8,
          version: '515ABBF0',
        },
        {
          driveID: 2,
          type: 'block',
          lifeRemainingPercent: 2,
          reserveCapacityPercent: 7,
          version: '-',
        }
      ];
      service.getData(true)
        .then( response => {
          expect(response).toEqual(deserializedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        });
      rootScope.$apply();
    });

    it('should reject the error message if the call fails', function() {
      const apiFailure = 'FooError';
      spyOn(dataService, 'callGuzzleAPIs').and.returnValue($q.reject(apiFailure));
      service.getData(true)
        .then( () => {
          fail('Promise was expected to be rejected, but was resolved');
        })
        .catch( err => {
          expect(err).toEqual(apiFailure);
        });
      rootScope.$apply();
    });
  });
});
