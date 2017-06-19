'use strict';

describe('DashbergService', function() {
  let $q,
    service,
    DataService;

  beforeEach(angular.mock.module('aiqUi', function($provide) {
    $provide.value('DataService', {
      callPerformAPI: function() {}
    });
  }));

  beforeEach(inject(function(_$q_, DashbergService, _DataService_) {
    $q = _$q_;
    service = DashbergService;
    DataService = _DataService_;
  }));

  describe('.callPerformAPI', function() {
    it('should call the Performance API via DataService', function() {
      spyOn(DataService, 'callPerformAPI').and.returnValue($q.resolve());
      service.getPerformData();
      expect(DataService.callPerformAPI).toHaveBeenCalledWith(service.customerID, 'Performance');
    })
  })
});
