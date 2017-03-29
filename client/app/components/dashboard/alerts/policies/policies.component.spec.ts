'use strict';

describe('Component: alertPolicyTable', function() {
  let service,
    controller,
    $rootScope;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$rootScope_, _$componentController_, AlertPolicyTableService) {
    $rootScope = _$rootScope_;
    service = AlertPolicyTableService;
    controller = _$componentController_('alertPolicyTable');
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });
  });

  describe('openModal event', function() {
    it('should set the modal to be open', function() {
      $rootScope.$broadcast('openModal', {data: true});
      expect(controller.notification).toEqual({data: true});
      expect(controller.isModalOpen).toEqual(true);
    });
  });

});
