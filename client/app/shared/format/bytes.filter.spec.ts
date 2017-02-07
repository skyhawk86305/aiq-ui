'use strict';

describe('Bytes Filter', function () {
  let filter;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('bytes');
  }));

  it('should display the default value if data is not of type number or string', function() {
    expect(filter()).toEqual('-');
    expect(filter(true)).toEqual('-');
    expect(filter({})).toEqual('-');
    expect(filter([])).toEqual('-');
  });

  it('should format data of type number as bytes', function() {
    expect(filter(0)).toEqual('0B');
    expect(filter(849)).toEqual('849B');
  });

  it('should format data of type string as bytes', function() {
    expect(filter('0')).toEqual('0B');
    expect(filter('849')).toEqual('849B');
  });

  it('should handle negative values', function() {
    expect(filter(-3)).toEqual('-3B');
    expect(filter(-3000000000)).toEqual('-3GB');
    expect(filter('-3')).toEqual('-3B');
    expect(filter('-3000000000')).toEqual('-3GB');
  });

  it('should truncate fractional bytes', function() {
    expect(filter(0.567)).toEqual('0B');
    expect(filter(1.567, false, 1)).toEqual('1.0B');
    expect(filter('0.567')).toEqual('0B');
    expect(filter('1.567', false, 1)).toEqual('1.0B');
  });

  it('should handle strings that can not be casted to a number', function() {
    expect(filter('')).toEqual('-');
    expect(filter('foo')).toEqual('-');
  });

  it('should properly bucket the bytes into the appropriate size (decimal)', function() {
    expect(filter(3, false, 2)).toEqual('3.00B');
    expect(filter(3000, false, 2)).toEqual('3.00KB');
    expect(filter(3000000, false, 2)).toEqual('3.00MB');
    expect(filter(3000000000, false, 2)).toEqual('3.00GB');
    expect(filter(3000000000000, false, 2)).toEqual('3.00TB');
    expect(filter(3000000000000000, false, 2)).toEqual('3.00PB');
    expect(filter(3000000000000000000, false, 2)).toEqual('3.00EB');
  });

  it('should properly bucket the bytes into the appropriate size (binary)', function() {
    expect(filter(3, true, 2)).toEqual('3.00B');
    expect(filter(3000, true, 2)).toEqual('2.93KiB');
    expect(filter(3000000, true, 2)).toEqual('2.86MiB');
    expect(filter(3000000000, true, 2)).toEqual('2.79GiB');
    expect(filter(3000000000000, true, 2)).toEqual('2.73TiB');
    expect(filter(3000000000000000, true, 2)).toEqual('2.66PiB');
    expect(filter(3000000000000000000, true, 2)).toEqual('2.60EiB');
  });

  it('should append /s if formatting for throughput', function() {
    expect(filter(3000000, false, 2, true)).toEqual('3.00MB/s');
  });

  it('should wrap the units in a HTML span if being used for display on a page', function() {
    expect(filter(3000000, false, 2, true, true)).toEqual('3.00<span class="units">MB/s</span>');
  });
});
