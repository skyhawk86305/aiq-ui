'use strict';

describe('Component: navbar', function() {
  var el,
      rootScope,
      scope,
      service,
      timeout,
      location,
      element,
      controller,
      spy;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $compile, $httpBackend, $timeout, $location, ClusterSelectService) {
    el = '<navbar></navbar>';
    rootScope = $rootScope;
    scope = $rootScope.$new();
    $httpBackend.when('POST', '/v2/api').respond();
    service = ClusterSelectService;
    timeout = $timeout;
    location = $location;
    element = $compile(angular.element(el))(scope);
    scope.$digest();
    controller = element.controller('navbar');
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
      var subNavbarItem = controller.subNavbarItems.dashboard[0];
      expect(controller.getHref(subNavbarItem)).toEqual('#/dashboard/overview/sub1');
    });

    it('should replace the :clusterID route variable with the cached selectedCluster clusterID from the ClusterSelectService', function() {
      var subNavbarItem = controller.subNavbarItems.cluster[0];
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
});
