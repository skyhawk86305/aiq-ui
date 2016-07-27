'use strict';

describe('Component: clusterSelect', function() {
  var el,
      scope,
      deferred,
      routeParams,
      location,
      service,
      spy,
      element,
      controller,
      mockData;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $compile, $q, $routeParams, $location, ClusterSelectService) {
    el = '<cluster-select></cluster-select>';
    scope = $rootScope.$new();
    deferred = $q.defer();
    routeParams = $routeParams;
    location = $location;
    service = ClusterSelectService;
    service.selectedCluster = 'fooCluster';
    spy = spyOn(service, 'getClusters').and.returnValue(deferred.promise);
    element = $compile(angular.element(el))(scope);
    scope.$digest();
    controller = element.controller('clusterSelect');
    mockData = [
      {clusterID: 13, foo: 1, bar: 2, baz: 3},
      {clusterID: 14, foo: 4, bar: 5, baz: 6},
      {clusterID: 15, foo: 7, bar: 8, baz: 9},
      {clusterID: 16, foo: 10, bar: 11, baz: 12}
    ];
  }));

  describe('initialization', function() {
    it('should expose services for templates to bind directly to', function() {
      expect(controller.clusterSelect).toEqual(service);
    });

    it('should set defaults for the public variables', function() {
      expect(controller.clusters).toBeDefined();
      expect(controller.recentlyViewed).toBeDefined();
    });

    describe('.init', function() {
      it('should populate the list of clusters using the refresh method', function() {
        spyOn(controller, 'refresh').and.returnValue(deferred.promise);
        controller.init();
        expect(controller.refresh).toHaveBeenCalled();
      });

      it('should update the selected cluster with the cluster matching the clusterID from the route', function() {
        routeParams.clusterID = '14';
        spyOn(service, 'updateSelectedCluster');
        controller.init();
        deferred.resolve(mockData);
        scope.$apply();
        expect(service.updateSelectedCluster).toHaveBeenCalledWith(mockData[1]);
      });
    });
  });

  describe('.refresh', function() {
    it('updates the state to loading', function() {
      controller.refresh();
      deferred.resolve(mockData);
      expect(controller.state).toEqual('loading');
    });

    it('gets data from the service, binds the data to the controller, and sets the state to loaded', function() {
      controller.refresh();
      deferred.resolve(mockData);
      scope.$apply();
      expect(controller.clusters).toEqual(mockData);
      expect(controller.state).toEqual('loaded');
    });

    it('gets an error from the service and sets the errorMsg and the state to error', function() {
      controller.refresh();
      deferred.reject('errorMsg');
      scope.$apply();
      expect(controller.state).toEqual('error');
      expect(controller.errorMsg).toEqual('errorMsg');
    });
  });

  describe('.select', function() {
    it('updates the cached selected cluster stored in the service', function() {
      spyOn(service, 'updateSelectedCluster');
      controller.select('foobar');
      expect(service.updateSelectedCluster).toHaveBeenCalledWith('foobar');
    });

    it('pushes the selected cluster to the front of the recentlyViewed array', function() {
      controller.recentlyViewed = ['foo', 'bar'];
      controller.select('baz');
      expect(controller.recentlyViewed[0]).toEqual('baz');
    });

    it('de-duplicates the recentlyViewed array', function() {
      controller.recentlyViewed = ['foo', 'bar', 'baz'];
      controller.select('bar');
      expect(controller.recentlyViewed).toEqual(['bar', 'foo', 'baz']);
    });

    it('should reroute the user by default to /cluster/<clusterID>/reporting/overview if not already on a cluster-specific route', function() {
      spyOn(location, 'path').and.returnValue('#/foo/bar');
      controller.select({clusterID: 999});
      expect(location.path).toHaveBeenCalledWith('/cluster/999/reporting/overview');
    });

    it('should reroute the user to /cluster/<new-clusterID>/<current-route> if the user is already on a cluster-specific route', function() {
      spyOn(location, 'path').and.returnValue('/cluster/999/foo/bar');
      controller.select({clusterID: 12345});
      expect(location.path).toHaveBeenCalledWith('/cluster/12345/foo/bar');
    });
  });
});
