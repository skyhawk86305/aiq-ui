'use strict';

describe('Json Filter', function () {
  var filter;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('aiqJson');
  }));

  it('should display the default value if data is not empty', function() {
    expect(filter({})).toEqual('{}');
    expect(filter([])).toEqual('[]');
    expect(filter('test')).toEqual('"test"');
  });

  it('should display - when data is empty', function() {
    expect(filter("")).toEqual('-');
    expect(filter()).toEqual('-');
  });
});
