'use strict';

describe('NavbarService', function () {
  var service;

  beforeEach(module('aiqUi'));

  beforeEach(inject(function (NavbarService) {
    service = NavbarService;
  }));

  describe('initialization', function() {
    it('should expose a config array of main and sub navbar items', function() {
      expect(service.config.length).toEqual(3);
    });

    it('should set the visibility flag of specific navbar items based on user settings', function() {
      // Placeholder for future functionality
    });

    it('should translate the navbar config labels', function() {
      // Placeholder for future functionality
    });
  });

});
