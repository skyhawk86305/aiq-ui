'use strict';

describe('AIQ Date Filter', function () {
  var aiqFilter,
      angularFilter,
      dateFormat = 'yyyy-MM-dd HH:mm:ss';
  beforeEach(module('aiqUi'));
  beforeEach(inject(function($filter) {
    aiqFilter = $filter('aiqDate');
    angularFilter = $filter('date');
  }));

  it('should return - for falsy values', function() {
    expect(aiqFilter(null, dateFormat)).toEqual('-');
    expect(aiqFilter(undefined, dateFormat)).toEqual('-');
  });

  it('should return a formatted string for valid values', function() {
    var currentDate = new Date();
    expect(aiqFilter(currentDate.getTime(), dateFormat)).toEqual(angularFilter(currentDate.getTime(), dateFormat));
  });
});
