'use strict';

describe('Access Filter', function () {
  let filter;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('access');
  }));

  it('should display the default value if data does not equal readWrite, readOnly, locked, or replicationTarget', function() {
    expect(filter()).toEqual('-');
    expect(filter(true)).toEqual('-');
    expect(filter({})).toEqual('-');
    expect(filter([])).toEqual('-');
    expect(filter('read')).toEqual('read');
    expect(filter('write')).toEqual('write');
    expect(filter(-4582)).toEqual('-4582');
    expect(filter(0)).toEqual('0');
    expect(filter(849)).toEqual('849');
    expect(filter('0')).toEqual('0');
    expect(filter('849')).toEqual('849');
    expect(filter('foobar')).toEqual('foobar');
    expect(filter('!@#$%^&*')).toEqual('!@#$%^&*');
    expect(filter('')).toEqual('');
  });

  it('should display Read / Write if data equals readWrite', function() {
    expect(filter('readWrite')).toEqual('Read / Write');
  });

  it('should display Read Only if data equals readOnly', function() {
    expect(filter('readOnly')).toEqual('Read Only');
  });

  it('should display Locked if data equals locked', function() {
    expect(filter('locked')).toEqual('Locked');
  });

  it('should display Replication Target if data equals replicationTarget', function() {
    expect(filter('replicationTarget')).toEqual('Replication Target');
  });
});
