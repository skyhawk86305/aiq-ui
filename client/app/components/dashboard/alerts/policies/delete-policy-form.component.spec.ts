'use strict';

describe('Component: deletePolicyForm', function() {
  let service,
    controller,
    deferred,
    apiFailure,
    $rootScope;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callAPI: function() {} });
  }));

  beforeEach(inject(function(_$q_, _$rootScope_, _$componentController_, DataService) {
    service = DataService;
    controller = _$componentController_('deletePolicyForm');
    controller.formData = {};
    deferred = _$q_.defer();
    $rootScope = _$rootScope_;
    spyOn(service, 'callAPI').and.returnValue(deferred.promise);
  }));

  describe('deletePolicy', function() {
    it('should call the correct API', function() {
      controller.formData = {
        notificationID: 10
      };
      controller.deletePolicy();
      expect(service.callAPI).toHaveBeenCalledWith('DeleteNotification', {notificationID: 10});
    });
    it('should set the error message if the API returns an error', function() {
      controller.formData = {
        notificationID: 10
      };
      apiFailure = 'FooError';
      controller.deletePolicy();
      deferred.reject(apiFailure);
      $rootScope.$apply();
      expect(controller.error).toEqual(apiFailure);
    });
  });

});
