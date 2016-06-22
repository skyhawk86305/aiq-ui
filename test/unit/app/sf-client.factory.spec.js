'use strict';

describe('SFClient Factory', function () {
  var rootScope,
      factory,
      apiLogService,
      window,
      http,
      response;

  beforeEach(module('elementUiPerNode', function ($provide, $urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
    $provide.value('$window', {location:{origin:'https://foo.com', pathname:'/index.htm'}});
    $provide.value('ApiLogService', {
      appendRequest: jasmine.createSpy(),
      appendResponse: jasmine.createSpy(),
      appendError: jasmine.createSpy(),
    });
  }));

  beforeEach(inject(function ($rootScope, SFClient, ApiLogService, $window, $httpBackend) {
    rootScope = $rootScope;
    factory = SFClient;
    apiLogService = ApiLogService;
    window = $window;
    http = $httpBackend;
  }));

  describe('initialization', function() {
    it('should configure and create a new instance of the SolidFire SDK', function() {
      expect(factory.api).toBeDefined();
      expect(factory.businessLogic).toBeDefined();
    });
  });

  describe('API calls', function() {
    it('should make http requests to the SolidFire endpoint', function() {
      response = {};
      http.expectPOST('/json-rpc/9.0').respond(response);
      factory.api.getConfig();
      http.flush();
    });

    it('should make execute the request callback function every call', function() {
      response = {};
      http.expectPOST('/json-rpc/9.0').respond(response);
      factory.api.getConfig();
      http.flush();
      expect(apiLogService.appendRequest).toHaveBeenCalled();
    });

    it('should make execute the response callback function on success', function() {
      response = {result:{foo:'bar'}};
      http.expectPOST('/json-rpc/9.0').respond(response);
      factory.api.getConfig();
      http.flush();
      expect(apiLogService.appendResponse).toHaveBeenCalled();
    });

    it('should make execute the error callback function on error', function() {
      response = {error:{foo:'bar'}};
      http.expectPOST('/json-rpc/9.0').respond(response);
      factory.api.getConfig();
      http.flush();
      expect(apiLogService.appendError).toHaveBeenCalled();
    });

    it('should check and redirect the user if endpoint is unreachable (errorCode is between 500 and 511)', function() {
      response = {error:{errorCode:501}};
      http.expectPOST('/json-rpc/9.0').respond(response);
      factory.api.getConfig();
      http.flush();
      expect(window.location).toEqual('https://foo.com/logout.html#/?error=%7B%22errorCode%22:501,%22id%22:0,%22method%22:%22GetConfig%22%7D');
    });
  });

});
