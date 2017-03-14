'use strict';

describe('SuppressedClustersService', function () {
  let $scope,
    $q,
    DataService,
    SFTableService,
    service;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callAPI: function() {} });
  }));

  beforeEach(inject(function (SuppressedClustersService, $rootScope, _$q_, _DataService_, _SFTableService_) {
    $scope = $rootScope.$new();
    $q = _$q_;
    DataService = _DataService_;
    SFTableService = _SFTableService_;
    service = SuppressedClustersService;
  }));

  describe('initialization', function() {
    it('should inherit from SFTableService', function() {
      expect(service).toEqual(jasmine.any(SFTableService));
    });
  });

  describe('.getData (inherited from SFTableService)', function() {
    it('should call the appropriate API method with the selectedClusterID', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve());
      service.selectedClusterID = 'foobar';
      service.getData(true);
      expect(DataService.callAPI).toHaveBeenCalledWith('ListActiveSuppressions');
    });

    it('should deserialize the response and resolve an array of data', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.resolve({
        suppressions: [ { id: 1 }, { id: 2 }, { id: 3 } ],
      }));
      service.getData(true)
        .then( response => {
          expect(response).toEqual([ { id: 1 }, { id: 2 }, { id: 3 } ]);
        })
        .catch( err => {
          fail('promise was unexpectedly rejected');
        });
      $scope.$digest();
    });

    it('should reject the error message if the call fails', function() {
      spyOn(DataService, 'callAPI').and.returnValue($q.reject('FooError'));
      service.getData(true)
        .then( () => {
          fail('promise should have been rejected');
        })
        .catch( err => {
          expect(err).toEqual('FooError');
        });
      $scope.$digest();
    });
  });
});
