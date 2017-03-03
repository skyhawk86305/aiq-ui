'use strict';

describe('Component: iscsiSessions', function() {
  let scope,
    routeParams,
    controller,
    deferred,
    locals,
    filter,
    iscsiSessionsGraphService;


  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('SFD3LineGraph', function () {});
    $provide.value('SFD3BarGraph', function () {});
  }));

  beforeEach(inject(function($rootScope, $q, $filter, $componentController, $routeParams, IscsiSessionsGraphService) {
    scope = $rootScope;
    deferred = $q.defer();
    routeParams = $routeParams;
    routeParams.clusterID = '1';
    iscsiSessionsGraphService = IscsiSessionsGraphService;
    filter = $filter;
    locals = {
      $routeParams: routeParams,
      $filter: filter,
      IscsiSessionsGraphService: iscsiSessionsGraphService
    };
    spyOn(iscsiSessionsGraphService, 'update');
    controller = $componentController('iscsiSessions', locals);
  }));

  describe('initialization', function () {
    it('should expose date range options and sync graphs', function () {
      expect(controller.staticDateRangeOptions).toBeDefined();
      expect(controller.syncGraphs).toBeDefined();
    });
  });

  describe('.$onInit', function() {
    it('should update the iSCSI sessions graps service with the clusterID from the route', function() {
      controller.$onInit();
      expect(iscsiSessionsGraphService.update).toHaveBeenCalledWith(routeParams.clusterID);
    });
  });

});
