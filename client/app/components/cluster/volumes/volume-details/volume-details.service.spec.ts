'use strict';

describe('service: VolumeDetailsService', function() {
  let service,
    dataService,
    deferred,
    rootScope,
    apiResponse,
    deserializedResponse;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callGuzzleAPI: function() {} });
  }));

  beforeEach(inject(function($q, $rootScope, DataService, VolumeDetailsService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = VolumeDetailsService;
    dataService = DataService;
    spyOn(dataService, 'callGuzzleAPI').and.returnValue(deferred.promise);
  }));

  describe('setVolume', function() {
    it('should set default volume', function() {
      service.setVolume();
      expect(service.clusterID).toBeUndefined();
      expect(service.volumeID).toBeUndefined();
    });

    it('should set volume properly', function() {
      service.setVolume(1898714, 33);
      expect(service.clusterID).toEqual(1898714);
      expect(service.volumeID).toEqual(33);
    });
  });

  describe('getVolume', function() {
    it('should call ListActiveVolumes api with proper clusterID', function() {
      service.clusterID = 1898714;
      service.getVolume();
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith(1898714, 'ListActiveVolumes');
    });

    it('should return selected volume from list of active volumes', function() {
      service.volumeID = 33;
      service.clusterID = 1898714;
      apiResponse = {volumes: [{ volumeID: 31, status: 'active', sliceCount: 1, accountID: 1 },
        { volumeID: 33, status: 'active', sliceCount: 2, accountID: 3 }]};
      deserializedResponse = {
        volumeID: 33,
        status: 'active',
        sliceCount: 2,
        accountID: 3
      };
      service.getVolume().then(function(response) {
        expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });
  });

  describe('getVolumeStats', function() {
    it('should return undefined', function() {

    });

    it('should return selected volume stat', function() {

    });
  });

  describe('getSnapshots', function() {
    it('should return expected value when there is no associated snapshot', function() {

    });

    it('should return list of snapshots associated to the volume', function() {

    });
  });

  describe('getAverageVolumePerformance', function() {
    it('should return correct average volume performance', function() {

    });
  });
});
