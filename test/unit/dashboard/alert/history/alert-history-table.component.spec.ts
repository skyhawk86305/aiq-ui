'use strict';

describe('Component: alertHistoryTable', function() {
  var service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(angular.mock.module('componentTemplates'));

  beforeEach(inject(function($componentController, AlertHistoryTableService) {
    service = AlertHistoryTableService;
    controller = $componentController('alertHistoryTable');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
