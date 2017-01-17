'use strict';

describe('Component: alertPolicyTable', function() {
  var service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(angular.mock.module('componentTemplates'));

  beforeEach(inject(function($componentController, AlertPolicyTableService) {
    service = AlertPolicyTableService;
    controller = $componentController('alertPolicyTable');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

});
