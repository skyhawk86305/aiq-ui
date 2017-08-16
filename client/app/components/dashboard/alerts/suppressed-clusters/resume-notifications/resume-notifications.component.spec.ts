'use strict';

describe('Component: resumeNotifications', function() {
  let controller, $q, $rootScope, DataService, modalInstance;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$q_, _$rootScope_, $componentController) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    modalInstance = {
      dismiss() {},
      close() {},
    };
    DataService = {
      callAPI() {},
    };
    controller = $componentController('resumeNotifications', { DataService }, { modalInstance });
    controller.resolve = { suppression: { clusterID: 123, clusterName: 'testCluster' } };
  }));


  describe('.resumeNotifications', function() {

    it('should call UnsuppressNotifications with the clusterID from the suppression', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      controller.resumeNotifications();
      expect(DataService.callAPI).toHaveBeenCalledWith('UnsuppressNotifications', { clusterID: 123 });
    });

    describe('when the API call is successful', function() {
      it('should close the modal with a result object representing the successful resumption of notifications', function() {
        spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
        spyOn(modalInstance, 'close');
        controller.resumeNotifications();
        $rootScope.$apply();
        expect(modalInstance.close).toHaveBeenCalled();
        const result = modalInstance.close.calls.first().args[0];
        expect(result.clusterID).toBe(123);
        expect(result.clusterName).toBe('testCluster');
      });
    });

    describe('when the API call fails', function() {

      describe('and the error has a message', function() {
        it('should dismiss the modal with the error message', function() {
          const fakeError = { message: 'something went wrong' };
          spyOn(DataService, 'callAPI').and.returnValue($q.reject(fakeError));
          spyOn(modalInstance, 'dismiss');
          controller.resumeNotifications();
          $rootScope.$apply();
          expect(modalInstance.dismiss).toHaveBeenCalledWith(fakeError.message);
        });
      });

      describe('and the error does not have a message', function() {
        it('should dismiss the modal with a generic error message', function() {
          const fakeError = 'something went wrong';
          spyOn(DataService, 'callAPI').and.returnValue($q.reject(fakeError));
          spyOn(modalInstance, 'dismiss');
          controller.resumeNotifications();
          $rootScope.$apply();
          expect(modalInstance.dismiss).toHaveBeenCalledWith('An unexpected error occurred');
        });
      });

    });

  });

});
