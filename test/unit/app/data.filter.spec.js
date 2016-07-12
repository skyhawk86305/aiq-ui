'use strict';

describe('AIQ Data Filter', function () {
  beforeEach(module('aiqUi'));

  it('should format integers', inject(function ($filter) {
    expect($filter('aiqData')('1234', 'integer')).toEqual('1,234');
  }));

  it('should format ratios', inject(function ($filter) {
    expect($filter('aiqData')(null, 'ratio')).toEqual('-');
    expect($filter('aiqData')('5', 'ratio')).toEqual('-');
    expect($filter('aiqData')(5, 'ratio')).toEqual('5.00x');
  }));

  it('should format percentages (rounding to nearest whole nubmer)', inject(function ($filter) {
    expect($filter('aiqData')('80.48', 'wholePercent')).toEqual('80%');
  }));

  it('should format percentages (appending 2 decimals)', inject(function ($filter) {
    expect($filter('aiqData')(56.78978, 'twoDecimalPercentage')).toEqual('56.79%');
  }));

  it('should format storageGB', inject(function ($filter) {
    expect($filter('aiqData')('8000000000000', 'bytes')).toEqual('8.0 TB');
  }));

  it('should format json', inject(function ($filter) {
    expect($filter('aiqData')('{key:value}', 'json')).toEqual('"{key:value}"');
  }));

  it('should format access', inject(function ($filter) {
    expect($filter('aiqData')(null, 'access')).toEqual('-');
    expect($filter('aiqData')('readWrite', 'access')).toEqual('Read / Write');
  }));

  it('should format date', inject(function ($filter) {
    expect($filter('aiqData')(null, 'date')).toEqual('-');
    expect($filter('aiqData')('', 'date')).toEqual('-');
    expect($filter('aiqData')('2014-10-24T11:27:07.0707Z', 'date')).toEqual('2014-10-24 05:27:07');
  }));

  it('should format time', inject(function ($filter) {
    expect($filter('aiqData')('2014-10-24T11:27:07.0707Z', 'time')).toEqual('05:27:07 AM');
  }));

  it('should format attribute', inject(function ($filter) {
    expect($filter('aiqData')(null, 'attribute')).toEqual('-');
    expect($filter('aiqData')({}, 'attribute')).toEqual('-');
  }));

  it('should format strings', inject(function ($filter) {
    expect($filter('aiqData')(null, 'string')).toEqual('-');
    expect($filter('aiqData')('foo', 'string')).toEqual('foo');
  }));

  it('should format list', inject(function ($filter) {
    expect($filter('aiqData')(null, 'list')).toEqual('-');
    expect($filter('aiqData')(['foo','bar'], 'list')).toEqual('Foo, Bar');
  }));

  it('should format kiloCase', inject(function ($filter) {
    expect($filter('aiqData')(null, 'kiloCase')).toEqual('-');
    expect($filter('aiqData')(45, 'kiloCase')).toEqual('45');
    expect($filter('aiqData')(450000000, 'kiloCase')).toEqual('450m');
  }));

  it('should format non capitalized strings', inject(function ($filter) {
    expect($filter('aiqData')(null, 'capitalize')).toEqual('-');
    expect($filter('aiqData')('foo', 'capitalize')).toEqual('Foo');
  }));

  it('should format array lengths', inject(function ($filter) {
    expect($filter('aiqData')(null, 'arraySize')).toEqual('0');
    expect($filter('aiqData')([4, 5], 'arraySize')).toEqual(2);
  }));

  it('should format everything else to default', inject(function ($filter) {
    expect($filter('aiqData')('foobar', '')).toEqual('foobar');
  }));

});
