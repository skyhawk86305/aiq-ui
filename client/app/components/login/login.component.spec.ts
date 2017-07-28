'use strict';

describe('Component: login', function() {
  let $q,
      deferred,
      $rootScope,
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
    };
    controller = $componentController('login', locals, bindings);
  }));

  describe('.loginWithSSO', function() {
  });
});