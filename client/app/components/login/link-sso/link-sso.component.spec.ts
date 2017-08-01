'use strict';

describe('Component: Link SSO modal', function() {
  let $window,
    $location,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$window_, _$location_, $componentController) {
    $window = _$window_;
    $location = _$location_;
    const modalInstance = {
      close() {},
      dismiss() {},
    };
    const bindings = { $window, $location, modalInstance };
    controller = $componentController('linkSSO', null, bindings);
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
    it(`should show a message saying it isn't implemented yet`, function() {
      spyOn($window, 'alert');
      controller.createAndLinkAIQAccount();
      expect($window.alert).toHaveBeenCalledWith('Not yet implemented');
    });
  });

});
