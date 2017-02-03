'use strict';

describe('AlertPolicyTableService', function () {
  var rootScope,
    deferred,
    apiResponse,
    deserializedResponse,
    apiFailure,
    service,
    alertFilterSpy = jasmine.createSpy('alertFilter'),
    dataService,
    parentService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callAPI: function() {} });
    $provide.value('alertFilter', alertFilterSpy);
  }));

  beforeEach(inject(function ($q, $rootScope, $filter, AlertPolicyTableService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = AlertPolicyTableService;
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
      expect(dataService.callAPI).toHaveBeenCalledWith('ListNotifications');
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {notifications: [{notificationFields: []}]};
      deserializedResponse = [
        {
          notificationFields: [],
          policyDescription: 'filtered'
        }
      ];
      service.getData(true).then(function(response) {
        expect(response).toEqual(deserializedResponse);
        expect(alertFilterSpy).toHaveBeenCalledWith([], 'condition');
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
