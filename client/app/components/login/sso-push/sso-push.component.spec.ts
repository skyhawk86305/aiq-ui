'use strict';

describe('Component: SSO Push modal', function() {
  let $window,
      $location,
      controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$window_, _$location_, $componentController) {
    $window = _$window_;
    $location = _$location_;
    const modalInstance = {
      close() {},
      dismiss() {},
    };
    const resolve = {
      initiateSSOLogin() {},
    };
    const bindings = { $window, $location, modalInstance, resolve };
    controller = $componentController('ssoPush', null, bindings);
  }));

  describe('.loginWithSSO', function() {
    it('should call the method provided by the caller for initiating an SSO login and close the modal', function() {
      spyOn(controller.resolve, 'initiateSSOLogin')
      spyOn(controller.modalInstance, 'close');
      controller.loginWithSSO();
      expect(controller.modalInstance.close).toHaveBeenCalled();
      expect(controller.resolve.initiateSSOLogin).toHaveBeenCalled();
    });
  });

  describe('.registerForNetappSupportAccount', function() {
    it('should open the NetApp registration page in a new tab and call the cancel method', function() {
      spyOn($window, 'open');
      spyOn(controller, 'cancel');
      controller.registerForNetappSupportAccount();
      expect($window.open).toHaveBeenCalledWith('https://mysupport.netapp.com/eservice/public/now.do', '_blank');
      expect(controller.cancel).toHaveBeenCalled();
    });
  });

  describe('.cancel', function() {
    it('should redirect to the AIQ login page and close the modal', function() {
      spyOn(controller.modalInstance, 'close');
      spyOn($location, 'path');
      controller.cancel();
      expect(controller.modalInstance.close).toHaveBeenCalled();
      expect($location.path).toHaveBeenCalledWith('/aiq-login');
    });
  });

});
