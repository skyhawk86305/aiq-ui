describe('Component: findCluster', function() {
  let controller,
    $q,
    $rootScope,
    $location,
    pathParams,
    DataService;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, _$q_, _$rootScope_, _$location_, _DataService_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    DataService = _DataService_;
    pathParams = {
      clusterUUID: 'test-uuid',
      requestedRoute: 'reporting/overview',
    };
    controller = $componentController('findCluster', {
      $route: { current: { pathParams } },
    });
    spyOn($location, 'path');
  }));

  describe('when the cluster is successfully found', function() {
    it('should redirect to the requested page for that cluster', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve({ clusterID: 123 }));
      controller.$onInit()
        .then( () => {
          expect(DataService.callAPI).toHaveBeenCalledWith('FindCluster', { clusterUUID: 'test-uuid' });
          expect($location.path).toHaveBeenCalledWith('/cluster/123/reporting/overview');
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        });
      $rootScope.$apply();
    });
  });

  describe('when no cluster is found for the requested UUID', function() {
    it('should expose a ClusterNotFound error to the template', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.reject({ name: 'NoSuchClusterFoundFault' }));
      controller.$onInit()
        .then( () => {
          expect($location.path).not.toHaveBeenCalled();
          expect(controller.error).toEqual('ClusterNotFound');
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        });
      $rootScope.$apply();
    });
  });

  describe('when the user does not have permission to view the cluster', function() {
    it('should expose a ClusterPermissionDenied error to the template', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.reject({ name: 'ClusterNotAvailableFault' }));
      controller.$onInit()
        .then( () => {
          expect($location.path).not.toHaveBeenCalled();
          expect(controller.error).toEqual('ClusterPermissionDenied');
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        });
      $rootScope.$apply();
    });
  });

  describe('when an error occurs while trying to look up the cluster', function() {
    it('should expose a FindClusterFailed error to the template', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.reject('random failure'));
      controller.$onInit()
        .then( () => {
          expect($location.path).not.toHaveBeenCalled();
          expect(controller.error).toEqual('FindClusterFailed');
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        });
      $rootScope.$apply();
    });
  });

});
