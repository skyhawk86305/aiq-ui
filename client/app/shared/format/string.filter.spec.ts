'use strict';

describe('String Filter', function () {
  let filter;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($filter) {
    filter = $filter('string');
  }));

  it('should display the default value if data is not of type number or string', function() {
    expect(filter()).toEqual('-');
    expect(filter(true)).toEqual('-');
    expect(filter({})).toEqual('-');
    expect(filter([])).toEqual('-');
  });

  it('should format data of type number as a string', function() {
    expect(filter(-4582)).toEqual('-4582');
    expect(filter(0)).toEqual('0');
    expect(filter(849)).toEqual('849');
  });

  it('should format data of type string as a string', function() {
    expect(filter('0')).toEqual('0');
    expect(filter('849')).toEqual('849');
    expect(filter('foobar')).toEqual('foobar');
    expect(filter('!@#$%^&*')).toEqual('!@#$%^&*');
    expect(filter('')).toEqual('');
  });

  it('should optionally allow capitalization of the first character', function() {
    expect(filter('foobar', true)).toEqual('Foobar');
    expect(filter('', true)).toEqual('');
    expect(filter('856', true)).toEqual('856');
    expect(filter('!@#$%^&*', true)).toEqual('!@#$%^&*');
  });

  it('should format an array as a comma and space separated list', function() {
    expect(filter([1, 2, 3])).toEqual('1, 2, 3');
    expect(filter(['1', '2', '3'])).toEqual('1, 2, 3');
  });

});
