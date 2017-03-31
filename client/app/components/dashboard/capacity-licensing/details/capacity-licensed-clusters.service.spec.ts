'use strict';

describe('CapacityLicensedClusterService', function () {
  let $scope,
    $q,
    DataService,
    SFTableService,
    service;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {
      callAPI: function() {},
    });
  }));

  beforeEach(inject(function ($rootScope, _$q_, _DataService_, _SFTableService_, CapacityLicensedClusterService) {
    $scope = $rootScope.$new();
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;

    service = CapacityLicensedClusterService;
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(SFTableService));
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call the appropriate API method', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.customerID = 12;
      service.getData(true);
      expect(DataService.callAPI).toHaveBeenCalledWith('ListClusterLicensingInfo', { customerID: 12 });
    });

    it('should deserialize the response and resolve an array of data', function() {
      const apiResponse = {
        clusters: [
          {
            clusterID: 1234,
            customerID: 15,
            clusterName: 'cluster1',
            clusterProvisionedLicenseCapacity: 17822589565010,
            provisionedLicenseCapacity: 88669599825920,
            clusterCapacityUtilization: 0.201
          },
          {
            clusterID: 1235,
            customerID: 15,
            clusterName: 'cluster2',
            clusterProvisionedLicenseCapacity: 70847010260910,
            provisionedLicenseCapacity: 88669599825920,
            clusterCapacityUtilization: 0.799
          },
        ],
      };
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve(apiResponse));
      service.getData(true)
      .then( response => {
        expect(response).toEqual(apiResponse.clusters);
      })
      .catch( err => {
        fail('promise was unexpectedly rejected');
      });
      $scope.$digest();
    });

    it('should reject the error message if the JSON RPC call fails', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.reject('test error'));
      service.getData(true)
        .then( () => {
          fail('promise should have been rejected');
        })
        .catch( err => {
          expect(err).toEqual('test error');
        });
      $scope.$digest();
    });
  });
});
