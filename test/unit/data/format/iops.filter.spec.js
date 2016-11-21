'use strict';

describe('IOPS Filter', function () {
  var filter;
  beforeEach(module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('iops');
  }));

  it('should display the default value if data is not of type number or string', function() {
    expect(filter()).toEqual('-');
    expect(filter(true)).toEqual('-');
    expect(filter({})).toEqual('-');
    expect(filter([])).toEqual('-');
  });

  it('should format data of type number as IOPS', function() {
    expect(filter(0)).toEqual('0');
    expect(filter(849)).toEqual('849');
  });

  it('should format data of type string as IOPS', function() {
    expect(filter('0')).toEqual('0');
    expect(filter('849')).toEqual('849');
  });

  it('should handle negative values', function() {
    expect(filter(-3)).toEqual('-3');
    expect(filter(-3000, true)).toEqual('-3k');
    expect(filter('-3')).toEqual('-3');
    expect(filter('-3000', true)).toEqual('-3k');
  });

  it('should handle strings that can not be casted to a number', function() {
    expect(filter('')).toEqual('-');
    expect(filter('foo')).toEqual('-');
  });

  it('should handle rounding to N number of decimal places', function() {
    expect(filter(0.444, false, 0)).toEqual('0');
    expect(filter(0.555, false, 0)).toEqual('1');
    expect(filter(0.444, false, 1)).toEqual('0.4');
    expect(filter(0.555, false, 1)).toEqual('0.6');
    expect(filter(0.444, false, 2)).toEqual('0.44');
    expect(filter(0.555, false, 2)).toEqual('0.56');
  });

  it('should allow formatting IOPS as k IOPS', function() {
    expect(filter(300, true)).toEqual('300');
    expect(filter(3000, true)).toEqual('3k');
    expect(filter(30000, true)).toEqual('30k');
  });

  it('should optionally append IOPS to the end', function() {
    expect(filter(3000, true, 0, true)).toEqual('3k IOPS');
    expect(filter(3000, false, 0, true)).toEqual('3000 IOPS');
  });

  it('should wrap the units in a HTML span if being used for display on a page', function() {
    expect(filter(3000, true, 0, true, true)).toEqual('3<span class="units">k IOPS</span>');
    expect(filter(3000, false, 0, true, true)).toEqual('3000<span class="units"> IOPS</span>');
  });
});
