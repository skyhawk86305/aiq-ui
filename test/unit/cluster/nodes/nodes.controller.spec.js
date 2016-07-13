'use strict';

describe('NodesTableController', function() {
  var ctrl,
      rootScope,
      service,
      deferred;

  beforeEach(module('aiqUi', function ($provide, $urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
    $provide.value('NodesService', {
      loadModels: function() {},
      filterData: jasmine.createSpy()
    });
  }));

  beforeEach(inject(function ($rootScope, $q, $controller, NodesService) {
    rootScope = $rootScope;
    service = NodesService;
    service.tableIsVisible = true;
    deferred = $q.defer();
    deferred.resolve();
    spyOn(service, 'loadModels').and.returnValue(deferred.promise);
    ctrl = $controller('NodesTableController', {NodesService:service});
  }));

  describe('initialization', function() {
    it('should expose the service to be used in the table directive', function () {
      expect(ctrl.service).toEqual(service);
    });
  });

  describe('.refreshTable', function() {
    it('should call loadModels on the service to populate the data for the table', function () {
      ctrl.refreshTable();
      expect(service.loadModels).toHaveBeenCalled();
    });

    it('should filter the data after it has been loaded if the table is still visible (the user may have already navigated to another page)', function () {
      ctrl.refreshTable();
      rootScope.$apply();
      expect(service.filterData).toHaveBeenCalled();
    });

    it('should not filter if the table is no longer visible to prevent potential errors in URL parsing', function () {
      service.tableIsVisible = false;
      ctrl.refreshTable();
      rootScope.$apply();
      expect(service.filterData).not.toHaveBeenCalled();
    });
  });
});
