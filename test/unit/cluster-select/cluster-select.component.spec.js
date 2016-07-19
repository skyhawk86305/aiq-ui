'use strict';

describe('Component: clusterSelect', function() {
  var el,
      scope,
      deferred,
      state,
      service,
      spy,
      element,
      controller,
      mockData;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $compile, $q, $state, ClusterSelectService) {
    el = '<cluster-select></cluster-select>';
    scope = $rootScope.$new();
    deferred = $q.defer();
    state = $state;
    service = ClusterSelectService;
    service.selectedCluster = 'fooCluster';
    spy = spyOn(service, 'getClusters').and.returnValue(deferred.promise);
    element = $compile(angular.element(el))(scope);
    scope.$digest();
    controller = element.controller('clusterSelect');
    mockData = [
      {foo: 1, bar: 2, baz: 3},
      {foo: 4, bar: 5, baz: 6},
      {foo: 7, bar: 8, baz: 9},
      {foo: 10, bar: 11, baz: 12}
    ];
  }));

  describe('initialization', function() {
    it('should set defaults for the public variables', function() {
      expect(controller.clusters).toBeDefined();
      expect(controller.recentlyViewed).toBeDefined();
      expect(controller.selectedClusterDisplay).toEqual(service.selectedCluster);
    });
  });

  describe('.refresh', function() {
    it('updates the state to loading', function() {
      controller.refresh();
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
    it('updates the selected cluster displayed in the component', function() {
      controller.select('foobar');
      expect(controller.selectedClusterDisplay).toEqual('foobar');
    });

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

    it('should reroute the user to /cluster', function() {
      spyOn(state, 'go');
      controller.select('bar');
      expect(state.go).toHaveBeenCalledWith('cluster');
    });
  });
});
