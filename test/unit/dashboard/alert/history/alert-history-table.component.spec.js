'use strict';

describe('Component: alertHistoryTable', function() {
  var scope,
    service,
    locals,
    controller;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $componentController, $httpBackend, AlertHistoryTableService) {
    scope = $rootScope.$new();
    service = AlertHistoryTableService;
    locals = {
      $scope: scope
    };
    controller = $componentController('alertHistoryTable', locals);
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
