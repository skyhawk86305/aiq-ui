'use strict';

describe('Percent Filter', function () {
  var filter;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('percent');
  }));

  it('should display the default value if data is not of type number or string', function() {
    expect(filter()).toEqual('-');
    expect(filter(true)).toEqual('-');
    expect(filter({})).toEqual('-');
    expect(filter([])).toEqual('-');
  });

  it('should format data of type number as a percent', function() {
    expect(filter(0)).toEqual('0%');
    expect(filter(0.24)).toEqual('24%');
    expect(filter(24)).toEqual('2400%');
  });

  it('should format data of type string as a percent', function() {
    expect(filter('0')).toEqual('0%');
    expect(filter('.24')).toEqual('24%');
    expect(filter('24')).toEqual('2400%');
  });

  it('should handle strings that can not be casted to a number', function() {
    expect(filter('')).toEqual('-');
    expect(filter('foo')).toEqual('-');
  });

  it('should allow a custom number of decimal places to be displayed (rounding)', function() {
    expect(filter(0.241)).toEqual('24%');
    expect(filter(0.245)).toEqual('25%');
    expect(filter(0.2401, 1)).toEqual('24.0%');
    expect(filter(0.2405, 1)).toEqual('24.1%');
    expect(filter(0.24001, 2)).toEqual('24.00%');
    expect(filter(0.24005, 2)).toEqual('24.01%');
  });

  it('should allow the percentage to be displayed as a factor', function() {
    expect(filter(0, 0, true)).toEqual('0x');
    expect(filter(0.24, 2, true)).toEqual('0.24x');
    expect(filter(24, 0, true)).toEqual('24x');
  });

  it('should not calcualte the percent if already computed', function() {
    expect(filter(24, 0, false, true)).toEqual('24%');
  });

  it('should wrap the units in an element if to be used in HTML', function() {
    expect(filter(0.24, 0, false, false, true)).toEqual('24<span class="units">%</span>');
  });
});
