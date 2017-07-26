'use strict';

describe('Component: login', function() {
  let $q,
      $location,
      $window,
      $uibModal,
      AuthService,
      bindings,
      controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$q_, _$location_, _$uibModal_, $componentController, _AuthService_) {
    $q = _$q_;
    $location = _$location_;
    $window = {};
    $uibModal = _$uibModal_;
    AuthService = _AuthService_;
    bindings = { AuthService, $location };
    controller = $componentController('login', { $window }, bindings);
  }));

  describe('.loginWithSSO', function() {
    it('should send the user to the SSO login page with the correct redirect URL', function() {
      $window.location = { pathname: '/base/path' };
      spyOn($location, 'search').and.returnValue({ url: '/app/path' });
      controller.loginWithSSO()
      expect($window.location.href).toBe('/sso/login?target=%2Fbase%2Fpath%23%2Fapp%2Fpath')
    })
  });

  describe('.openSSOPushModal', function() {
    it('should open the push modal', function() {
      spyOn(controller.$uibModal, 'open').and.returnValue($q.resolve());
      controller.openSSOPushModal();
      expect(controller.$uibModal.open).toHaveBeenCalled();
      const modalOptions = controller.$uibModal.open.calls.first().args[0];
      expect(modalOptions.component).toBe('ssoPush');
    });

    it('should pass in a resolve that calls .loginWithSSO', function() {
      spyOn(controller.$uibModal, 'open').and.returnValue($q.resolve());
      spyOn(controller, 'loginWithSSO');
      controller.openSSOPushModal();
      expect(controller.$uibModal.open).toHaveBeenCalled();
      const modalOptions = controller.$uibModal.open.calls.first().args[0];
      const initiateSSOLogin = modalOptions.resolve.initiateSSOLogin();
      expect(controller.loginWithSSO).not.toHaveBeenCalled();
      initiateSSOLogin();
      expect(controller.loginWithSSO).toHaveBeenCalled();
    });
  });

});
