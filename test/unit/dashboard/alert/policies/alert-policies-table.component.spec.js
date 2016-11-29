'use strict';

describe('Component: alertPolicyTable', function() {
  var scope,
    service,
    locals,
    controller;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $componentController, $httpBackend, AlertPolicyTableService) {
    scope = $rootScope.$new();
    $httpBackend.when('POST', '/v2/api').respond();
    service = AlertPolicyTableService;
    locals = {
      $scope: scope
    };
    controller = $componentController('alertPolicyTable', locals);
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
