/*globals btoa*/
'use strict';

describe('Auth Service', function () {
  let rootScope,
      service,
      http,
      userInfoService,
      apiHandler,
      getSpy,
      clearSpy;

  beforeEach(angular.mock.module('aiqUi'));

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
    it('should make an $http PUT request to /sessions', function () {
      apiHandler = http.when('PUT', '/sessions').respond('success');
      service.login({username: 'foo', password: 'bar'});
      http.expectPUT('/sessions').respond('success');
      http.flush();
      expect(userInfoService.getUserInfo).toHaveBeenCalled();
    });

    it ('should encode the password and pass it to the $http request', function() {
      let testCredentials = {username: 'foo', password: 'bar'},
        expectedEncodedPassword = btoa(testCredentials.password);
      apiHandler = http.when('PUT', '/sessions').respond('success');
      service.login(testCredentials);
      http.expectPUT('/sessions', {username: 'foo', password: expectedEncodedPassword}).respond('success');
      http.flush();
      expect(userInfoService.getUserInfo).toHaveBeenCalled();
    });

    describe('when the user is not authenticated', function () {
      it('should clear user information and return an error', function () {
        apiHandler = http.when('PUT', '/sessions').respond(404, '');
        service.login({username: 'foo', password: 'bar'}).then(function() {
          new Error('login() should return an error');
        }).catch(function() {
          expect(userInfoService.clearUserInfo).toHaveBeenCalled();
        });

        http.expectPUT('/sessions').respond(404, '');
        http.flush();
      });
    });
  });

  describe('.isAuthenticated', function() {
    it('should make an $http GET request to /sessions', function () {
      apiHandler = http.when('GET', '/sessions').respond('success');
      service.isAuthenticated();
      http.expectGET('/sessions').respond('success');
      http.flush();
      expect(userInfoService.getUserInfo).toHaveBeenCalled();
    });

    describe('when the user is not authenticated', function () {
      it('should clear user information and return an error', function () {
        apiHandler = http.when('GET', '/sessions').respond(401, '');
        service.isAuthenticated().then(function() {
          new Error('isAuthenticated() should return an error');
        }).catch(function() {
          expect(userInfoService.clearUserInfo).toHaveBeenCalled();
        });

        http.expectGET('/sessions').respond(401, '');
        http.flush();
      });
    });
  });

  describe('.logout', function() {
    it('should make an $http DELETE request to /sessions', function () {
      apiHandler = http.when('DELETE', '/sessions').respond('success');
      service.logout();
      http.expectDELETE('/sessions').respond('success');
      http.flush();
      expect(userInfoService.clearUserInfo).toHaveBeenCalled();
    });

    describe('when logout fails', function () {
      it('should return an error', function () {
        apiHandler = http.when('GET', '/sessions').respond(404);
        service.logout().then(function() {
          new Error('logout() should return an error');
        });
        http.expectDELETE('/sessions').respond(404);
        http.flush();
      });
    });
  });

  describe('.requestPasswordReset', function() {
    it(`should make an $http POST request to /password-reset with the user's email in the body`, function() {
      const email = 'test@email.com';
      http.expectPOST('/password-reset', email).respond(200);
      service.requestPasswordReset(email);
      http.flush();
    });

    it('should be rejected if the server returns an error', function() {
      const testEmail = 'test@email.com';
      http.expectPOST('/password-reset', testEmail).respond(500);
      service.requestPasswordReset(testEmail).then( () => {
        throw new Error('should have been rejected');
      });
      http.flush();
    });
  });

  describe('.setNewPassword', function() {
    it(`should make an $http POST request to /password-reset/:token with the new password in the body`, function() {
      const token = '00000000-0000-0000-0000-000000000000';
      const password = 'Fake new password1';
      http.expectPOST(`/password-reset/${token}`, password).respond(200);
      service.setNewPassword(token, password);
      http.flush();
    });

    it('should be rejected if the server returns an error', function() {
      const token = '00000000-0000-0000-0000-000000000000';
      const password = 'Fake new password1';
      http.expectPOST(`/password-reset/${token}`, password).respond(400);
      service.setNewPassword(token, password).then( () => {
        throw new Error('should have been rejected');
      });
      http.flush();
    });
  });

});
