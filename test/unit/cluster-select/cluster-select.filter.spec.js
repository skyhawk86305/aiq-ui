'use strict';

describe('Cluster Select Filter', function () {
  var filter,
      clusters,
      input,
      expectedClusters;

  beforeEach(module('aiqUi'));

  beforeEach(inject(function($filter) {
    filter = $filter('clusterSelectFilter');
    clusters = [
      {clusterName:'foo', clusterID:1, clusterUID:'ab', uuid:'12', apiVersion:'7', customerName:'customerFoo'},
      {clusterName:'bar', clusterID:2, clusterUID:'bc', uuid:'34', apiVersion:'8.2', customerName:'customerBarFor'},
      {clusterName:'baz', clusterID:3, clusterUID:'bd', uuid:'33', apiVersion:'8.9.1', customerName:'customerBaz'}
    ];
  }));

  it('should apply no filters if invalid input', function() {
    input = false;
    expectedClusters = clusters;
    expect(filter(clusters, input)).toEqual(expectedClusters);
  });

  it('should filter text (single word) against clusterName and customerName', function() {
    input = 'foo';
    expectedClusters = [clusters[0]];
    expect(filter(clusters, input)).toEqual(expectedClusters);

    input = 'customerBa';
    expectedClusters = clusters.slice(1);
    expect(filter(clusters, input)).toEqual(expectedClusters);
  });

  it('should filter text (multi word) against clusterName and customerName', function() {
    input = 'customer Fo';
    expectedClusters = clusters.slice(0, 2);
    expect(filter(clusters, input)).toEqual(expectedClusters);
  });

  it('should filter by version', function() {
    input = 'version:8';
    expectedClusters = clusters.slice(1);
    expect(filter(clusters, input)).toEqual(expectedClusters);

    input = 'version:8.9';
    expectedClusters = clusters.slice(2);
    expect(filter(clusters, input)).toEqual(expectedClusters);
  });

  it('should filter by clusterID', function() {
    input = 'id:1';
    expectedClusters = [clusters[0]];
    expect(filter(clusters, input)).toEqual(expectedClusters);
  });

  it('should filter by clusterUID', function() {
    input = 'uid:b';
    expectedClusters = clusters.slice(1);
    expect(filter(clusters, input)).toEqual(expectedClusters);

    input = 'uid:bd';
    expectedClusters = clusters.slice(2);
    expect(filter(clusters, input)).toEqual(expectedClusters);
  });

  it('should filter by clusterUUID', function() {
    input = 'uuid:3';
    expectedClusters = clusters.slice(1);
    expect(filter(clusters, input)).toEqual(expectedClusters);

    input = 'uuid:33';
    expectedClusters = clusters.slice(2);
    expect(filter(clusters, input)).toEqual(expectedClusters);
  });
});
