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
    it('should call getPerformData function and get return promise', function() {
      spyOn(controller, 'getPerformData').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getPerformData).toHaveBeenCalled();
    })
  })

  describe('.getPerformData', function() {
    it('should call DashbergService and get performData from API', function() {
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
      spyOn(dashbergService, 'getPerformData').and.returnValue($q.resolve(apiResponse));
      controller.getPerformData()
        .then(() => {
          expect(controller.performData).toEqual(expectedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    });
  });

  describe('.updateID', function() {
    it('should update Data when change customer id', function() {
      controller.selectedCustomerID = 'Customer Name';
      controller.updateID();
      expect(controller.selectedID).toEqual(null);
      controller.selectedCustomerID = '123';
      controller.updateID();
      expect(controller.selectedID).toEqual(parseInt(controller.selectedCustomerID, 10));
    })
    it('should call getPerformData function and get return promise', function() {
      spyOn(controller, 'getPerformData').and.returnValue($q.defer().promise);
      controller.updateID();
      expect(controller.getPerformData).toHaveBeenCalled();
    })
  })
});
