'use strict';

describe('Component: capacityGraphs', function() {
  var scope,
    routeParams,
    dataService,
    controller,
    deferred,
    apiResponse = {
      clusterFullThreshold: {
        sumTotalClusterBytes: 1000000000000,
        sumUsedClusterBytes: 2000000000000,
        sumTotalMetadataClusterBytes: 3000000000000,
        sumUsedMetadataClusterBytes: 4000000000000,
        stage3BlockThresholdBytes: 5000000000000,
        stage4BlockThresholdBytes: 6000000000000,
        blockFullness: 'stage1Happy',
        metadataFullness: 'stage3'
      }
    },
    locals,
    bindings,
    service,
    provisionedService,
    usedService;

  beforeEach(module('aiqUi'));
  beforeEach(module('componentTemplates'));

  beforeEach(inject(function($rootScope, $q, $componentController, $routeParams, DataService, ProvisionedSpaceGraphsService, UsedSpaceGraphsService) {
    scope = $rootScope;
    deferred = $q.defer();
    dataService = DataService;
    routeParams = $routeParams;
    routeParams.clusterID = 'foobar';
    provisionedService = ProvisionedSpaceGraphsService;
    usedService = UsedSpaceGraphsService;
    service = DataService;
    locals = {
      $scope: scope
    };
    bindings = {
      AuthService: service
    };
    spyOn(provisionedService, 'update');
    spyOn(usedService, 'update');
    spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
    controller = $componentController('capacityGraphs', locals, bindings);
    deferred.resolve(apiResponse);
  }));

  describe('initialization', function() {
    it('should update the provisioned and used graphs services with the clusterID from the route', function() {
      expect(provisionedService.update).toHaveBeenCalledWith('foobar');
      expect(usedService.update).toHaveBeenCalledWith('foobar');
    });

    it('should update the static information from the API', function() {
      expect(controller.blockTotalCapacity).toEqual(parseFloat((apiResponse.clusterFullThreshold.sumTotalClusterBytes / 1000000000000).toFixed(2)));
    });
  });

});
