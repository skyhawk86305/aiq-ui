'use strict';

describe('Component: dashberg', function() {
  let controller,
    dashbergService,
    $q,
    $scope,
    dataService;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$q_, $rootScope, $componentController, DashbergService, DataService) {
      controller = $componentController('dashberg');
      dashbergService = DashbergService;
      $q = _$q_;
      $scope = $rootScope.$new();
      dataService = DataService;
  }));

  describe('.onInit()', function() {
    it('should call getNodeData function and get return promise', function() {
      spyOn(controller, 'getNodeData').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getNodeData).toHaveBeenCalled();
    })
    it('should call getVolumeData function and get return promise', function() {
      spyOn(controller, 'getVolumeData').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getVolumeData).toHaveBeenCalled();
    })
    it('should call getVolumeSizeData function and get return promise', function() {
      spyOn(controller, 'getVolumeSizeData').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getVolumeSizeData).toHaveBeenCalled();
    })
    it('should call getVolumeAccessData function and get return promise', function() {
      spyOn(controller, 'getVolumeAccessData').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getVolumeAccessData).toHaveBeenCalled();
    })
    it('should call getSessionData function and get return promise', function() {
      spyOn(controller, 'getSessionData').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getSessionData).toHaveBeenCalled();
    })
    it('should call getIOPData function and get return promise', function() {
      spyOn(controller, 'getIOPData').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getIOPData).toHaveBeenCalled();
    })
    it('should call getSnapshotData function and get return promise', function() {
      spyOn(controller, 'getSnapshotData').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getSnapshotData).toHaveBeenCalled();
    })
    it('should call getBandwidthData function and get return promise', function() {
      spyOn(controller, 'getBandwidthData').and.returnValue($q.defer().promise);
      controller.$onInit();
      expect(controller.getBandwidthData).toHaveBeenCalled();
    })
  })

  describe('.getNodeData', function() {
    it('should call DashbergService and get nodeData from API', function() {
        const apiResponse = {
          totalNodes: 539,
          minNodesCluster: 4
        }
        const expectedResponse = {
          totalNodes: 539,
          minNodesCluster: 4
        }
        spyOn(dashbergService, 'getNodeData').and.returnValue($q.resolve(apiResponse));
        controller.getNodeData()
        .then(() => {
          expect(controller.nodeData).toEqual(expectedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    });
  });

  describe('.getVolumeData', function() {
    it('should call DashbergService and get volumeData from API', function() {
        const apiResponse = {
          totalVolumes: 16500,
          minVolumesCluster: 2500
        }
        const expectedResponse = {
          totalVolumes: 16500,
          minVolumesCluster: 2500
        }
        spyOn(dashbergService, 'getVolumeData').and.returnValue($q.resolve(apiResponse));
        controller.getVolumeData()
        .then(() => {
          expect(controller.volumeData).toEqual(expectedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    });
  });

  describe('.getVolumeSizeData', function() {
    it('should call DashbergService and get volumeSizeData from API', function() {
        const apiResponse = {
          totalVolumeSize: 25000000000000,
          minVolumeSizeCluster: 130000000
        }
        const expectedResponse = {
          totalVolumeSize: 25000000000000,
          minVolumeSizeCluster: 130000000
        }
        spyOn(dashbergService, 'getVolumeSizeData').and.returnValue($q.resolve(apiResponse));
        controller.getVolumeSizeData()
        .then(() => {
          expect(controller.volumeSizeData).toEqual(expectedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    });
  });

  describe('.getVolumeAccessData', function() {
    it('should call DashbergService and get volumeAccessData from API', function() {
        const apiResponse = {
          totalVolumeAccess: 911,
          minVolumeAccessCluster: 3
        }
        const expectedResponse = {
          totalVolumeAccess: 911,
          minVolumeAccessCluster: 3
        }
        spyOn(dashbergService, 'getVolumeAccessData').and.returnValue($q.resolve(apiResponse));
        controller.getVolumeAccessData()
        .then(() => {
          expect(controller.volumeAccessData).toEqual(expectedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    });
  });

  describe('.getIOPData', function() {
    it('should call DashbergService and get IOPData from API', function() {
        const apiResponse = {
          totalIOPs: 15500,
          minIOPsCluster: 1000
        }
        const expectedResponse = {
          totalIOPs: 15500,
          minIOPsCluster: 1000
        }
        spyOn(dashbergService, 'getIOPData').and.returnValue($q.resolve(apiResponse));
        controller.getIOPData()
        .then(() => {
          expect(controller.IOPData).toEqual(expectedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    });
  });

  describe('.getBandwidthData', function() {
    it('should call DashbergService and get bandwidthData from API', function() {
        const apiResponse = {
          totalBandwidth: 212000000,
          minBandwidthCluster: 28000000
        }
        const expectedResponse = {
          totalBandwidth: 212000000,
          minBandwidthCluster: 28000000
        }
        spyOn(dashbergService, 'getBandwidthData').and.returnValue($q.resolve(apiResponse));
        controller.getBandwidthData()
        .then(() => {
          expect(controller.bandwidthData).toEqual(expectedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    });
  });

  describe('.getSessionData', function() {
    it('should call DashbergService and get sessionData from API', function() {
        const apiResponse = {
          totalSessions: 613,
          minSessionsCluster: 25
        }
        const expectedResponse = {
          totalSessions: 613,
          minSessionsCluster: 25
        }
        spyOn(dashbergService, 'getSessionData').and.returnValue($q.resolve(apiResponse));
        controller.getSessionData()
        .then(() => {
          expect(controller.sessionData).toEqual(expectedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    });
  });

  describe('.getSnapshotData', function() {
    it('should call DashbergService and get snapshotData from API', function() {
        const apiResponse = {
          totalSnapshots: 28,
          minSnapshotsCluster: 1
        }
        const expectedResponse = {
          totalSnapshots: 28,
          minSnapshotsCluster: 1
        }
        spyOn(dashbergService, 'getSnapshotData').and.returnValue($q.resolve(apiResponse));
        controller.getSnapshotData()
        .then(() => {
          expect(controller.snapshotData).toEqual(expectedResponse);
        })
        .catch( err => {
          fail('Promise was unexpectedly rejected');
        })
      $scope.$apply();
    });
  });
});
