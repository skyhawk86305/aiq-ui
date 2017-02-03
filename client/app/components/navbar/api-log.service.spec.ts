'use strict';

describe('ApiLogService', function () {
  var service,
      parentService;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function (ApiLogService, SFApiLogService) {
    service = ApiLogService;
    parentService = SFApiLogService;
  }));

  describe('initialization', function() {
    it('should inherit from SFApiLogService', function() {
      expect(service).toEqual(jasmine.any(parentService));
    });
  });

  describe('.categorize', function() {
    it('should categorize every request into the category "All Calls"', function() {
      expect(service.categorize({foo:'bar'})).toEqual('all');
    });
  });
});
