'use strict';

describe('Volumes Snapshots Link Filter', function() {
  let filter,
    routeParams,
    httpParamSerializer;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($routeParams, $httpParamSerializer) {
    routeParams = $routeParams;
    httpParamSerializer = $httpParamSerializer;
  }));

  describe('valid cluster ID and volume ID case', function() {
    it('should return valid URL', inject(function($filter) {
      routeParams.clusterID = 18382;
      filter = $filter('volumesSnapshotsLink')(3, 33);
      expect(filter).toEqual('<a id="33snapshot-details" href="#/cluster/18382/volumes/snapshots?snapshot-filters=%7B%22volumeID%22:%7B%22equals%22:%5B33%5D%7D%7D">3</a>');
    }));
  });

  describe('no cluster ID is provided', function() {
    it('should return undefined when cluster ID is not provided', inject(function($filter) {
      filter = $filter('volumesSnapshotsLink')(3, 33);
      expect(filter).toBeUndefined();
    }));
  });

  describe('no volume ID is provided', function() {
    it('should return undefined when volume ID is not provided', inject(function($filter) {
      routeParams.clusterID = 18382;
      filter = $filter('volumesSnapshotsLink')(3);
      expect(filter).toBeUndefined();
    }));
  });
});
