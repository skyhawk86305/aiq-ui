'use strict';

describe('Volumes Details Link Filter', function() {
  let filter,
    routeParams;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($routeParams) {
    routeParams = $routeParams;
  }));

  describe('valid cluster ID and volume ID case', function() {
    it('should return valid URL', inject(function($filter) {
      routeParams.clusterID = 18382;
      filter = $filter('volumesDetailsLink')(33);
      expect(filter).toEqual('<a class="view-details-link" href="#/cluster/18382/volume/33" aria-label="Leave this page to view selected volume details"><i class="fa fa-arrow-right right-arrow" aria-hidden="true"</i></a>');
    }));
  });

  describe('no cluster ID is provided', function() {
    it('should return undefined when cluster ID is not provided', inject(function($filter) {
      filter = $filter('volumesDetailsLink')(33);
      expect(filter).toBeUndefined();
    }));
  });

  describe('no volume ID is provided', function() {
    it('should return undefined when volume ID is not provided', inject(function($filter) {
      routeParams.clusterID = 18382;
      filter = $filter('volumesDetailsLink')();
      expect(filter).toBeUndefined();
    }));
  });
});
