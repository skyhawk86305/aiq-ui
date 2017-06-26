'use strict';

describe('Cluster Select Filter', function () {
  let filter,
      clusters,
      input,
      expectedClusters;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($filter) {
    filter = $filter('clusterSelect');
    clusters = [
      {name:'foo', id:1, version:'7', customerName:'customerFoo'},
      {name:'bar', id:2, version:'8.2', customerName:'customerBarFor'},
      {name:'baz', id:3, version:'8.9.1', customerName:'customerBaz'}
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

});
