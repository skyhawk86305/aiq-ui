'use strict';

describe('Component: dashberg', function() {
  let controller,
    nodeService,
    volumeService,
    volumeSizeService,
    volumeAccessService,
    IOPService,
    bandwidthService,
    sessionService,
    snapshotService;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, DashbergNodeService, DashbergVolumeService, DashbergVolumeSizeService, DashbergVolumeAccessService, DashbergIOPService, DashbergBandwidthService, DashbergSessionService, DashbergSnapshotService) {
      controller = $componentController('dashberg');
      nodeService = DashbergNodeService;
      volumeService = DashbergVolumeService;
      volumeSizeService = DashbergVolumeSizeService;
      volumeAccessService = DashbergVolumeAccessService;
      IOPService = DashbergIOPService;
      bandwidthService = DashbergBandwidthService;
      sessionService = DashbergSessionService;
      snapshotService = DashbergSnapshotService;
  }));

  describe('initialization', function() {
    it('should expose the DashbergNodeService to be used', function() {
      expect(controller.DashbergNodeService).toEqual(nodeService);
    });
    it('should expose the DashbergVolumeService to be used', function() {
      expect(controller.DashbergVolumeService).toEqual(volumeService);
    });
    it('should expose the DashbergVolumeSizeService to be used', function() {
      expect(controller.DashbergVolumeSizeService).toEqual(volumeSizeService);
    });
    it('should expose the DashbergVolumeAccessService to be used', function() {
      expect(controller.DashbergVolumeAccessService).toEqual(volumeAccessService);
    });
    it('should expose the DashbergIOPService to be used', function() {
      expect(controller.DashbergIOPService).toEqual(IOPService);
    });
    it('should expose the DashbergBandwidthService to be used', function() {
      expect(controller.DashbergBandwidthService).toEqual(bandwidthService);
    });
    it('should expose the DashbergSessionService to be used', function() {
      expect(controller.DashbergSessionService).toEqual(sessionService);
    });
    it('should expose the DashbergSnapshotService to be used', function() {
      expect(controller.DashbergSnapshotService).toEqual(snapshotService);
    });
  });
});
