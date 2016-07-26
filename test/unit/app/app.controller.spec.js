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
      expect(controller.apiLog).toBeDefined();
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
  });

});
