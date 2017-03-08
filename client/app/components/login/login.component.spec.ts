'use strict';

describe('Component: navbar', function() {
  let scope,
      service,
      deferred,
      location,
      locals,
      bindings,
      controller,
      spy;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($rootScope, $location, $q, $componentController, AuthService) {
    scope = $rootScope.$new();
    service = AuthService;
    deferred = $q.defer();
    spy = spyOn(service, 'login').and.returnValue(deferred.promise);
    location = $location;
    spyOn(location, 'path');
    locals = {
      $scope: scope
    };
    bindings = {
      AuthService: service,
      $location: location
    };
    controller = $componentController('login', locals, bindings);
  }));

  describe('.login', function() {
    it('should call AuthService.login with credentials', function() {
      let credentials = {username: 'foo', password: 'bar'};
      deferred.resolve();
      controller.login(credentials);
      expect(service.login).toHaveBeenCalledWith(credentials);
    });

    it(`should set the error to null and set the location path to '/' on login success`, function() {
      controller.login();
      deferred.resolve();
      scope.$apply();
      expect(controller.error).toEqual(null);
      expect(location.path).toHaveBeenCalledWith('/');
    });

    it(`should redirect to the URL specified by the 'url' query param on login success`, function() {
      spyOn(location, 'search').and.returnValue({ url: '/test/url' });
      controller.login();
      deferred.resolve();
      scope.$apply();
      expect(location.path).toHaveBeenCalledWith('/test/url');
    });

    it('should set the error message and not set the location path upon login failure', function() {
      controller.login();
      deferred.reject();
      scope.$apply();
      expect(controller.error).toEqual('Invalid username or password');
      expect(location.path).not.toHaveBeenCalled();
    });
  });
});
