'use strict';

describe('Table Badge Alert Severity Filter', function () {
  var filter;
  beforeEach(angular.mock.module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('tableBadgeAlertSeverity');
  }));

  it('should wrap the data in a custom html element', function() {
    expect(filter('Info')).toEqual('<div class="table-badge -info">INFO</div>');
    expect(filter('Warning')).toEqual('<div class="table-badge -warning">WARNING</div>');
    expect(filter('Error')).toEqual('<div class="table-badge -error">ERROR</div>');
    expect(filter('Critical')).toEqual('<div class="table-badge -critical">CRITICAL</div>');
  });

  it('should handle edge case inputs', function() {
    expect(filter(true)).toEqual(true);
    expect(filter(false)).toEqual(false);
    expect(filter('foo')).toEqual('foo');
    expect(filter(1)).toEqual(1);
    expect(filter('')).toEqual('');
  });
});
