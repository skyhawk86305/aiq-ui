'use strict';

describe('Component: resetPassword', function() {
  let $scope, AuthService, controller,
    reqResetDeferred, reqResetSpy,
    setPasswordDeferred, setPasswordSpy;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($rootScope, $location, $q, $componentController, AuthService) {
    $scope = $rootScope.$new();
    reqResetDeferred = $q.defer();
    setPasswordDeferred = $q.defer();
    reqResetSpy = spyOn(AuthService, 'requestPasswordReset').and.returnValue(reqResetDeferred.promise);
    setPasswordSpy = spyOn(AuthService, 'setNewPassword').and.returnValue(setPasswordDeferred.promise);
    const locals = { $scope };
    const bindings = { AuthService, $location };
    controller = $componentController('resetPassword', locals, bindings);
  }));

  describe('.requestPasswordReset', function() {
    it('should handle a successful call to AuthService.requestPasswordReset', function(done) {
      const email = 'testUser@solidfire.com';
      controller.email = email;
      reqResetDeferred.resolve();
      controller.requestPasswordReset()
        .then( () => {
          expect(reqResetSpy).toHaveBeenCalledWith(email);
          expect(controller.emailSent).toBe(true);
          expect(controller.error).toBeNull();
        })
        .finally(done);

      $scope.$apply();
    });

    it('should handle an error from AuthService.requestPasswordReset', function(done) {
      const email = 'testUser@solidfire.com';
      controller.email = email;
      reqResetDeferred.reject('Server error');
      controller.requestPasswordReset()
        .then( () => {
          expect(reqResetSpy).toHaveBeenCalledWith(email);
          expect(controller.emailSent).toBe(false);
          expect(controller.error).toBe('Server error');
        })
        .finally(done);

      $scope.$apply();
    });

    it('should handle an error with error code from AuthService.requestPasswordReset', function(done) {
      const email = 'testUser@solidfire.com';
      controller.email = email;
      reqResetDeferred.reject({
        status: 404,
        statusText: 'Not Found'});
      controller.requestPasswordReset()
        .then( () => {
          expect(reqResetSpy).toHaveBeenCalledWith(email);
          expect(controller.emailSent).toBe(false);
          expect(controller.error).toBe('Error: 404 Not Found');
        })
        .finally(done);

      $scope.$apply();
    });
  });

  describe('.setNewPassword', function() {
    it('should handle a successful call to AuthService.setNewPassword', function(done) {
      const token = '00000000-0000-0000-0000-000000000000';
      const newPassword = 'Test password1';
      controller.token = token;
      controller.newPassword = newPassword;
      setPasswordDeferred.resolve();
      controller.setNewPassword()
        .then( () => {
          expect(setPasswordSpy).toHaveBeenCalledWith(token, newPassword);
          expect(controller.resetComplete).toBe(true);
          expect(controller.error).toBeNull();
        })
        .finally(done);

      $scope.$apply();
    });

    it('should handle an error from AuthService.setNewPassword', function(done) {
      const token = '00000000-0000-0000-0000-000000000000';
      const newPassword = 'Test password1';
      controller.token = token;
      controller.newPassword = newPassword;
      setPasswordDeferred.reject('Server error');
      controller.setNewPassword()
        .then( () => {
          expect(setPasswordSpy).toHaveBeenCalledWith(token, newPassword);
          expect(controller.resetComplete).toBe(false);
          expect(controller.error).toBe('Server error');
        })
        .finally(done);

      $scope.$apply();
    });

    it('should handle an error with error code from AuthService.setNewPassword', function(done) {
      const token = '00000000-0000-0000-0000-000000000000';
      const newPassword = 'Test password1';
      controller.token = token;
      controller.newPassword = newPassword;
      setPasswordDeferred.reject({
        status: 404,
        statusText:'Not Found'
      });
      controller.setNewPassword()
        .then( () => {
          expect(setPasswordSpy).toHaveBeenCalledWith(token, newPassword);
          expect(controller.resetComplete).toBe(false);
          expect(controller.error).toBe('Error: 404 Not Found');
        })
        .finally(done);

      $scope.$apply();
    });
  });
});
