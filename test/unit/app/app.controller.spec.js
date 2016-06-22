'use strict';

describe('AppController', function () {
  var rootScope,
      controller;

  beforeEach(module('elementUiPerNode'));

  beforeEach(inject(function ($rootScope, $controller) {
    rootScope = $rootScope;
    controller = $controller('AppController', {$rootScope:rootScope});
  }));

  describe('initialization', function() {
    it('should expose the navbar and apiLog services', function() {
      expect(controller.navbar).toBeDefined();
      expect(controller.apiLog).toBeDefined();
    });
  });

  describe('route changes', function() {
    it('should update the currentPage variable used in the html title tag', function() {
      rootScope.$broadcast('$stateChangeSuccess', {name:'networkSettings.bondOneG'});
      expect(controller.currentPage).toEqual('networkSettings-bondOneG');
    });
  });

});
