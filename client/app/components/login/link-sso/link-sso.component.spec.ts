'use strict';

describe('Component: Link SSO modal', function() {
  let $q,
    $rootScope,
    $window,
    $location,
    controller,
    AuthService;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$q_, _$rootScope_, _$window_, _$location_, $componentController) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $window = _$window_;
    $location = _$location_;
    AuthService = {
      createAIQAccountFromSSO() {},
    };
    const modalInstance = {
      close() {},
      dismiss() {},
    };
    const locals = { $window, $location, AuthService };
    const bindings = { modalInstance };
    controller = $componentController('linkSSO', locals, bindings);
  }));

  describe('.goToAIQLogin', function() {
    it('should send the user to the AIQ login page with the linkSSO query param set', function() {
      const search = jasmine.createSpy('search')
      spyOn($location, 'path').and.returnValues('/test/url', { search });
      spyOn(controller.modalInstance, 'close');
      controller.goToAIQLogin();
      expect($location.path).toHaveBeenCalledWith('/aiq-login');
      expect(search).toHaveBeenCalledWith({ linkSSO: true, url: '/test/url' });
      expect(controller.modalInstance.close).toHaveBeenCalled();
    });
  });

  describe('.createAndLinkAIQAccount', function() {
    it(`should call the AuthService function to create the account, then reload the page`, function() {
      spyOn($window.location, 'reload');
      spyOn(AuthService, 'createAIQAccountFromSSO').and.returnValue($q.resolve());
      controller.createAndLinkAIQAccount();
      $rootScope.$apply();
      expect(AuthService.createAIQAccountFromSSO).toHaveBeenCalled();
      expect($window.location.reload).toHaveBeenCalled();
    });
  });

});
