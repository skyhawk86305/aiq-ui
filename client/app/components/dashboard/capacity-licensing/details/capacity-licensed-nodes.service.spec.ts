'use strict';

describe('CapacityLicensedNodeService', function () {
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

  beforeEach(inject(function ($rootScope, _$q_, _DataService_, _SFTableService_, CapacityLicensedNodeService) {
    $scope = $rootScope.$new();
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;

    service = CapacityLicensedNodeService;
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
      expect(DataService.callAPI).toHaveBeenCalledWith('ListLicensedNodes', { customerID: 12 });
    });

    it('should deserialize the response and resolve an array of data', function() {
      const apiResponse = {
        licensedNodes: [{
          customerID: 175,
          clusterName: 'sf-as-a02',
          serviceTag: '414JGB2',
          nodeType: 'SF19210',
          rawCapacity: 19200000000000,
        }],
      };
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve(apiResponse));
      service.getData(true)
      .then( response => {
        expect(response).toEqual(apiResponse.licensedNodes);
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
