'use strict';

describe('Component: snapshotVolumeTable', function() {
  let routeParams,
    service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $routeParams, SnapshotVolumeTableService) {
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    routeParams.volumeID = 33;
    service = SnapshotVolumeTableService;
    spyOn(service, 'update');
    controller = $componentController('snapshotVolumeTable');
  }));

  describe('snapshot volume table initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(service);
    });

    it('should update the table service with the clusterID and volumeID from the route', function() {
      expect(service.update).toHaveBeenCalledWith('foobar', 33);
    });
  });
});
