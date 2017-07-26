'use strict';

describe('Component: efficiencyGraphs', function() {
  let scope,
    routeParams,
    controller,
    deferred,
    locals,
    filter,
    efficiencyService;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('SFD3LineGraph', function () {});
    $provide.value('SFD3BarGraph', function () {});
  }));

  beforeEach(inject(function($rootScope, $q, $filter, $componentController, $routeParams, EfficiencyGraphsService) {
    scope = $rootScope;
    deferred = $q.defer();
    routeParams = $routeParams;
    routeParams.clusterID = 1;
    efficiencyService = EfficiencyGraphsService;
    filter = $filter;
    locals = {
      $routeParams: routeParams,
      $filter: filter,
      EfficiencyGraphsService: efficiencyService
    };
    spyOn(efficiencyService, 'update');
    controller = $componentController('efficiencyGraphs', locals);
  }));

  describe('initialization', function () {
    it('should expose date range options and sync graphs', function () {
      controller.$onInit();
      expect(controller.staticDateRangeOptions).toBeDefined();
      expect(controller.syncGraphs).toBeDefined();
    });
  });

  describe('.$onInit', function() {
    it('should update the efficiency graphs service with the clusterID from the route', function() {
      controller.$onInit();
      expect(efficiencyService.update).toHaveBeenCalledWith(routeParams.clusterID);
    });
  });

});
