'use strict';

describe('service: VolumeDetailsService', function() {
  let service,
    dataService,
    deferred,
    rootScope,
    apiResponse,
    deserializedResponse;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {
      callGraphAPI: function() {},
      callGuzzleAPI: function() {}
    });
  }));

  beforeEach(inject(function($q, $rootScope, DataService, VolumeDetailsService) {
    rootScope = $rootScope;
    deferred = $q.defer();
    service = VolumeDetailsService;
    dataService = DataService;
    spyOn(dataService, 'callGuzzleAPI').and.returnValue(deferred.promise);
    spyOn(dataService, 'callGraphAPI').and.returnValue(deferred.promise);
  }));

  describe('setVolume', function() {
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

    it('should return undefined', function() {
      service.volumeID = 33;
      service.clusterID = 1898714;
      apiResponse = {volumes: [{ volumeID: 31, status: 'active', sliceCount: 1, accountID: 1 },
        { volumeID: 32, status: 'active', sliceCount: 2, accountID: 3 }]};
      service.getVolume().then(function(response) {
        expect(response).toBeUndefined();
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
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
    it('should call ListVolumeStatsByVolume api with proper clusterID', function() {
      service.clusterID = 1898714;
      service.getVolumeStats();
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith(1898714, 'ListVolumeStatsByVolume');
    });

    it('should return undefined', function() {
      service.volumeID = 29;
      service.clusterID = 1898714;
      apiResponse = {volumeStats: [{ volumeID: 31, writeLatencyUSec: 0, burstIOPSCredit: 0, actualIOPS: 0, readOps: 296031170 },
        { volumeID: 33, writeLatencyUSec: 880, burstIOPSCredit: 0, actualIOPS: 44, readOps: 241449959 }]};
      service.getVolumeStats().then(function(response) {
        expect(response).toBeUndefined();
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should return selected volume stat', function() {
      service.volumeID = 31;
      service.clusterID = 1898714;
      apiResponse = {volumeStats: [{ volumeID: 31, writeLatencyUSec: 0, burstIOPSCredit: 0, actualIOPS: 0, readOps: 296031170 },
        { volumeID: 33, writeLatencyUSec: 880, burstIOPSCredit: 0, actualIOPS: 44, readOps: 241449959 }]};
      deserializedResponse = {
        volumeID: 31,
        writeLatencyUSec: 0,
        burstIOPSCredit: 0,
        actualIOPS: 0,
        readOps: 296031170
      };
      service.getVolumeStats().then(function(response) {
        expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });
  });

  describe('getSnapshots', function() {
    it('should call ListSnapshots api with proper clusterID', function() {
      service.clusterID = 1898714;
      service.getSnapshots();
      expect(dataService.callGuzzleAPI).toHaveBeenCalledWith(1898714, 'ListSnapshots');
    });

    it('should return expected value when there is no associated snapshot', function() {
      service.volumeID = 30;
      service.clusterID = 1898714;
      apiResponse = {snapshots: [{ volumeID: 31, status: 'done', totalSize: 500000882688, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da384d4', snapshotID: 297 },
        { volumeID: 31, status: 'done', totalSize: 800203302254, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da353ef', snapshotID: 100 }]};
      deserializedResponse = [];
      service.getSnapshots().then(function(response) {
        expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });

    it('should return list of snapshots associated to the volume', function() {
      service.volumeID = 31;
      service.clusterID = 1898714;
      apiResponse = {snapshots: [{ volumeID: 31, status: 'done', totalSize: 500000882688, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da384d4', snapshotID: 297 },
        { volumeID: 31, status: 'done', totalSize: 800203302254, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da353ef', snapshotID: 100 },
        { volumeID: 33, status: 'done', totalSize: 203848423042, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-e3ertdwseq00', snapshotID: 101 }]};
      deserializedResponse = [{
        volumeID: 31, status: 'done', totalSize: 500000882688, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da384d4', snapshotID: 297 }, {
        volumeID: 31, status: 'done', totalSize: 800203302254, snapshotUUID: '61573ec7-3ffe-43f6-8a0a-f7d87da353ef', snapshotID: 100 }];
      service.getSnapshots().then(function(response) {
        expect(response).toEqual(deserializedResponse);
        expect(response.length).toEqual(2);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });
  });

  describe('getAverageVolumePerformance', function() {
    it('should call performance api', function() {
      service.clusterID = 1898714;
      service.volumeID = 33;
      let params = {
        clusterID: service.clusterID,
        volumeID: service.volumeID,
        start: jasmine.any(Object),
        end: jasmine.any(Object),
        resolution: 60
      };
      service.getAverageVolumePerformance();
      expect(dataService.callGraphAPI).toHaveBeenCalledWith('performance', params);
    });

    it('should return correct average volume performance', function() {
      service.clusterID = 1898714;
      service.volumeID = 33;
      apiResponse = {
        data: {
          timestamps: { length: 4 },
          totalOpsPerSec: [ 957, 972, 952, 990 ],
          totalBytesPerSec: [ 8306576, 8460343, 8196466, 8654703 ],
          latencyUSec: [ 813, 418, 361, 385 ],
        }
      };
      deserializedResponse = {
        iops: 967.75,
        throughput: 8404522,
        latency: 494.25
      };
      service.getAverageVolumePerformance().then(function(response) {
        expect(response).toEqual(deserializedResponse);
      });
      deferred.resolve(apiResponse);
      rootScope.$apply();
    });
  });
});
