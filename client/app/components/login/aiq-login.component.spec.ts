'use strict';

describe('Component: aiq login', function() {
  let $q,
      deferred,
      $rootScope,
      $uibModal,
      $location,
      AuthService,
      locals,
      bindings,
      controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$rootScope_, _$location_, _$q_, _$uibModal_, $componentController, _AuthService_) {
    $q = _$q_;
    deferred = $q.defer();
    $rootScope = _$rootScope_.$new();
    $uibModal = _$uibModal_;
    $location = _$location_;
    AuthService = _AuthService_;
    spyOn(AuthService, 'login').and.returnValue(deferred.promise);
    spyOn($location, 'path');
    locals = {
      $rootScope: $rootScope
    };
    bindings = {
      AuthService: AuthService,
      $location: $location,
      $uibMoal: $uibModal,
      modalInstance: {
        close() {},
        dismiss() {},
      },
    };
    controller = $componentController('aiqLogin', locals, bindings);
  }));

  describe('.login', function() {
    it('should call AuthService.login with credentials', function() {
      let credentials = {username: 'foo', password: 'bar'};
      deferred.resolve();
      controller.login(credentials);
      expect(AuthService.login).toHaveBeenCalledWith(credentials);
    });

    xit('should call open uib', function() {
      spyOn(controller.$uibModal, 'open').and.returnValue($q.resolve());
      controller.openLinkingModal();
      expect(controller.$uibModal.open).toHaveBeenCalled();
    });

    it(`should set the error to null and set the location path to '/' on login success`, function() {
      controller.login();
      deferred.resolve();
      $rootScope.$apply();
      expect(controller.error).toEqual(null);
      expect($location.path).toHaveBeenCalledWith('/');
    });

    it(`should redirect to the URL specified by the 'url' query param on login success`, function() {
      spyOn($location, 'search').and.returnValue({ url: '/test/url' });
      controller.login();
      deferred.resolve();
      $rootScope.$apply();
      expect($location.path).toHaveBeenCalledWith('/test/url');
    });

    it('should set the error message and not set the location path upon login failure', function() {
      controller.login();
      deferred.reject();
      $rootScope.$apply();
      expect(controller.error).toEqual('Invalid username or password');
      expect($location.path).not.toHaveBeenCalled();
    });
  });
});