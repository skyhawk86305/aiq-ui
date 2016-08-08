'use strict';

describe('AIQ Data Filter', function () {
  beforeEach(module('aiqUi'));

  it('should format integers', inject(function ($filter) {
    expect($filter('aiqData')('1234', {type: 'integer'})).toEqual('1,234');
  }));

  it('should format ratios', inject(function ($filter) {
    expect($filter('aiqData')(null, {type: 'ratio'})).toEqual('-');
    expect($filter('aiqData')('5', {type: 'ratio'})).toEqual('-');
    expect($filter('aiqData')(5, {type: 'ratio'})).toEqual('5.00x');
  }));

  it('should format percentages (rounding to nearest whole number)', inject(function ($filter) {
    expect($filter('aiqData')('80.48', {type: 'wholePercent'})).toEqual('80%');
  }));

  it('should format percentages (appending 2 decimals)', inject(function ($filter) {
    expect($filter('aiqData')(56.78978, {type: 'twoDecimalPercentage'})).toEqual('56.79%');
  }));

  it('should format date', inject(function ($filter) {
    expect($filter('aiqData')(null, {type: 'date'})).toEqual('-');
    expect($filter('aiqData')('', {type: 'date'})).toEqual('-');
    expect($filter('aiqData')('2014-10-24T11:27:07.0707Z', {type: 'date'})).toEqual('2014-10-24 05:27:07');
  }));

  it('should format time', inject(function ($filter) {
    expect($filter('aiqData')('2014-10-24T11:27:07.0707Z', {type: 'time'})).toEqual('05:27:07 AM');
  }));

  it('should format strings', inject(function ($filter) {
    expect($filter('aiqData')(null, {type: 'string'})).toEqual('-');
    expect($filter('aiqData')('foo', {type: 'string'})).toEqual('foo');
  }));

  it('should format non capitalized strings', inject(function ($filter) {
    expect($filter('aiqData')(null, {type: 'capitalize'})).toEqual('-');
    expect($filter('aiqData')('foo', {type: 'capitalize'})).toEqual('Foo');
  }));

  it('should format array lengths', inject(function ($filter) {
    expect($filter('aiqData')(null, {type: 'arraySize'})).toEqual('0');
    expect($filter('aiqData')([4, 5], {type: 'arraySize'})).toEqual(2);
  }));

  it('should format boolean values', inject(function($filter) {
    expect($filter('aiqData')(true, {type: 'boolean'})).toEqual('Yes');
    expect($filter('aiqData')(false, {type: 'boolean'})).toEqual('No');
  }));

  it('should format everything else to default', inject(function ($filter) {
    expect($filter('aiqData')('foobar', {type: ''})).toEqual('foobar');
  }));

});
