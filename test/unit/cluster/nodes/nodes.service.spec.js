'use strict';

describe('NodesService', function () {
  var rootScope,
      deferred,
      apiResponse,
      apiFailure,
      service,
      dataService,
      clusterSelectService,
      spy;

  beforeEach(module('aiqUi', function ($provide, $urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
    $provide.value('DataService', {callAPI: function() {} });
  }));

  beforeEach(inject(function ($rootScope, $q, NodesService, DataService, ClusterSelectService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = NodesService;
    dataService = DataService;
    clusterSelectService = ClusterSelectService;
    clusterSelectService.selectedCluster = {clusterID: 5};
    spy = spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
  }));

  describe('initialization', function() {
    it('should inherit from SFService', function() {
      expect(service.setData).toBeDefined();
      expect(service.activeDataSet).toBeDefined();
      expect(service.filterData).toBeDefined();
      expect(service.sortData).toBeDefined();
    });

    it('should set custom attributes needed for use in the table directive', function() {
      expect(service.modelName).toBeDefined();
      expect(service.filterName).toBeDefined();
      expect(service.state).toBeDefined();
      expect(service.emptyText).toBeDefined();
    });

    it('should define the column properties to be used in the table directive', function() {
      expect(service.properties instanceof Array).toBe(true);
      expect(service.properties.length).toBeGreaterThan(0);
    });
  });

  describe('.loadModels', function() {
    beforeEach(function() {
      apiResponse = {nodes: [{nodeID: 1}]};
      apiFailure = {foo: 'bar'};
    });

    it('should call the API', function() {
      deferred.resolve(apiResponse);
      service.loadModels();
      expect(dataService.callAPI).toHaveBeenCalled();
    });

    it('should set the data returned from the API', function() {
      deferred.resolve(apiResponse);
      service.loadModels();
      rootScope.$apply();
      expect(service.rawDataSet).toEqual(apiResponse.nodes);
    });

    it('should set state to empty if no results', function() {
      deferred.resolve({nodes: []});
      service.loadModels();
      rootScope.$apply();
      expect(service.state).toEqual('empty');
    });

    it('should set the error when the api call fails', function() {
      deferred.reject(apiFailure);
      service.loadModels();
      rootScope.$apply();
      expect(service.errorObject).toEqual(apiFailure);
    });
  });
});
