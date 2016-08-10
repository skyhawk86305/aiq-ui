'use strict';

describe('Component: alertPolicyTable', function() {
  var el,
    rootScope,
    scope,
    service,
    element,
    controller;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $compile, $httpBackend, AlertPolicyTableService) {
    el = '<alert-policy-table></alert-policy-table>';
    rootScope = $rootScope;
    scope = $rootScope.$new();
    $httpBackend.when('POST', '/v2/api').respond();
    service = AlertPolicyTableService;
    element = $compile(angular.element(el))(scope);
    scope.$digest();
    controller = element.controller('alertPolicyTable');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
