'use strict';

describe('Table Badge Boolean Filter', function () {
  let filter;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('tableBadgeBoolean');
  }));

  it('should wrap the data in a custom html element', function() {
    expect(filter(true)).toEqual('<div class="table-badge -normal">YES</div>');
    expect(filter('foo')).toEqual('<div class="table-badge -normal">YES</div>');
    expect(filter(1)).toEqual('<div class="table-badge -normal">YES</div>');
    expect(filter(false)).toEqual('<div class="table-badge -critical">NO</div>');
    expect(filter('')).toEqual('<div class="table-badge -critical">NO</div>');
    expect(filter(0)).toEqual('<div class="table-badge -critical">NO</div>');
  });
});
