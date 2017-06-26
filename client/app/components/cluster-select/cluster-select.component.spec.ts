'use strict';

describe('Component: clusterSelect', function() {
  let scope,
      deferred,
      routeParams,
      location,
      service,
      spy,
      locals,
      bindings,
      controller,
      mockData,
      mockDataFiltered;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($rootScope, $componentController, $q, $routeParams, $location, ClusterSelectService) {
    scope = $rootScope.$new();
    deferred = $q.defer();
    routeParams = $routeParams;
    location = $location;
    service = ClusterSelectService;
    service.selectedCluster = 'fooCluster';
    spy = spyOn(service, 'getClusters').and.returnValue(deferred.promise);
    locals = {
      $scope: scope
    };
    bindings = {
      AuthService: service
    };
    controller = $componentController('clusterSelect', locals, bindings);
    mockData = [
      {id: 13, name: 'name1', foo: 1, bar: 2, baz: 3, customerName: 'SolidFire' },
      {id: 14, name: 'name2', foo: 4, bar: 5, baz: 6, customerName: 'SolidFire' },
      {id: 15, name: 'name3', foo: 7, bar: 8, baz: 9, customerName: 'NetApp' },
      {id: 16, name: 'name4', foo: 10, bar: 11, baz: 12, customerName: 'NetApp' },
    ];
    mockDataFiltered = [
      [
        mockData[2],
        mockData[3]
      ],
      [
        mockData[0],
        mockData[1]
      ]
    ];
    mockDataFiltered[0]['$key'] = 'NetApp';
    mockDataFiltered[1]['$key'] = 'SolidFire';
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

      it('should call refresh function on $routeChangeSuccess', inject(function($rootScope, $location){
        spyOn(controller, 'refresh').and.returnValue(deferred.promise);
        $location.path('/cluster/26/reporting/overview');
        $rootScope.$apply();
        $rootScope.$broadcast('$routeChangeSuccess');
        expect(controller.refresh).toHaveBeenCalled();
      }));
    });
  });

  describe('.filterClusters', function() {
    describe('when filter input is provided', function() {
      it('should filter the list of clusters', function() {
        spyOn(service, 'updateSelectedCluster');
        controller.init();
        deferred.resolve(mockData);
        scope.$apply();
        controller.filterInput = 'NetApp';
        controller.filterClusters();
        expect(controller.clusters).toEqual(mockDataFiltered.splice(0, 1));
      });
    });

    describe('when filter input is not provided', function() {
      it('should return the full list of clusters', function() {
        spyOn(service, 'updateSelectedCluster');
        controller.init();
        deferred.resolve(mockData);
        scope.$apply();
        controller.rawClusters = mockData;
        controller.filterInput = '';
        controller.filterClusters();
        expect(controller.clusters).toEqual(mockDataFiltered);
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
      expect(controller.clusters).toEqual(mockDataFiltered);
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
      spyOn(service, 'updateSelectedCluster');
      controller.init();
      deferred.resolve(mockData);
      controller.select(mockData[0]);
      controller.filterClusters();
      expect(controller.recentlyViewed[0]).toEqual(mockData[0]);
      controller.select(mockData[1]);
      controller.filterClusters();
      expect(controller.recentlyViewed[0]).toEqual(mockData[1]);
      controller.select(mockData[2]);
      controller.filterClusters();
      expect(controller.recentlyViewed[0]).toEqual(mockData[2]);
    });

    it('de-duplicates the recentlyViewed array', function() {spyOn(service, 'updateSelectedCluster');
      controller.init();
      deferred.resolve(mockData);
      controller.select(mockData[0]);
      controller.filterClusters();
      expect(controller.recentlyViewed[0]).toEqual(mockData[0]);
      controller.select(mockData[1]);
      controller.filterClusters();
      expect(controller.recentlyViewed[0]).toEqual(mockData[1]);
      controller.select(mockData[2]);
      controller.filterClusters();
      expect(controller.recentlyViewed[0]).toEqual(mockData[2]);
      controller.select(mockData[1]);
      controller.filterClusters();
      expect(controller.recentlyViewed[0]).toEqual(mockData[1]);
      expect(controller.recentlyViewed[1]).toEqual(mockData[2]);
      expect(controller.recentlyViewed[2]).toEqual(mockData[0]);
    });

    it('should reroute the user by default to /cluster/<clusterID>/reporting/overview if not already on a cluster-specific route', function() {
      spyOn(location, 'path').and.returnValue('#/foo/bar');
      controller.select({id: 999});
      expect(location.path).toHaveBeenCalledWith('/cluster/999/reporting/overview');
    });

    it('should reroute the user to /cluster/<new-clusterID>/<current-route> if the user is already on a cluster-specific route', function() {
      spyOn(location, 'path').and.returnValue('/cluster/999/foo/bar');
      controller.select({id: 12345});
      expect(location.path).toHaveBeenCalledWith('/cluster/12345/foo/bar');
    });

    it('should reroute the user to the volumes page if currently on a volume specific details page', function() {
      spyOn(location, 'path').and.returnValue('#/volume/bar');
      controller.select({id: 999});
      expect(location.path).toHaveBeenCalledWith('/cluster/999/volumes/');
    });
  });
});
