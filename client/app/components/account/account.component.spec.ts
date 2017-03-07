'use strict';

describe('Component: account', function() {
  let controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController) {
    controller = $componentController('account');
  }));

  describe('initialization', function() {
    it('should expose UserInfoService for the template to use directly', function() {
      expect(controller.userInfo).toBeDefined();
    });
  });

});
