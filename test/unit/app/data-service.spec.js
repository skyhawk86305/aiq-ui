'use strict';

describe('Data Service', function () {
  var rootScope,
      service,
      apiLogService,
      http,
      response;

  beforeEach(module('aiqUi', function ($provide, $urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
    $provide.value('ApiLogService', {
      appendRequest: jasmine.createSpy(),
      appendResponse: jasmine.createSpy(),
      appendError: jasmine.createSpy(),
    });
  }));

  beforeEach(inject(function ($rootScope, DataService, ApiLogService, $httpBackend) {
    rootScope = $rootScope;
    service = DataService;
    apiLogService = ApiLogService;
    http = $httpBackend;
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  describe('.callAPI', function() {
    it('should make an $http request to the API with the provided method name and params', function () {
      service.callAPI('foobar', {param: 'baz'});
      http.expect('POST', '/v2/api', {method: 'foobar', params: {param: 'baz'}}).respond({});
      http.flush();
    });

    it('should execute the request callback function every call', function() {
      http.when('POST', '/v2/api').respond({});
      service.callAPI('foobar', {param: 'baz'});
      http.flush();
      expect(apiLogService.appendRequest).toHaveBeenCalledWith({method: 'foobar', params: {param: 'baz'}});
    });

    it('should make execute the response callback function on success', function() {
      response = {foo: 'bar'};
      http.when('POST', '/v2/api', {method: 'foobar', params: {param: 'baz'}}).respond(response);
      service.callAPI('foobar', {param: 'baz'});
      http.flush();
      expect(apiLogService.appendResponse).toHaveBeenCalledWith(response);
    });

    it('should make execute the error callback function if success response has error', function() {
      response = {error: 'bar'};
      http.when('POST', '/v2/api', {method: 'foobar', params: {param: 'baz'}}).respond(response);
      service.callAPI('foobar', {param: 'baz'});
      http.flush();
      expect(apiLogService.appendError).toHaveBeenCalledWith('bar');
    });

    it('should make execute the error callback function if the call fails', function() {
      response = {message: 'bar'};
      http.when('POST', '/v2/api', {method: 'foobar', params: {param: 'baz'}}).respond(500, response);
      service.callAPI('foobar', {param: 'baz'});
      http.flush();
      expect(apiLogService.appendError).toHaveBeenCalledWith(response);
    });
  });

});
