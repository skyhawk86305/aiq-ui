'use strict';

describe('AppController', function () {
  var rootScope,
      location,
      controller,
      route,
      http;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function ($rootScope, $location, $controller, $route, $httpBackend) {
    rootScope = $rootScope;
    location = $location;
    controller = $controller('AppController');
    route = $route;
    http = $httpBackend;
    http.when('GET', '/sessions').respond('success');
    http.when('GET', 'welcome-beta.tpl.html').respond(200);
    http.when('POST', '/json-rpc/2.0').respond(200);
  }));

  describe('initialization', function() {
    it('should expose the navbar and apiLog services', function() {
      expect(controller.apiLogService).toBeDefined();
      expect(controller.showNavbar).toBeFalsy();
    });
  });

  describe('route changes', function() {
    it('should update the currentPage variable used in the html title tag', function() {
      location.path('/foo/bar');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.currentPage).toEqual('foo-bar');

      location.path('/cluster/1234567/foo/bar');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.currentPage).toEqual('cluster-foo-bar');
    });
    it('should set showNavbar to true if the path location is not \'/login\'', function() {
      location.path('/foo/bar');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.showNavbar).toBeTruthy();
    });
    it('should set showNavbar to false if the path location is \'/login\'', function() {
      location.path('login');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.showNavbar).toBeFalsy();
    });
    it('should set showNavbar to false and redirect to the login page upon route change error', function() {
      var pathSpy = jasmine.createSpyObj('path', ['search']);
      location.url('/foo/bar?baz=fuz');
      spyOn(location, 'path').and.returnValue(pathSpy);
      rootScope.$broadcast('$routeChangeError');
      expect(controller.showNavbar).toBeFalsy();
      expect(location.path).toHaveBeenCalledWith('/login');
      expect(pathSpy.search).toHaveBeenCalledWith({url: '/foo/bar?baz=fuz'});
    });

    describe('implemented legacy UI pages', function() {
      it('should route to the corresponding UI page', function() {
        location.path('/Alerts/History');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/alerts/history');
        location.path('/Alerts/Manage');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/alerts/policies');
        location.path('/Cluster/Graphs/Capacity').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/reporting/capacity');
        location.path('/Cluster/Graphs/Performance').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/reporting/performance');
        location.path('/Cluster/Graphs/Efficiency').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/reporting/efficiency');
        location.path('/Drives/Active/List').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/drives');
        location.path('/Drives/Available/List').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/drives');
        location.path('/Drives/Failed/List').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/drives');
        location.path('/Errors/List').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/reporting/errorLog');
        location.path('/Nodes/Active').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/nodes');
        location.path('/Volumes/Active/List').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/volumes');
        location.path('/Settings/Password');
        rootScope.$digest();
        expect(location.path()).toEqual('/account');
      });
    });

    describe('unimplemented legacy UI pages', function() {
      it('should route to the welcome page', function() {
        location.path('/Admin/Nodes');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Admin/Nodes/Add');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Alerts/Add');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Alerts/Suppress');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Clusters/Archived');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Clusters/Capacity/Forecast');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Clusters/Details');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Clusters/Stats');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Clusters/Overview');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Clusters/Graph/Sessions');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Clusters/VirtualNetworks');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Customers/Add');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Customers/Edit');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Customers/List');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/DelegateGroups/Add');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/DelegateGroups/List');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/DelegateGroups/Manage');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Events/List');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Licensing/Capacity/Adjust');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Licensing/Capacity/List');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Licensing/Capacity/View');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Replication/Clusters');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Replication/Volumes');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Volumes/Snapshots/Schedules/List');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Volumes/Snapshots/List');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Volumes/Stats');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Users/Add');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Users/Edit');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
        location.path('/Users/List');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/overview');
      });
    });
  });

});
