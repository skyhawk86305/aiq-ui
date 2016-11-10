'use strict';

describe('Component: capacityGraphs', function() {
  var scope,
    routeParams,
    dataService,
    controller,
    deferred,
    apiResponse,
    apiFailure,
    locals,
    service,
    provisionedService,
    usedService;


  beforeEach(module('aiqUi', function ($provide) {
    $provide.value('SFD3LineGraph', function () {});
    $provide.value('SFD3BarGraph', function () {});
  }));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $q, $componentController, $routeParams, DataService, ProvisionedSpaceGraphsService, UsedSpaceGraphsService) {
    scope = $rootScope;
    deferred = $q.defer();
    dataService = DataService;
    routeParams = $routeParams;
    routeParams.clusterID = '1';
    provisionedService = ProvisionedSpaceGraphsService;
    usedService = UsedSpaceGraphsService;
    service = DataService;
    locals = {
      $routeParams: routeParams,
      DataService: dataService,
      UsedSpaceGraphsService: usedService,
      ProvisionedSpaceGraphsService: provisionedService
    };
    spyOn(provisionedService, 'update');
    spyOn(usedService, 'update');
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
    controller = $componentController('capacityGraphs', locals);
  }));

  describe('initialization', function () {
    it('should expose date range options and sync graphs', function () {
      expect(controller.staticDateRangeOptions).toBeDefined();
      expect(controller.syncGraphs).toBeDefined();
    });
  });

  describe('.$onInit', function() {
    it('should update the provisioned and used graphs services with the clusterID from the route', function() {
      controller.$onInit();
      expect(provisionedService.update).toHaveBeenCalledWith(routeParams.clusterID);
      expect(usedService.update).toHaveBeenCalledWith(routeParams.clusterID);
    });

    describe('DataService', function () {
      it('should call the appropriate API method with the clusterID', function () {
        controller.$onInit();
        expect(dataService.callAPI).toHaveBeenCalledWith('GetClusterFullThreshold', {clusterID: 1});
      });

      it('should deserialize the response and resolve an array of data', function () {
        apiResponse = {
          clusterFullThreshold: 'foobar'
        };
        dataService.callAPI('GetClusterFullThreshold', {clusterID: routeParams.clusterID}).then(function(response) {
          expect(response).toEqual(apiResponse);
        });
        deferred.resolve(apiResponse);
      });

      it('should reject the error message if the call fails', function () {
        apiFailure = 'FooError';
        dataService.callAPI('GetClusterFullThreshold', {clusterID: routeParams.clusterID}).catch(function(err) {
          expect(err).toEqual(apiFailure);
        });
        deferred.reject(apiFailure);
      });
    });

  });

});
