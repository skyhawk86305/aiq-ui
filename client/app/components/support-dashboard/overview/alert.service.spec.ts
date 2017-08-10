'use strict';

describe('AlertService', function () {
  let $rootScope,
    $q,
    DataService,
    SFTableService,
    service;

  beforeEach(angular.mock.module('aiqUi', function($provide) {
    $provide.value('DataService', {
      callAPI() {},
    });
  }));

  beforeEach(inject(function (_$rootScope_, _$q_, _DataService_, _SFTableService_, AlertService) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;

    service = AlertService;
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(SFTableService));
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should deserialize the responses and resolve an array of data', function() {
      const apiResponse = {
        alerts: [{
          date: '2017-4-14 09:31:31',
          alert: 'The Solidfire Application cannot communicate with node',
          alertType: 'Element',
          totalAlerts: 5,
          clusterID: 2147039,
          customerName:'HCI Testing',
          clusterName: 'cm-solidfire',
          lastUpdateTime: '2017-4-14 15:31:33',
          lastModifiedBy: 'N/A',
          id:3602647,
          severity:'warning',
          resolved:false,
          notes: 'test1'
        }],
      };
      const expectedResult = [{
          date: '2017-4-14 09:31:31',
          alert: 'The Solidfire Application cannot communicate with node',
          alertType: 'Element',
          totalAlerts: 5,
          clusterID: 2147039,
          customerName:'HCI Testing',
          clusterName: 'cm-solidfire',
          lastUpdateTime: '2017-4-14 15:31:33',
          lastModifiedBy: 'N/A',
          id: 3602647,
          severity: 'warning',
          resolved: false,
          notes: 'test1',
          sfselected: undefined
      },{
        date: '2017-5-14 09:31:31',
        alert: 'The Solidfire Application cannot communicate with node',
        alertType: 'Element',
        totalAlerts: 5,
        clusterID: 2147039,
        customerName:'HCI Testing',
        clusterName: 'cm-solidfire',
        lastUpdateTime: '2017-4-14 15:31:33',
        lastModifiedBy: 'N/A',
        id: 3602648,
        severity: 'warning',
        resolved: true,
        notes: 'test1',
        sfselected: undefined
      },
     {
        date: '2017-4-24 09:31:31',
        alert: 'The Solidfire Application cannot communicate with node',
        alertType: 'Element',
        totalAlerts: 4,
        clusterID: 2147040,
        customerName:'HCI Testing',
        clusterName: 'cm-solidfire',
        lastUpdateTime: '2017-4-4 18:31:33',
        lastModifiedBy: 'N/A',
        id: 3602649,
        severity:'error',
        resolved: false,
        notes: 'test1',
        sfselected: undefined
      }];
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve(apiResponse));
      service.getData(true)
        .then( response => {
           expect(response).toEqual(expectedResult);
        })
        .catch( err => {
          fail('promise was unexpectedly rejected');
        });
      $rootScope.$digest();
    });

  });
});
