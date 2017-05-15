'use strict';

describe('CapacityLicensingService', function () {
  let $scope,
    $q,
    DataService,
    SFTableService,
    service;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {
      callAPI: function() {},
      callGuzzleAPI: function() {},
    });
  }));

  beforeEach(inject(function ($rootScope, _$q_, _DataService_, _SFTableService_, CapacityLicensingService) {
    $scope = $rootScope.$new();
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;

    service = CapacityLicensingService;
    service.page = {start: 0, limit:25};
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(SFTableService));
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call the appropriate API method', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getData(true);
      expect(DataService.callAPI).toHaveBeenCalledWith('ListCustomerLicensingInfo');
    });

    it('should deserialize the responses and resolve an array of data', inject(function($routeParams, $filter) {
      const apiResponse = {
        customers: [
          {
            'customerID': 158,
            'customerName': '3Peaks',
            'licensedNodes': null,
            'entitledCapacity': 0,
            'provisionedLicensedCapacity': 0
          },
          {
            'customerID': 175,
            'customerName': 'Comcast',
            'licensedNodes': 92,
            'entitledCapacity': 800000000000000,
            'provisionedLicensedCapacity': 88669599825920
          },
        ],
      };
      const expectedResult = [{
        'customerID': 158,
        'customerName': '3Peaks',
        'licensedNodes': 0,
        'entitledCapacity': 0,
        'provisionedLicensedCapacity': 0,
        'detailsLink': `
          <a class="view-details-link"
              href="#/dashboard/capacityLicensing/158"
              aria-label="View capacity licensing details for the customer">
            <i class="fa fa-arrow-right right-arrow" aria-hidden="true"</i>
          </a>
        `,
      }, {
        'customerID': 175,
        'customerName': 'Comcast',
        'licensedNodes': 92,
        'entitledCapacity': 800000000000000,
        'provisionedLicensedCapacity': 88669599825920,
        'detailsLink': `
          <a class="view-details-link"
              href="#/dashboard/capacityLicensing/175"
              aria-label="View capacity licensing details for the customer">
            <i class="fa fa-arrow-right right-arrow" aria-hidden="true"</i>
          </a>
        `,
      }];
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve(apiResponse));
      service.getData(true)
        .then( response => {
           expect(response).toEqual(expectedResult);
        })
        .catch( err => {
          fail('promise was unexpectedly rejected');
        });
      $scope.$digest();
    }));

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
