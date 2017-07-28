'use strict';

describe('Component: link aiq netapp accounts modal', function() {
  let $q,
      $rootScope,
      $window,
      $uibModal,
      $location,
      AuthService,
      locals,
      bindings,
      controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$rootScope_, _$location_, _$q_, _$window_, _$uibModal_, $componentController) {
    $q = _$q_;
    $rootScope = _$rootScope_.$new();
    $window = _$window_;
    $uibModal = _$uibModal_;
    $location = _$location_;
    spyOn($location, 'path');
    spyOn($window, 'open');
    locals = {
      $rootScope: $rootScope
    };
    bindings = {
      $window: $window,
      $location: $location,
      $uibModal: $uibModal,
      modalInstance: {
        close() {},
        dismiss() {},
      },
    };
    controller = $componentController('linkAiqNetappAccounts', locals, bindings);
  }));

  describe('.cancel', function() {
    it('should close the modal', function() {
      spyOn(controller.modalInstance, 'close');
      controller.cancel();
      expect(controller.modalInstance.close).toHaveBeenCalled();
    });
  });

  describe('.loginWithSSO', function() {
    // goes to NetApp SSO login page and after login, redirects to correct page
  });

  describe('.registerForNetappSupportAccount', function() {
    it('should open the NetApp registration page in a new tab', function() {
      controller.registerForNetappSupportAccount();
      expect($window.open).toHaveBeenCalledWith('https://mysupport.netapp.com/eservice/public/now.do', '_blank');
    });

    it('should call the cancel function', function() {
      spyOn(controller, 'cancel');
      controller.registerForNetappSupportAccount();
      expect(controller.cancel).toHaveBeenCalled();
    })
  });
});
