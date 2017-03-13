'use strict';

describe('service: SnapshotSchedulesTableService', function() {
  let service,
    dataService,
    deferred,
    rootScope,
    apiResponse,
    deserializedResponse,
    parentService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {
      callGuzzleAPI: function() {}
    });
  }));

  beforeEach(inject(function($q, $rootScope, DataService, SnapshotSchedulesTableService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = SnapshotSchedulesTableService;
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
      service.update('800');
      expect(service.selectedClusterID).toEqual(800);
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call expected API methods with the selectedClusterID', function() {
      service.selectedClusterID = 'foobar';
      service.getData(true);
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith('foobar', 'ListSchedules');
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {
        schedules: [
          {
            scheduleID: 20,
            scheduleInfo: {
              volumeID: 32
            },
            lastRunStatus: 'Success',
            paused: false,
            recurring: false,
            scheduleName: 'Schedule1',
            attributes: {
              frequency: 'Time Interval'
            },
            scheduleType: 'Snapshot',
            lastRunTimeStarted: '2016-05-18T21:36:24Z'
          },
          {
            scheduleID: 21,
            scheduleInfo: {
              volumes: [
                33,
                34,
                35]
            },
            lastRunStatus: 'Failed',
            paused: true,
            recurring: true,
            scheduleName: 'Schedule2',
            attributes: {
              frequency: 'Days of Week'
            },
            scheduleType: 'Snapshot',
            lastRunTimeStarted: '2016-04-18T21:36:24Z'
          }
        ]
      };
      deserializedResponse = [
        {
          scheduleID: 20,
          scheduleName: 'Schedule1',
          scheduleFrequency: 'Time Interval',
          recurring: false,
          scheduleVolumeIDs: 32,
          lastRunStatus: 'Success',
          lastRunTimeStarted: '2016-05-18T21:36:24Z',
          paused: false,
          scheduleType: 'Snapshot',
          scheduleInfo: {
            volumeID: 32
          },
          attributes: {
            frequency: 'Time Interval'
          }
        },
        {
          scheduleID: 21,
          scheduleName: 'Schedule2',
          scheduleFrequency: 'Days of Week',
          recurring: true,
          scheduleVolumeIDs: '33, 34, 35',
          lastRunStatus: 'Failed',
          lastRunTimeStarted: '2016-04-18T21:36:24Z',
          paused: true,
          scheduleType: 'Snapshot',
          scheduleInfo: {
            volumes: [
              33,
              34,
              35]
          },
          attributes: {
            frequency: 'Days of Week'
          }
        }
      ];
      service.getData(true).then(function(response) {
        expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should reject the error message if the call fails', function() {
      let apiFailure = 'FooError';
      service.getData(true).catch(function(err) {
        expect(err).toEqual(apiFailure);
      });
      deferred.reject(apiFailure);
      rootScope.$apply();
    });
  });
});
