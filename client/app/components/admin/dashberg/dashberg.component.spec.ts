'use strict';

describe('Component: dashberg', function() {
  let controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, DashbergNodeService, DashbergVolumeService, DashbergVolumeSizeService, DashbergVolumeAccessService,
    DashbergIOPService, DashbergBandwidthService, DashbergSessionService, DashbergSnapshotService) {
      controller = $componentController('dashberg');
  }))
})
