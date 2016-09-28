'use strict';

describe('AppController', function () {
  var rootScope,
      location,
      controller;

  beforeEach(module('aiqUi'));

  beforeEach(inject(function ($rootScope, $location, $controller) {
    rootScope = $rootScope;
    location = $location;
    controller = $controller('AppController');
  }));

  describe('initialization', function() {
    it('should expose the navbar and apiLog services', function() {
      expect(controller.apiLogService).toBeDefined();
      expect(controller.isUserAuthenticated).toBeFalsy();
    });
  });

  describe('route changes', function() {
    it('should update the currentPage variable used in the html title tag', function() {
      location.path('/foo/bar');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.currentPage).toEqual('foo-bar');

      location.path('/cluster/1234567/foo/bar');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.currentPage).toEqual('cluster-foo-bar');
    });
    it('should set isUserAuthenticated to true if the path location is not \'/login\'', function() {
      location.path('/foo/bar');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.isUserAuthenticated).toBeTruthy();
    });
    it('should set isUserAuthenticated to false if the path location is \'/login\'', function() {
      location.path('login');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.isUserAuthenticated).toBeFalsy();
    });
    it('should set isUserAuthenticated to false and redirect to the login page upon route change error', function() {
      spyOn(location, 'path');
      rootScope.$broadcast('$routeChangeError');
      expect(controller.isUserAuthenticated).toBeFalsy();
      expect(location.path).toHaveBeenCalledWith('/login');
    });
  });

});
