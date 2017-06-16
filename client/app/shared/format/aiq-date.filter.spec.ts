'use strict';

describe('AIQ Date Filter', function () {
  let aiqFilter,
      angularFilter;

  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter) {
    aiqFilter = $filter('aiqDate');
    angularFilter = $filter('date');
  }));

  it('should return - for falsy values', function() {
    expect(aiqFilter(null)).toEqual('-');
    expect(aiqFilter(undefined)).toEqual('-');
  });

  it('should return a formatted string for valid values', function() {
    let currentDate = new Date();
    expect(aiqFilter(currentDate.getTime())).toEqual(angularFilter(currentDate.getTime(), 'yyyy-MM-dd HH:mm:ss'));
  });
});
