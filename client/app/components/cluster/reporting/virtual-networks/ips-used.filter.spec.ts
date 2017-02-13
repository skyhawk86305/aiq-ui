'use strict';

describe('ipsUsed Filter', function () {
  let filter;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('ipsUsed');
  }));

  it('should calculate the number of used IPs given an array of address blocks', function() {
    let addressBlocks1 = [];
    let addressBlocks2 = [
      {available: '11000000',size: 8}
    ];
    let addressBlocks3 = [
      {available: '11000000',size: 8},
      {available: '1010',size: 4},
    ];
    expect(filter(addressBlocks1)).toEqual('0/0');
    expect(filter(addressBlocks2)).toEqual('6/8');
    expect(filter(addressBlocks3)).toEqual('8/12');
  });

  it('should handle other input types', function() {
    expect(filter({foo:'bar'})).toEqual('-');
    expect(filter(0)).toEqual('-');
    expect(filter('foobar')).toEqual('-');
    expect(filter()).toEqual('-');
  });
});
