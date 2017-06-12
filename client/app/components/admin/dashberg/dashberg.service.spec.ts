'use strict';

describe('DashbergService', function() {
  let $q,
    service,
    DataService;

  beforeEach(angular.mock.module('aiqUi', function($provide) {
    $provide.value('DataService', {
      callAPI: function() {}
    });
  }));

  beforeEach(inject(function(_$q_, DashbergService, _DataService_) {
    $q = _$q_;
    service = DashbergService;
    DataService = _DataService_;
  }));

  describe('.getBandwidthData', function() {
    it('should call the DashbergBandwidth API via DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getBandwidthData();
      expect(DataService.callAPI).toHaveBeenCalledWith('DashbergBandwidth', {});
    })
  })

  describe('.getVolumeData', function() {
    it('should call the DashbergVolume API via DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getVolumeData();
      expect(DataService.callAPI).toHaveBeenCalledWith('DashbergVolume', {});
    })
  })

  describe('.getIOPData', function() {
    it('should call the DashbergIOP API via DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getIOPData();
      expect(DataService.callAPI).toHaveBeenCalledWith('DashbergIOP', {});
    })
  })

  describe('.getNodeData', function() {
    it('should call the DashbergNode API via DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getNodeData();
      expect(DataService.callAPI).toHaveBeenCalledWith('DashbergNode', {});
    })
  })

  describe('.getSessionData', function() {
    it('should call the DashbergSession API via DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getSessionData();
      expect(DataService.callAPI).toHaveBeenCalledWith('DashbergSession', {});
    })
  })

  describe('.getSnapshotData', function() {
    it('should call the DashbergSnapshot API via DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getSnapshotData();
      expect(DataService.callAPI).toHaveBeenCalledWith('DashbergSnapshot', {});
    })
  })

  describe('.getVolumeAccessData', function() {
    it('should call the DashbergVolumeAccess API via DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getVolumeAccessData();
      expect(DataService.callAPI).toHaveBeenCalledWith('DashbergVolumeAccess', {});
    })
  })

  describe('.getVolumeSizeData', function() {
    it('should call the DashbergVolumeSize API via DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.getVolumeSizeData();
      expect(DataService.callAPI).toHaveBeenCalledWith('DashbergVolumeSize', {});
    })
  })
});
