describe('Component: registerCluster', function() {
  let controller,
    $q,
    $rootScope,
    fakeRootScope,
    $uibModal,
    DataService,
    fakeElementClientInstance;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, _$q_, _$uibModal_, _$rootScope_, _DataService_, _ElementClient_) {
    $q = _$q_;
    $uibModal = _$uibModal_;
    $rootScope = _$rootScope_;
    DataService = _DataService_;
    fakeRootScope = {
      $broadcast() {}
    };
    controller = $componentController('registerCluster', {
      DataService,
      $rootScope: fakeRootScope,
    });
    fakeElementClientInstance = {
      callAPI() {}
    };
    spyOn(controller, 'ElementClient').and.returnValue(fakeElementClientInstance);
  }));

  describe('step 1', function() {
    beforeEach(function() {
      controller.clusterMVIP = '1.2.3.4';
    });

    it('should send an unauthenticated request to the cluster via ElementClient', function() {
      spyOn(fakeElementClientInstance, 'callAPI').and.returnValue($q.reject('unauthenticated'));
      controller.steps[0]()
        .then( () => {
          expect(controller.ElementClient).toHaveBeenCalledWith('1.2.3.4', '', '');
          expect(fakeElementClientInstance.callAPI).toHaveBeenCalledWith('GetClusterInfo');
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected, with: ' + err);
        });
      $rootScope.$apply();
    });

    it('should handle an unexpected error by rejecting with ClusterInfoNotRetrievable', function() {
      spyOn(fakeElementClientInstance, 'callAPI').and.returnValue($q.reject('random error'));
      controller.steps[0]()
        .then( () => {
          fail('Promise was expected to be rejected, but was resolved');
        })
        .catch( err => {
          expect(err).toEqual('ClusterInfoNotRetrievable');
        });
      $rootScope.$apply();
    });
  });

  describe('step 2', function() {
    beforeEach(function() {
      controller.clusterMVIP = '1.2.3.4';
      controller.clusterUsername = 'testuser';
      controller.clusterPassword = 'testpassword';
    });

    it('should retrieve the cluster UUID and check whether the cluster is registered', function() {
      spyOn(fakeElementClientInstance, 'callAPI').and.returnValue($q.resolve({
        clusterInfo: { name: 'testClusterName', uuid: 'testClusterUUID' }
      }));
      spyOn(DataService, 'callAPI').and.returnValue($q.reject({ name: 'NoSuchClusterFoundFault' }));
      controller.steps[1]()
        .then( () => {
          expect(controller.ElementClient).toHaveBeenCalledWith('1.2.3.4', 'testuser', 'testpassword');
          expect(fakeElementClientInstance.callAPI).toHaveBeenCalledWith('GetClusterInfo');
          expect(controller.clusterName).toEqual('testClusterName');
          expect(controller.clusterUUID).toEqual('testClusterUUID');
          expect(DataService.callAPI).toHaveBeenCalledWith('FindCluster', { clusterUUID: 'testClusterUUID' });
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected, with: ' + err);
        });
      $rootScope.$apply();
    });

    it('should handle an already-registered cluster that the user can see', function() {
      spyOn(fakeElementClientInstance, 'callAPI').and.returnValue($q.resolve({
        clusterInfo: { name: 'testClusterName', uuid: 'testClusterUUID' }
      }));
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve({ clusterID: 1234, customerID: 234 }));
      controller.steps[1]()
        .then( () => {
          fail('Promise was expected to be rejected, but was resolved');
        })
        .catch( err => {
          expect(err).toEqual('ClusterAlreadyRegistered');
          expect(controller.clusterID).toEqual(1234);
        });
      $rootScope.$apply();
    });

    it('should handle an already-registered cluster that the user does not have permission to see', function() {
      spyOn(fakeElementClientInstance, 'callAPI').and.returnValue($q.resolve({
        clusterInfo: { name: 'testClusterName', uuid: 'testClusterUUID' }
      }));
      spyOn(DataService, 'callAPI').and.returnValue($q.reject({ name: 'ClusterNotAvailableFault' }));
      controller.steps[1]()
        .then( () => {
          fail('Promise was expected to be rejected, but was resolved');
        })
        .catch( err => {
          expect(err).toEqual('RegisteredClusterPermissionError');
        });
      $rootScope.$apply();
    });

    it('should handle an unexpected error when checking cluster registration', function() {
      spyOn(fakeElementClientInstance, 'callAPI').and.returnValue($q.resolve({
        clusterInfo: { name: 'testClusterName', uuid: 'testClusterUUID' }
      }));
      spyOn(DataService, 'callAPI').and.returnValue($q.reject('random error'));
      controller.steps[1]()
        .then( () => {
          fail('Promise was expected to be rejected, but was resolved');
        })
        .catch( err => {
          expect(err).toEqual('RegistrationCheckError');
        });
      $rootScope.$apply();
    });

  });

  describe('step 3', function() {
    beforeEach(function() {
      controller.clusterName = 'testClusterName';
      controller.clusterUUID = 'testClusterUUID';
      controller.customerUID = 'testCustomerUID';
    });

    it('should look up the customer, show a confirmation modal, and register the cluster', function() {
      const getCustomerResponse = $q.resolve({ customer: { customerName: 'testCustomer' } });
      const registerClusterResponse = $q.resolve({ clusterID: 12345 });
      spyOn(DataService, 'callAPI').and.returnValues(getCustomerResponse, registerClusterResponse);
      spyOn($uibModal, 'open').and.returnValue($q.resolve());
      spyOn(fakeRootScope, '$broadcast').and.returnValue(undefined);
      controller.steps[2]()
        .then( () => {
          expect(DataService.callAPI).toHaveBeenCalledWith('GetCustomer', { customerUID: 'testCustomerUID' });
          expect($uibModal.open).toHaveBeenCalledWith({
            asymmetricMatch(actual) {
              if ( actual.resolve.clusterName() !== 'testClusterName' ) return false;
              if ( actual.resolve.customerName() !== 'testCustomer' ) return false;
              return true;
            }
          });
          expect(DataService.callAPI).toHaveBeenCalledWith('RegisterCluster', {
            clusterUUID: 'testClusterUUID',
            customerUID: 'testCustomerUID',
          });
          expect(controller.clusterID).toEqual(12345);
          expect(fakeRootScope.$broadcast).toHaveBeenCalledWith('refresh-cluster-select');
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected, with: ' + err);
        });
      $rootScope.$apply();
    });

    describe('when the customer does not exist', function() {
      it('should reject with a CustomerNotFoundError', function() {
        const getCustomerResponse = $q.reject({ name: 'InvalidCustomerFault' });
        spyOn(DataService, 'callAPI').and.returnValue(getCustomerResponse);
        controller.steps[2]()
          .then( () => {
            fail('Promise was expected to be rejected, but was resolved');
          })
          .catch( err => {
            expect(DataService.callAPI).toHaveBeenCalledWith('GetCustomer', { customerUID: 'testCustomerUID' });
            expect(err).toEqual('CustomerNotFoundError');
          });
        $rootScope.$apply();
      });
    });

    describe('when an unexpected customer check error occurs', function() {
      it('should reject with a CustomerCheckError', function() {
        spyOn(DataService, 'callAPI').and.returnValue($q.reject('random error'));
        controller.steps[2]()
          .then( () => {
            fail('Promise was expected to be rejected, but was resolved');
          })
          .catch( err => {
            expect(DataService.callAPI).toHaveBeenCalledWith('GetCustomer', { customerUID: 'testCustomerUID' });
            expect(err).toEqual('CustomerCheckError');
          });
        $rootScope.$apply();
      });
    });

    describe('when the cluster is already registered', function() {
      it('should reject with a ClusterAlreadyRegistered error', function() {
        const getCustomerResponse = $q.resolve({ customer: { customerName: 'testCustomer' } });
        const registerClusterResponse = $q.reject({ name: 'ClusterAlreadyRegisteredFault' });
        spyOn(DataService, 'callAPI').and.returnValues(getCustomerResponse, registerClusterResponse);
        spyOn($uibModal, 'open').and.returnValue($q.resolve());
        controller.steps[2]()
          .then( () => {
            fail('Promise was expected to be rejected, but was resolved');
          })
          .catch( err => {
            expect(DataService.callAPI).toHaveBeenCalledWith('RegisterCluster', {
              clusterUUID: 'testClusterUUID',
              customerUID: 'testCustomerUID',
            });
            expect(err).toEqual('ClusterAlreadyRegistered');
            expect(controller.clusterID).toEqual(null);
          });
        $rootScope.$apply();
      });
    });

  });

});
