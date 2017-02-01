'use strict';

describe('Data Service', function () {
  var rootScope,
      deferred,
      service,
      apiLogService,
      http,
      location,
      response;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('ApiLogService', {
      appendRequest: jasmine.createSpy('appendRequest').and.returnValue('entry'),
      appendResponse: jasmine.createSpy('appendResponse')
    });
  }));

  beforeEach(inject(function ($rootScope, $q, DataService, ApiLogService, $httpBackend, $location) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = DataService;
    apiLogService = ApiLogService;
    http = $httpBackend;
    location = $location;
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  describe('.callAPI', function() {
    it('should make an $http request to the API with the provided method name and params', function () {
      service.callAPI('foobar', {param: 'baz'});
      http.expect('POST', '/json-rpc/2.0', {method: 'foobar', params: {param: 'baz'}}).respond({});
      http.flush();
    });

    it('should execute the error callback function and route to the login page if the call is unauthenticated', function() {
      var pathSpy = jasmine.createSpyObj('path', ['search']);
      location.url('/foo/bar?baz=fuz');
      spyOn(location, 'path').and.returnValue(pathSpy);
      response = {message: 'bar'};
      http.when('POST', '/json-rpc/2.0', {method: 'foobar', params: {param: 'baz'}}).respond(401, response);
      service.callAPI('foobar', {param: 'baz'});
      http.flush();
      expect(location.path).toHaveBeenCalledWith('/login');
      expect(pathSpy.search).toHaveBeenCalledWith({url: '/foo/bar?baz=fuz'});
    });
  });

  describe('.callGuzzleAPI', function() {
    it('should make an $http request to the API with the provided method name and cluster ID', function () {
      service.callGuzzleAPI('12345', 'foobar');
      http.expect('GET', '/state/cluster/12345/foobar').respond([]);
      http.flush();
    });

    it('should make an $http request to the API with the provided cluster ID', function () {
      service.callGuzzleAPI('12345');
      http.expect('GET', '/state/cluster/12345').respond([]);
      http.flush();
    });
  });

});
