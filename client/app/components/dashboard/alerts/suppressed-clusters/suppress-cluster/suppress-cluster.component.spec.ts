describe('suppressCluster component', function() {
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
      callGuzzleAPI() {},
    };
    controller = $componentController('suppressCluster', { DataService }, { modalInstance });
  }));


  describe('.next', function() {

    it('should query GetClusterInfo from guzzle for the entered cluster ID', function() {
      spyOn(DataService, 'callGuzzleAPI').and.returnValue($q.resolve());
      controller.clusterID = 123;
      controller.next();
      expect(DataService.callGuzzleAPI).toHaveBeenCalledWith(123, 'GetClusterInfo');
    });

    describe('when the cluster is found', function() {
      it('should set the clusterName and clusterProvided on the controller', function() {
        const fakeResponse = { clusterInfo: { name: 'testName' } };
        spyOn(DataService, 'callGuzzleAPI').and.returnValue($q.resolve(fakeResponse));
        controller.next();
        $rootScope.$apply();
        expect(controller.clusterName).toBe('testName');
        expect(controller.clusterProvided).toBe(true);
      });
    });

    describe('when the cluster is not found', function() {
      it('should expose an error to the template', function() {
        spyOn(DataService, 'callGuzzleAPI').and.returnValue($q.reject('not found'));
        controller.clusterID = 123;
        controller.next();
        $rootScope.$apply();
        expect(controller.error).toBe('There is no cluster with ID 123, or you do not have permission to view it.');
        expect(controller.clusterProvided).toBe(false);
      });
    });

  });

  describe('.suppress', function() {
    const duration = 60 * 60 * 1000;

    beforeEach(function() {
      spyOn(controller, 'getDurationMillis').and.returnValue(duration);
    });

    it('should call SuppressNotifications with the duration from .getDurationMillis()', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      controller.clusterID = '123';
      controller.suppress();
      expect(DataService.callAPI).toHaveBeenCalledWith('SuppressNotifications', { clusterID: 123, durationSec: duration / 1000 });
    });

    describe('when the API call is successful', function() {
      it('should close the modal with a result object representing the new suppression', function() {
        spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
        spyOn(modalInstance, 'close');
        controller.clusterID = '123';
        controller.clusterName = 'testCluster';
        controller.suppress();
        $rootScope.$apply();
        expect(modalInstance.close).toHaveBeenCalled();
        const result = modalInstance.close.calls.first().args[0];
        expect(result.clusterID).toBe(123);
        expect(result.clusterName).toBe('testCluster');
        expect(result.endDate.getTime()).toBeCloseTo(new Date(new Date().getTime() + duration).getTime(), 3);
      });
    });

    describe('when the API call fails', function() {

      describe('and the error has a message', function() {
        it('should dismiss the modal with the error message', function() {
          const fakeError = { message: 'something went wrong' };
          spyOn(DataService, 'callAPI').and.returnValue($q.reject(fakeError));
          spyOn(modalInstance, 'dismiss');
          controller.clusterID = '123';
          controller.suppress();
          $rootScope.$apply();
          expect(modalInstance.dismiss).toHaveBeenCalledWith(fakeError.message);
        });
      });

      describe('and the error does not have a message', function() {
        it('should dismiss the modal with a generic error message', function() {
          const fakeError = 'something went wrong';
          spyOn(DataService, 'callAPI').and.returnValue($q.reject(fakeError));
          spyOn(modalInstance, 'dismiss');
          controller.clusterID = '123';
          controller.suppress();
          $rootScope.$apply();
          expect(modalInstance.dismiss).toHaveBeenCalledWith('An unexpected error occurred');
        });
      });

    });

  });

});
