'use strict';

describe('AppController', function () {
  let rootScope,
      location,
      controller,
      route,
      http,
      messageBanner;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function ($rootScope, $location, $controller, $route, $httpBackend) {
    rootScope = $rootScope;
    location = $location;
    controller = $controller('AppController');
    route = $route;
    http = $httpBackend;
    messageBanner = {
      message: 'Test message',
      type: 'info',
      timestamp: '0'
    };
    http.when('GET', '/sessions').respond('success');
    http.when('GET', 'welcome-beta.tpl.html').respond(200);
    http.when('POST', '/json-rpc/2.0').respond(200);
    http.when('GET', '/banner-message').respond(messageBanner);
  }));

  // TODO: this should be added, but breaks a bunch of these tests
  // afterEach(function() {
  //   http.verifyNoOutstandingExpectation();
  //   http.verifyNoOutstandingRequest();
  // });

  describe('initialization', function() {
    it('should expose the navbar and apiLog services', function() {
      expect(controller.apiLogService).toBeDefined();
      expect(controller.showNavbar).toBeFalsy();
    });

    describe('.$onInit', function() {
      xit('should retrieve the banner data', function() {
        controller.$onInit().then(function() {
          expect(controller.messageText).toEqual(messageBanner.message);
          expect(controller.messageType).toEqual(messageBanner.type);
          expect(controller.messageDate).toEqual(messageBanner.timestamp);
          expect(controller.displayBanner).toBeTruthy();
        });
        rootScope.$digest();
      });
    });
  });

  xdescribe('.updateBanner()', function() {
    describe('when the message is missing from the banner data', function() {
      it('should not display the banner', function() {
        controller.$onInit().then(function() {
          messageBanner = {
            timestamp: messageBanner.timestamp,
            type: messageBanner.type
          };
          controller.updateBanner();
          expect(controller.displayBanner).toBeFalsy();
        });
        rootScope.$digest();
      });
    });

    describe('when the type is missing from the banner data', function() {
      it('should not display the banner', function() {
        controller.$onInit().then(function() {
          messageBanner = {
            timestamp: messageBanner.timestamp,
            message: messageBanner.message
          };
          controller.updateBanner();
          expect(controller.displayBanner).toBeFalsy();
        });
        rootScope.$digest();
      });
    });

    describe('when the timestamp is missing from the banner data', function() {
      it('should not display the banner', function() {
        controller.$onInit().then(function() {
          messageBanner = {
            message: messageBanner.message,
            type: messageBanner.type
          };
          controller.updateBanner().then(function() {
            expect(controller.displayBanner).toBeFalsy();
          });
        });
        rootScope.$digest();
      });
    });

    describe('when the banner is not displayed', function() {
      describe('and a new message is available', function() {
        it('should display the banner with the new message', function() {
          controller.$onInit().then(function() {
            messageBanner = {
              message: 'New Message',
              type: 'error',
              timestamp: '100'
            };
            controller.updateBanner().then(function() {
              expect(controller.displayBanner).toBeTruthy();
              expect(controller.messageText).toEqual(messageBanner.message);
              expect(controller.messageType).toEqual(messageBanner.type);
              expect(controller.messageDate).toEqual(messageBanner.timestamp);
            });
          });
          rootScope.$digest();
        });
      });

      describe('and no new message is available', function() {
        it('should not display the banner', function() {
          controller.$onInit().then(function() {
            messageBanner = {
              message: 'New Message',
              type: 'error',
              timestamp: messageBanner.timestamp
            };
            controller.updateBanner().then(function() {
              expect(controller.displayBanner).toBeFalsy();
            });
          });
          rootScope.$digest();
        });
      });
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
      let pathSpy = jasmine.createSpyObj('path', ['search']);
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
        location.path('/Alerts/Add');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/alerts/policies/add');
        location.path('/Alerts/Suppress');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/alerts/suppressedClusters');
        location.path('/Cluster/Graphs/Capacity').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/reporting/capacity');
        location.path('/Cluster/Graphs/Performance').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/reporting/performance');
        location.path('/Cluster/Graphs/Efficiency').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/reporting/efficiency');
        location.path('/Clusters/Graph/Sessions').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/reporting/iscsiSessions');
        location.path('/Clusters/VirtualNetworks').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/reporting/virtualNetworks');
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
        location.path('/Events/List').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/reporting/events');
        location.path('/Licensing/Capacity/List');
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/capacityLicensing');
        location.path('/Licensing/Capacity/View').search({customerID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/dashboard/capacityLicensing/123');
        location.path('/Nodes/Active').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/nodes');
        location.path('/Replication/Clusters').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/replication/clusterPairs');
        location.path('/Replication/Volumes').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/replication/volumePairs');
        location.path('/Volumes/Active/List').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/volumes/activeVolumes');
        location.path('/Volumes/Snapshots/Schedules/List').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/volumes/snapshotSchedules');
        location.path('/Volumes/Snapshots/List').search({clusterID: '123'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/volumes/snapshots');
        location.path('/Volumes/Stats').search({clusterID: '123', volumeID: '2'});
        rootScope.$digest();
        expect(location.path()).toEqual('/cluster/123/volume/2');
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
        location.path('/Licensing/Capacity/Adjust');
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
