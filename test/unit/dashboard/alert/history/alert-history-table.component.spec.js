'use strict';

describe('Component: alertHistoryTable', function() {
  var el,
    rootScope,
    scope,
    service,
    element,
    controller;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $compile, $httpBackend, AlertHistoryTableService) {
    el = '<alert-history-table></alert-history-table>';
    rootScope = $rootScope;
    scope = $rootScope.$new();
    $httpBackend.when('POST', '/v2/api').respond();
    service = AlertHistoryTableService;
    element = $compile(angular.element(el))(scope);
    scope.$digest();
    controller = element.controller('alertHistoryTable');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
