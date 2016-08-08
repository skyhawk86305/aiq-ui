'use strict';

describe('AlertHistoryTableService', function () {
  var rootScope,
    deferred,
    apiResponse,
    deserializedResponse,
    apiFailure,
    service,
    alertFilterSpy = jasmine.createSpy('alertFilter'),
    dataService,
    parentService;

  beforeEach(module('aiqUi', function ($provide) {
    $provide.value('DataService', {callAPI: function() {} });
    $provide.value('alertFilter', alertFilterSpy);
  }));

  beforeEach(inject(function ($q, $rootScope, $filter, AlertHistoryTableService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = AlertHistoryTableService;
    service.page = {start: 0, limit:25};
    dataService = DataService;
    parentService = SFTableService;
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
    alertFilterSpy.and.callFake(function() {
      return 'filtered';
    });
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(parentService));
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call the appropriate API method with the selectedClusterID', function() {
      service.selectedClusterID = 'foobar';
      service.getData(true);
      expect(dataService.callAPI).toHaveBeenCalledWith('ListAlerts');
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {alerts: [{notification: {notificationName: 'a name', destinationEmail: 'an email', notificationFields: []}}]};
      deserializedResponse = [
        {
          notification: {
            notificationName: 'a name',
            destinationEmail: 'an email',
            notificationFields: []
          },
          notificationName: 'a name',
          destinationEmail: 'an email',
          policyDescription: 'filtered'
        }
      ];
      service.getData(true).then(function(response) {
        expect(response).toEqual(deserializedResponse);
        expect(alertFilterSpy).toHaveBeenCalledWith([], {type: 'condition'});
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should populate empty strings in the event of a missing notification object', function() {
      apiResponse = {alerts: [{}]};
      deserializedResponse = [
        {
          notificationName: '',
          destinationEmail: '',
          policyDescription: ''
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
