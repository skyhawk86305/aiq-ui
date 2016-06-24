'use strict';

describe('Route Config', function () {
  var rootScope,
      state;

  beforeEach(module('aiqUi'));

  beforeEach(inject(function ($rootScope, $state) {
    rootScope = $rootScope;
    state = $state;
    spyOn(state, 'go');
  }));

  describe('route changes', function() {
    it('should redirect the user to the first child route when routing to a parent route (that has children)', function() {
      rootScope.$broadcast('$stateChangeStart', {name:'dashboard'});
      expect(state.go).toHaveBeenCalledWith('dashboard.overview');

      rootScope.$broadcast('$stateChangeStart', {name:'cluster'});
      expect(state.go).toHaveBeenCalledWith('cluster.nodes');
    });
  });

});
