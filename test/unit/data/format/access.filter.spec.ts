'use strict';

describe('Access Filter', function () {
  var filter;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('access');
  }));

  it('should display the default value if data does not equal readWrite', function() {
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
});
