'use strict';

describe('VmwareAlarmsService', function () {
  let rootScope,
    deferred,
    apiResponse,
    deserializedResponse,
    apiFailure,
    service,
    dataService,
    parentService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callGuzzleAPI: function(){}});
  }));

  beforeEach(inject(function ($q, $rootScope, VmwareAlarmsService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = VmwareAlarmsService;
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
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith('foobar', 'get_alarm_info');
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {'vcenter-alarms': [{'alarm': {'_moId': 'alarmId'}, 'creationEventId': 'creationId', 'description': 'some description', 'entity': {'_moId': 'entityId'}, 'lastModifiedTime': '2017-05-30 05:32:32.503620+00:00', 'lastModifiedUser': 'user', 'name': 'alarmName'}]};
      deserializedResponse = [
        {
          creationEventId: 'creationId',
          alarmId: 'alarmId',
          name: 'alarmName',
          description: 'some description',
          lastModifiedTime: '1496122352503',
          lastModifiedUser: 'user',
          entityId: 'entityId',
          alarm: {
            _moId: 'alarmId'
          },
          entity: {
            _moId: 'entityId'
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
      apiFailure = 'FooError';
      service.getData(true).catch(function(err) {
        expect(err).toEqual(apiFailure);
      });
      deferred.reject(apiFailure);
      rootScope.$apply();
    });
  });
});
