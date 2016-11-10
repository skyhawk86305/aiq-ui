'use strict';

describe('Graph Resolution Filter', function () {
  beforeEach(module('aiqUi'));

  it('should user the appropriate bucketing method for a given graph', inject(function ($filter) {
    expect($filter('graphResolution')(0, 'provisionedSpace')).toEqual(300);
    expect($filter('graphResolution')(0, 'usedSpace')).toEqual(300);
    expect($filter('graphResolution')(0, 'efficiency')).toEqual(300);
    expect($filter('graphResolution')(0, 'activeISCSISessions')).toEqual(300);
    expect($filter('graphResolution')(0, 'iops')).toEqual(10);
    expect($filter('graphResolution')(0, 'utilization')).toEqual(10);
    expect($filter('graphResolution')(0, 'bandwidth')).toEqual(10);
  }));

  it('should return the bucket a given resolution falls into for a given method', inject(function ($filter) {
    expect($filter('graphResolution')(0, 'iops')).toEqual(10);
    expect($filter('graphResolution')(11000, 'iops')).toEqual(60);
    expect($filter('graphResolution')(61000, 'iops')).toEqual(120);
    expect($filter('graphResolution')(121000, 'iops')).toEqual(300);
    expect($filter('graphResolution')(301000, 'iops')).toEqual(600);
    expect($filter('graphResolution')(601000, 'iops')).toEqual(1200);
    expect($filter('graphResolution')(1201000, 'iops')).toEqual(3600);
    expect($filter('graphResolution')(3601000, 'iops')).toEqual(7200);
    expect($filter('graphResolution')(7201000, 'iops')).toEqual(14400);
    expect($filter('graphResolution')(14401000, 'iops')).toEqual(28800);
    expect($filter('graphResolution')(28801000, 'iops')).toEqual(43200);
    expect($filter('graphResolution')(43201000, 'iops')).toEqual(86400);
  }));

  it('should return the bucket a given resolution falls into for a given method', inject(function ($filter) {
    expect($filter('graphResolution')(0, 'volumeIops')).toEqual(60);
    expect($filter('graphResolution')(61000, 'volumeIops')).toEqual(120);
    expect($filter('graphResolution')(121000, 'volumeIops')).toEqual(300);
    expect($filter('graphResolution')(301000, 'volumeIops')).toEqual(600);
    expect($filter('graphResolution')(601000, 'volumeIops')).toEqual(1200);
    expect($filter('graphResolution')(1201000, 'volumeIops')).toEqual(3600);
    expect($filter('graphResolution')(3601000, 'volumeIops')).toEqual(7200);
    expect($filter('graphResolution')(7201000, 'volumeIops')).toEqual(14400);
    expect($filter('graphResolution')(14401000, 'volumeIops')).toEqual(28800);
    expect($filter('graphResolution')(28801000, 'volumeIops')).toEqual(43200);
    expect($filter('graphResolution')(43201000, 'volumeIops')).toEqual(86400);
  }));

  it('should return the bucket a given resolution falls into for a given method', inject(function ($filter) {
    expect($filter('graphResolution')(0, 'usedSpace')).toEqual(300);
    expect($filter('graphResolution')(301000, 'usedSpace')).toEqual(600);
    expect($filter('graphResolution')(601000, 'usedSpace')).toEqual(1200);
    expect($filter('graphResolution')(1201000, 'usedSpace')).toEqual(3600);
    expect($filter('graphResolution')(3601000, 'usedSpace')).toEqual(7200);
    expect($filter('graphResolution')(7201000, 'usedSpace')).toEqual(14400);
    expect($filter('graphResolution')(14401000, 'usedSpace')).toEqual(28800);
    expect($filter('graphResolution')(28801000, 'usedSpace')).toEqual(43200);
    expect($filter('graphResolution')(43201000, 'usedSpace')).toEqual(86400);
  }));

  it('should return the bucket a given resolution falls into for a given method', inject(function ($filter) {
    expect($filter('graphResolution')(0, 'thresholds')).toEqual(3600);
    expect($filter('graphResolution')(3601000, 'thresholds')).toEqual(7200);
    expect($filter('graphResolution')(7201000, 'thresholds')).toEqual(14400);
    expect($filter('graphResolution')(14401000, 'thresholds')).toEqual(28800);
    expect($filter('graphResolution')(28801000, 'thresholds')).toEqual(43200);
    expect($filter('graphResolution')(43201000, 'thresholds')).toEqual(86400);
  }));

  it('should return the provided resolution as seconds by default', inject(function ($filter) {
    expect($filter('graphResolution')(2000, 'foobar')).toEqual(2);
  }));
});
