'use strict';

describe('EventTableService', function () {
  var rootScope,
      deferred,
      apiResponse,
      apiFailure,
      expectedResponse,
      service,
      dataService,
      parentService;

  beforeEach(module('aiqUi', function ($provide) {
    $provide.value('DataService', {callAPI: function() {} });
  }));

  beforeEach(inject(function ($q, $rootScope, EventTableService, DataService, SFTableService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = EventTableService;
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
      expect(dataService.callAPI).toHaveBeenCalledWith('ListEvents', {clusterID: 'foobar'});
    });

    it('should deserialize the response and resolve an array of data', function() {
      apiResponse = {events: [{foo:'bar', details:{bar:'foo'}}]};
      expectedResponse = [
        {
          foo:'bar',
          details:{bar:'foo'},
          detailsString: JSON.stringify({bar:'foo'}, null, 2)
        }
      ];
      service.getData(true).then(function(response) {
        expect(response).toEqual(expectedResponse);
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
