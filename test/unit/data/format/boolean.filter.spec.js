'use strict';

describe('Boolean Filter', function () {
  var filter;
  beforeEach(module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('boolean');
  }));

  it('should format data into a custom truthy value', function() {
    expect(filter(true, 'fooTrue')).toEqual('fooTrue');
    expect(filter('bar', 'barTrue')).toEqual('barTrue');
    expect(filter(8, 'bazTrue')).toEqual('bazTrue');
  });

  it('should format data into a custom falsy value', function() {
    expect(filter(false, 'fooTrue', 'fooFalse')).toEqual('fooFalse');
    expect(filter('', 'barTrue', 'barFalse')).toEqual('barFalse');
    expect(filter(0, 'bazTrue', 'bazFalse')).toEqual('bazFalse');
  });
});
