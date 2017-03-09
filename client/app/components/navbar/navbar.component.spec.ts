'use strict';

describe('Component: navbar', function() {
  let scope,
      rootScope,
      logoutDeferred,
      service,
      authService,
      timeout,
      location,
      locals,
      bindings,
      controller,
      spy;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($rootScope, $componentController, $httpBackend, $timeout, $location, $q, $window, AuthService, ClusterSelectService) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    logoutDeferred = $q.defer();
    $httpBackend.when('POST', '/json-rpc/2.0').respond();
    service = ClusterSelectService;
    authService = AuthService;
    timeout = $timeout;
    location = $location;
    $window.ga = () => {};
    locals = {
      $scope: scope,
      UserInfoService: {
        getUserInfo() {
          return $q.resolve({});
        },
      },
      $window,
    };
    bindings = {
      AuthService: service
    };
    controller = $componentController('navbar', locals, bindings);
  }));

  describe('initialization', function() {
    it('should expose services for templates to bind directly to', function() {
      expect(controller.clusterSelect).toBeDefined();
    });

    it('should set defaults for public variables and sub navbar configuration', function() {
      expect(controller.subNavbarItems).toBeDefined();
      expect(controller.activeItems.main).toEqual('');
      expect(controller.activeItems.sub).toEqual('');
      expect(controller.activeItems.menu).toEqual('');
    });
  });

  describe('.getHref', function() {
    it('should lookup and return the href from the input subNavbarItem', function() {
      let subNavbarItem = controller.subNavbarItems.dashboard[4];
      expect(controller.getHref(subNavbarItem)).toEqual('#/dashboard/alerts/history');
    });

    it('should replace the :clusterID route variable with the cached selectedCluster clusterID from the ClusterSelectService', function() {
      let subNavbarItem = controller.subNavbarItems.cluster[0];
      service.selectedCluster = {clusterID: 999};
      expect(controller.getHref(subNavbarItem)).toEqual('#/cluster/999/reporting/overview');
    });
  });

  describe('.delayMouseLeave', function() {
    it('should reset the hoveredSubNavMenu state to false after 500ms if the user is not currently hovered over the menu', function() {
      controller.currentlyInMenu = false;
      controller.hoveredSubNavMenu = true;
      controller.delayMouseLeave();
      timeout.flush();
      expect(controller.hoveredSubNavMenu).toEqual(false);
    });

    it('should not clear the subNavbarItem if the user hovers back over the menu within 500ms', function() {
      controller.currentlyInMenu = true;
      controller.hoveredSubNavMenu = true;
      controller.delayMouseLeave();
      timeout.flush();
      expect(controller.hoveredSubNavMenu).toEqual(true);
    });
  });

  describe('.displaySubNavMenu', function() {
    it('should return true if the current sub navbar item has a sub menu and is currently hovered over', function() {
      controller.subNavbarItem = {menuItems: []};
      controller.hoveredSubNavMenu = true;
      expect(controller.displaySubNavMenu()).toEqual(true);
    });

    it('should return true if the current sub navbar item has a sub menu and was clicked', function() {
      controller.subNavbarItem = {menuItems: []};
      controller.clickedSubNavMenu = true;
      expect(controller.displaySubNavMenu()).toEqual(true);
    });

    it('should return false if the current sub navbar item doesnt have sub nav bar menu items', function() {
      controller.subNavbarItem = false;
      expect(controller.displaySubNavMenu()).toEqual(false);
    });

    it('should return false if the menu item is not hovered or clicked', function() {
      controller.subNavbarItem = {menuItems: []};
      controller.hoveredSubNavMenu = false;
      controller.clickedSubNavMenu = false;
      expect(controller.displaySubNavMenu()).toEqual(false);
    });
  });

  describe('route changes', function() {
    it('should update the active items based on the current route', function() {
      spy = spyOn(location, 'path').and.returnValue('');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.activeItems.main).toEqual('');
      expect(controller.activeItems.sub).toEqual('');
      expect(controller.activeItems.menu).toEqual('');

      spy.and.returnValue('/foo');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.activeItems.main).toEqual('foo');
      expect(controller.activeItems.sub).toEqual('');
      expect(controller.activeItems.menu).toEqual('');

      spy.and.returnValue('/foo/bar');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.activeItems.main).toEqual('foo');
      expect(controller.activeItems.sub).toEqual('bar');
      expect(controller.activeItems.menu).toEqual('');

      spy.and.returnValue('/foo/bar/baz');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.activeItems.main).toEqual('foo');
      expect(controller.activeItems.sub).toEqual('bar');
      expect(controller.activeItems.menu).toEqual('baz');
    });

    it('should handle routes with :clusterID variables', function() {
      spy = spyOn(location, 'path').and.returnValue('/cluster');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.activeItems.main).toEqual('cluster');
      expect(controller.activeItems.sub).toEqual('');
      expect(controller.activeItems.menu).toEqual('');

      spy.and.returnValue('/cluster/999');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.activeItems.main).toEqual('cluster');
      expect(controller.activeItems.sub).toEqual('');
      expect(controller.activeItems.menu).toEqual('');

      spy.and.returnValue('/cluster/999/foo');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.activeItems.main).toEqual('cluster');
      expect(controller.activeItems.sub).toEqual('foo');
      expect(controller.activeItems.menu).toEqual('');

      spy.and.returnValue('/cluster/999/foo/bar');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(controller.activeItems.main).toEqual('cluster');
      expect(controller.activeItems.sub).toEqual('foo');
      expect(controller.activeItems.menu).toEqual('bar');
    });

    it('should reset the cached selectedCluster in the service if navigating to a non cluster-specific route', function() {
      service.selectedCluster = {clusterID: 999};
      spyOn(location, 'path').and.returnValue('/foo');
      rootScope.$broadcast('$routeChangeSuccess');
      expect(service.selectedCluster).toBeNull();
    });
  });

  describe('logout', function() {
    it('should go to the login page upon user logout', function() {
      spyOn(authService, 'logout').and.returnValue(logoutDeferred.promise);
      spyOn(location, 'path');
      controller.logout();
      logoutDeferred.resolve();
      scope.$apply();
      expect(location.path).toHaveBeenCalledWith('/login');
    });
  });
});
