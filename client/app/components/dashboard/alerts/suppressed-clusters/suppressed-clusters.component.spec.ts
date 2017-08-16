'use strict';

describe('Component: suppressedClusters', function() {
  let $rootScope,
    $q,
    DataService,
    SFTableService,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function ($componentController, _$rootScope_, _$q_, _SFTableService_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    DataService = { callAPI() {} };
    SFTableService = _SFTableService_;
    controller = $componentController('suppressedClusters', { DataService });
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toEqual(jasmine.any(SFTableService));
    });
  });

  describe('service.getData', function() {
    it('should call the appropriate API method with the selectedClusterID', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      controller.service.selectedClusterID = 'foobar';
      controller.service.getData(true);
      expect(DataService.callAPI).toHaveBeenCalledWith('ListActiveSuppressions');
    });

    it('should deserialize the response and resolve an array of data', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve({
        suppressions: [ { id: 1 }, { id: 2 }, { id: 3 } ],
      }));
      controller.service.getData(true)
        .then( response => {
          const resume = require('./resume-notifications/resume-notifications-button.tpl.html');
          expect(response).toEqual([
            { id: 1, resume },
            { id: 2, resume },
            { id: 3, resume },
          ]);
        })
        .catch( err => {
          fail('promise was unexpectedly rejected');
        });
      $rootScope.$apply();
    });

    it('should reject the error message if the call fails', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.reject('FooError'));
      controller.service.getData(true)
        .then( () => {
          fail('promise should have been rejected');
        })
        .catch( err => {
          expect(err).toEqual('FooError');
        });
      $rootScope.$apply();
    });
  });

});
