'use strict';

describe('Graph Resolution Filter', function () {
  beforeEach(angular.mock.module('aiqUi'));

  it('should user the appropriate bucketing method for a given graph', inject(function ($filter) {
    expect($filter('graphResolution')(0, 'capacity')).toEqual(300);
    expect($filter('graphResolution')(0, 'efficiency')).toEqual(300);
    expect($filter('graphResolution')(0, 'activeISCSISessions')).toEqual(300);
    expect($filter('graphResolution')(0, 'performance')).toEqual(10);
  }));

  it('should return the bucket a given resolution falls into for a given method', inject(function ($filter) {
    expect($filter('graphResolution')(0, 'performance')).toEqual(10);
    expect($filter('graphResolution')(11000, 'performance')).toEqual(60);
    expect($filter('graphResolution')(61000, 'performance')).toEqual(120);
    expect($filter('graphResolution')(121000, 'performance')).toEqual(300);
    expect($filter('graphResolution')(301000, 'performance')).toEqual(600);
    expect($filter('graphResolution')(601000, 'performance')).toEqual(1200);
    expect($filter('graphResolution')(1201000, 'performance')).toEqual(3600);
    expect($filter('graphResolution')(3601000, 'performance')).toEqual(7200);
    expect($filter('graphResolution')(7201000, 'performance')).toEqual(14400);
    expect($filter('graphResolution')(14401000, 'performance')).toEqual(28800);
    expect($filter('graphResolution')(28801000, 'performance')).toEqual(43200);
    expect($filter('graphResolution')(43201000, 'performance')).toEqual(86400);
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
    expect($filter('graphResolution')(0, 'capacity')).toEqual(300);
    expect($filter('graphResolution')(301000, 'capacity')).toEqual(600);
    expect($filter('graphResolution')(601000, 'capacity')).toEqual(1200);
    expect($filter('graphResolution')(1201000, 'capacity')).toEqual(3600);
    expect($filter('graphResolution')(3601000, 'capacity')).toEqual(7200);
    expect($filter('graphResolution')(7201000, 'capacity')).toEqual(14400);
    expect($filter('graphResolution')(14401000, 'capacity')).toEqual(28800);
    expect($filter('graphResolution')(28801000, 'capacity')).toEqual(43200);
    expect($filter('graphResolution')(43201000, 'capacity')).toEqual(86400);
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
