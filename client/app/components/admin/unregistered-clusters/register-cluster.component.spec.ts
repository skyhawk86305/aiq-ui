describe('Component: registerUnregisteredCluster', function() {
  let $q,
    $rootScope,
    $uibModal,
    DataService,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, _$q_, _$rootScope_, _$uibModal_, _DataService_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $uibModal = _$uibModal_;
    DataService = _DataService_;
    const locals = {};
    const bindings = {
      modalInstance: {
        close() {},
        dismiss() {},
      }
    };
    controller = $componentController('registerUnregisteredCluster', locals, bindings);
  }));

  describe('initialization', function() {
    it('should request the list of all customers', function() {
      const fakeCustomerList = [
        { customerUID: 'testUID1', customerName: 'test customer 1' },
        { customerUID: 'testUID2', customerName: 'test customer 2' },
      ];
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve({ customers: fakeCustomerList }));
      controller.$onInit()
        .then( () => {
          expect(DataService.callAPI).toHaveBeenCalledWith('ListCustomers');
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        });
      $rootScope.$apply();
    });
  });

  describe('.registerCluster', function() {

    beforeEach(function() {
      controller.resolve = {
        cluster: {
          clusterUUID: 'testClusterUUID',
          clusterName: 'testClusterName',
        }
      };
      controller.customer = {
        customerUID: 'testCustomerUID',
        customerName: 'testCustomerName',
      };
      controller.customers = [
        { customerUID: 'someTestCustomerUID' },
        { customerUID: 'testCustomerUID' },
        { customerUID: 'otherTestCustomerUID' },
      ];
    });

    it('should confirm with a modal and then call RegisterCluster', function() {
      spyOn($uibModal, 'open').and.returnValue($q.resolve());
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve({ clusterID: 12345 }));
      spyOn(controller.modalInstance, 'close');
      controller.registerCluster()
        .then( () => {
          expect($uibModal.open).toHaveBeenCalledWith({
            asymmetricMatch(actual) {
              if ( actual.resolve.clusterName() !== 'testClusterName' ) return false;
              if ( actual.resolve.customerName() !== 'testCustomerName' ) return false;
              return true;
            }
          });
          expect(DataService.callAPI).toHaveBeenCalledWith('RegisterCluster', {
            clusterUUID: 'testClusterUUID',
            customerUID: 'testCustomerUID',
          });
          expect(controller.modalInstance.close).toHaveBeenCalled();
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        });
      $rootScope.$apply();
    });

    describe('when the customer is not found in ListCustomers', function() {
      it('should expose an error on the scope', function() {
        controller.customer.customerUID = 'testCustomerUIDThatDoesNotExist';
        controller.registerCluster()
          .then( () => {
            expect(controller.error).toEqual('Customer not found');
          })
          .catch( err => {
            fail('Promise was unexpectedly rejected');
          });
        $rootScope.$apply();
      });
    });

    describe('when the user declines the confirmation modal', function() {
      it('should return to the registration screen with no error', function() {
        spyOn($uibModal, 'open').and.returnValue({ result: $q.reject() });
        controller.registerCluster()
          .then( () => {
            expect(controller.error).toEqual(null);
          })
          .catch( err => {
            fail('Promise was unexpectedly rejected');
          });
        $rootScope.$apply();
      });
    });

    describe('when RegisterCluster fails with a message', function() {
      it('should expose the returned error message on the scope', function() {
        const fakeError = {
          name: 'SomeErrorFromTheBackend',
          message: 'Register cluster failed for whatever reason',
        };
        spyOn($uibModal, 'open').and.returnValue($q.resolve());
        spyOn(DataService, 'callAPI').and.returnValue($q.reject(fakeError));
        controller.registerCluster()
          .then( () => {
            expect(controller.error).toEqual(fakeError.message);
          })
          .catch( err => {
            fail('Promise was unexpectedly rejected');
          });
        $rootScope.$apply();
      });
    });

    describe('when RegisterCluster fails without a message', function() {
      it('should expose a generic error message on the scope', function() {
        const fakeError = 'random error';
        spyOn($uibModal, 'open').and.returnValue($q.resolve());
        spyOn(DataService, 'callAPI').and.returnValue($q.reject(fakeError));
        controller.registerCluster()
          .then( () => {
            expect(controller.error).toEqual('An unexpected error occurred while attempting to register the cluster');
          })
          .catch( err => {
            fail('Promise was unexpectedly rejected');
          });
        $rootScope.$apply();
      });
    });
  });

});
