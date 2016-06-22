'use strict';

describe('Route Config', function () {
  var rootScope,
      state;

  beforeEach(module('elementUiPerNode'));

  beforeEach(inject(function ($rootScope, $state) {
    rootScope = $rootScope;
    state = $state;
    spyOn(state, 'go');
  }));

  describe('route changes', function() {
    it('should redirect the user to the first child route when routing to a parent route (that has children)', function() {
      rootScope.$broadcast('$stateChangeStart', {name:'networkSettings'});
      expect(state.go).toHaveBeenCalledWith('networkSettings.bondOneG');
    });
  });

});
