/*globals btoa*/
'use strict';

describe('Auth Service', function () {
  var rootScope,
      service,
      http,
      userInfoService,
      apiHandler,
      getSpy,
      clearSpy;

  beforeEach(module('aiqUi'));

  beforeEach(inject(function ($rootScope, AuthService, UserInfoService, $httpBackend) {
    rootScope = $rootScope;
    service = AuthService;
    http = $httpBackend;
    userInfoService = UserInfoService;
    getSpy = spyOn(userInfoService, 'getUserInfo');
    clearSpy = spyOn(userInfoService, 'clearUserInfo');
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  describe('.login', function() {
    beforeEach(function() {
      apiHandler = http.when('PUT', '/sessions').respond('success');
    });
    it('should make an $http PUT request to /sessions', function () {
      service.login({username: 'foo', password: 'bar'});
      expect(userInfoService.getUserInfo).toHaveBeenCalled();
      http.expectPUT('/sessions').respond('success');
      http.flush();
    });

    it ('should encode the password and pass it to the $http request', function() {
      var testCredentials = {username: 'foo', password: 'bar'},
        expectedEncodedPassword = btoa(testCredentials.password);
      service.login(testCredentials);
      expect(userInfoService.getUserInfo).toHaveBeenCalled();
      http.expectPUT('/sessions', {username: 'foo', password: expectedEncodedPassword}).respond('success');
      http.flush();
    });
  });

  describe('.isAuthenticated', function() {
    it('should make an $http GET request to /sessions', function () {
      apiHandler = http.when('GET', '/sessions').respond('success');
      service.isAuthenticated();
      expect(userInfoService.getUserInfo).toHaveBeenCalled();
      http.expectGET('/sessions').respond('success');
      http.flush();
    });
  });

  describe('.logout', function() {
    it('should make an $http DELETE request to /sessions', function () {
      apiHandler = http.when('DELETE', '/sessions').respond('success');
      service.logout();
      expect(userInfoService.clearUserInfo).toHaveBeenCalled();
      http.expectDELETE('/sessions').respond('success');
      http.flush();
    });
  });

});
