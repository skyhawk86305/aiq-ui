'use strict';

describe('Component: dashberg', function() {
  let controller,
    dashbergService,
    $q,
    $scope;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$q_, $rootScope, $componentController, DashbergService) {
    controller = $componentController('dashberg');
    dashbergService = DashbergService;
    $q = _$q_;
    $scope = $rootScope.$new();
  }));

  describe('.onInit()', function() {
    it('should call getPerformanceData function and get return promise', function() {
      spyOn(controller, 'getPerformanceData').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getPerformanceData).toHaveBeenCalled();
    })
    it('should call getCustomers function and get return promise', function() {
      spyOn(controller, 'getCustomers').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getCustomers).toHaveBeenCalled();
    })
  })

  describe('.getPerformanceData', function() {
    it('should call DashbergService and get performanceData from API', function() {
      const apiResponse = {
        nodes: {},
        volumes: {
          min: 2500,
          size: {
            min: 130000000
          }
        },
        volumeAccessGroups: {},
        iops: {},
        bandwidth: {},
        sessions: {},
        snapshots: {}
      }
      const expectedResponse = {
        nodes: {},
        volumes: {
          min: 2500,
          size: {
            min: 130000000
          }
        },
        volumeAccessGroups: {},
        iops: {},
        bandwidth: {},
        sessions: {},
        snapshots: {}
      }
      spyOn(dashbergService, 'getPerformanceData').and.returnValue($q.resolve(apiResponse));
      controller.getPerformanceData()
        .then(() => {
          expect(controller.performanceData).toEqual(expectedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    })
  })

  describe('.updateID', function() {
    it('should call getPerformanceData function and get return promise', function() {
      spyOn(controller, 'getPerformanceData').and.returnValue($q.defer().promise);
      controller.updateID();
      expect(controller.getPerformanceData).toHaveBeenCalled();
    })
  })

  describe('.getCustomers', function() {
    it('should call DashbergService and get customers from API', function() {
      const apiResponse = {
        customers: [
          {
            customerID: 1,
            customerName: 'SolidFire Internal'
          },
          {
            customerID: 49,
            customerName: 'SolidFire'
          }
        ]
      }
      const expectedCustomerList = [
        {
          id: 1,
          name: 'SolidFire Internal'
        },
        {
          id: 49,
          name: 'SolidFire'
        }
      ]
      spyOn(dashbergService, 'getCustomerInfo').and.returnValue($q.resolve(apiResponse));
      controller.getCustomers()
        .then(() => {
          expect(controller.customers).toEqual(expectedCustomerList);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    })

    it('should handle a response with no customers', function() {
      const apiResponse = {};
      const expectedCustomerList = [];
      spyOn(dashbergService, 'getCustomerInfo').and.returnValue($q.resolve(apiResponse));
      controller.getCustomers()
        .then(() => {
          expect(controller.customers).toEqual(expectedCustomerList);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    })

  })
});
