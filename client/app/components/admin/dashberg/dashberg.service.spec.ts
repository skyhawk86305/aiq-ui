'use strict';

describe('DashbergService', function() {
  let $q,
    service,
    DataService;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$q_, DashbergService, _DataService_) {
    $q = _$q_;
    service = DashbergService;
    DataService = _DataService_;
  }));

  describe('.getPerformanceData', function() {
    it('should call the Performance API via DataService', function() {
      spyOn(DataService, 'callPerformanceAPI').and.returnValue($q.resolve());
      service.getPerformanceData();
      expect(DataService.callPerformanceAPI).toHaveBeenCalledWith(service.customerID, 'Performance');
    })
  })

  describe('.getCustomerInfo', function() {
    it('should call the ListCustomers API via DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getCustomerInfo();
      expect(DataService.callAPI).toHaveBeenCalledWith('ListCustomers');
    })
  })
});
