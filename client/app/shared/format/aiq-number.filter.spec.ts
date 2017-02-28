'use strict';

describe('Number Filter', function () {
  let filter;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('aiqNumber');
  }));

  it('should display the default value if data is not of type number or string', function() {
    expect(filter()).toEqual('-');
    expect(filter(true)).toEqual('-');
    expect(filter({})).toEqual('-');
    expect(filter([])).toEqual('-');
  });

  it('should format data of type number as a number', function() {
    expect(filter(0)).toEqual('0');
    expect(filter(849)).toEqual('849');
  });

  it('should format data of type string as a number', function() {
    expect(filter('0')).toEqual('0');
    expect(filter('849')).toEqual('849');
  });

  it('should handle negative values', function() {
    expect(filter(-0)).toEqual('0');
    expect(filter(-4582)).toEqual('-4,582');
    expect(filter('-0')).toEqual('0');
    expect(filter('-4582')).toEqual('-4,582');
    expect(filter('-4582', 0, true)).toEqual(-4582);
  });

  it('should handle rounding to N number of decimal places', function() {
    expect(filter(0.444)).toEqual('0');
    expect(filter(0.555)).toEqual('1');
    expect(filter(0.444, 1)).toEqual('0.4');
    expect(filter(0.555, 1)).toEqual('0.6');
    expect(filter(0.444, 2)).toEqual('0.44');
    expect(filter(0.555, 2)).toEqual('0.56');
  });

  it('should handle strings that can not be casted to a number', function() {
    expect(filter('')).toEqual('-');
    expect(filter('foo')).toEqual('-');
  });
});
