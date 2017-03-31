'use strict';

describe('Component: capacityLicensingDetails', function() {
  let $q,
    scope,
    $routeParams,
    DataService,
    CapacityLicensedClusterService,
    CapacityLicensedNodeService,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(
    $componentController,
    $rootScope,
    _$q_,
    _$routeParams_,
    _DataService_,
    _CapacityLicensedClusterService_,
    _CapacityLicensedNodeService_
  ) {
    $q = _$q_;
    DataService = _DataService_;
    CapacityLicensedClusterService = _CapacityLicensedClusterService_;
    CapacityLicensedNodeService = _CapacityLicensedNodeService_;
    $routeParams = _$routeParams_;

    scope = $rootScope.$new();
    $routeParams.customerID = '12';
    controller = $componentController('capacityLicensingDetails', { $routeParams });
  }));

  describe('initialization', function() {
    it('should expose the table services to be used in the sf-table component', function() {
      expect(controller.CapacityLicensedClusterService).toEqual(CapacityLicensedClusterService);
      expect(controller.CapacityLicensedNodeService).toEqual(CapacityLicensedNodeService);
    });
  });

  describe('.$onInit', function() {
    it('should update the table service with the clusterID from the route', function() {
      spyOn(CapacityLicensedClusterService, 'update');
      spyOn(CapacityLicensedNodeService, 'update');
      controller.$onInit();
      expect(CapacityLicensedClusterService.update).toHaveBeenCalledWith(12);
      expect(CapacityLicensedNodeService.update).toHaveBeenCalledWith(12);
    });

    it('should call the JSON RPC API and bind the response to the controller', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve({
        customerName: 'Test Customer',
        entitledCapacity: 500000000000000,
        provisionedLicensedCapacity: 244936930725962
      }));
      controller.$onInit();
      scope.$digest();
      expect(DataService.callAPI).toHaveBeenCalledWith('GetEntitledCapacity', { customerID: 12 });
      expect(controller.customerName).toEqual('Test Customer');
      expect(controller.entitledCapacity).toEqual(500000000000000);
      expect(controller.provisionedLicensedCapacity).toEqual(244936930725962);
    });

    it('should handle errors from callAPI', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.reject('test error'));
      controller.$onInit();
      scope.$digest();
      expect(controller.getEntitledCapacityState).toEqual('error');
    });
  });

});
