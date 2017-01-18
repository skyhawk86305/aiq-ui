'use strict';

describe('Data Service', function () {
  var rootScope,
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

  beforeEach(inject(function ($rootScope, DataService, ApiLogService, $httpBackend, $location) {
    rootScope = $rootScope;
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

    it('should execute the request callback function every call', function() {
      http.when('POST', '/json-rpc/2.0').respond({});
      service.callAPI('foobar', {param: 'baz'});
      http.flush();
      expect(apiLogService.appendRequest).toHaveBeenCalledWith({method: 'foobar', params: {param: 'baz'}});
    });

    it('should make execute the response callback function on success', function() {
      response = {foo: 'bar'};
      http.when('POST', '/json-rpc/2.0', {method: 'foobar', params: {param: 'baz'}}).respond(response);
      service.callAPI('foobar', {param: 'baz'});
      http.flush();
      expect(apiLogService.appendResponse).toHaveBeenCalledWith('entry', response);
    });

    it('should make execute the error callback function if the call fails', function() {
      response = {message: 'bar'};
      http.when('POST', '/json-rpc/2.0', {method: 'foobar', params: {param: 'baz'}}).respond(500, response);
      service.callAPI('foobar', {param: 'baz'});
      http.flush();
      expect(apiLogService.appendResponse).toHaveBeenCalledWith('entry', response, true);
    });

    it('should make execute the error callback function and route to the login page if the call is unauthenticated', function() {
      var pathSpy = jasmine.createSpyObj('path', ['search']);
      location.url('/foo/bar?baz=fuz');
      spyOn(location, 'path').and.returnValue(pathSpy);
      response = {message: 'bar'};
      http.when('POST', '/json-rpc/2.0', {method: 'foobar', params: {param: 'baz'}}).respond(401, response);
      service.callAPI('foobar', {param: 'baz'});
      http.flush();
      expect(apiLogService.appendResponse).toHaveBeenCalledWith('entry', response, true);
      expect(location.path).toHaveBeenCalledWith('/login');
      expect(pathSpy.search).toHaveBeenCalledWith({url: '/foo/bar?baz=fuz'});
    });
  });

});
