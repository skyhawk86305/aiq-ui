'use strict';

describe('AIQ Collection Link Filter', function () {
  let filter,
      location,
      routeParams;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter, $location, $routeParams) {
    filter = $filter('apiCollectionLink');
    location = $location;
    routeParams = $routeParams;
  }));

  describe('when provided a valid cluster ID and API name', function () {
    it('should display an HTML link', function() {
      routeParams.clusterID = 12345;
      expect(filter('GetClusterStats')).toEqual('<a href="' + location.protocol() + '://' + location.host() + ':' + location.port() + '/state/cluster/12345/GetClusterStats" target="_blank" id="GetClusterStatsLink">GetClusterStats</a>');
    });
  });

  describe('when no cluster ID is provided', function () {
    it('should return the API name as a string', function() {
      expect(filter('GetClusterStats')).toEqual('GetClusterStats');
    });
  });

  describe('when no API name is provided', function () {
    it('should return the default value', function () {
      routeParams.clusterID = 12345;
      expect(filter(null)).toEqual('-');
    });
  });
});
