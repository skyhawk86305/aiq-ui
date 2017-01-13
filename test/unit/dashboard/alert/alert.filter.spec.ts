'use strict';

describe('AIQ Alert Filter', function () {
  beforeEach(module('aiqUi'));

  it('should format an empty condition', inject(function ($filter) {
    expect($filter('alert')([], 'condition')).toEqual('');
  }));

  it('should format everything else to default', inject(function ($filter) {
    expect($filter('alert')('foobar', '')).toEqual('foobar');
  }));

  it('should format a bounded field operator correctly', inject(function($filter) {
    expect($filter('alert')([{ streamFieldDisplayName: 'Name', notificationFieldOperator: '=', notificationFieldValue: 'Bob' }], 'condition')).toEqual('Name = Bob');
  }));

  it('should format an unbounded field operator correctly', inject(function($filter) {
    expect($filter('alert')([{ streamFieldDisplayName: 'Name', notificationFieldOperator: '*', notificationFieldValue: null }], 'condition')).toEqual('Name is any value');
  }));

  it('should format multiple conditions correctly', inject(function($filter) {
    expect($filter('alert')([{ streamFieldDisplayName: 'Name', notificationFieldOperator: '*', notificationFieldValue: null }, { streamFieldDisplayName: 'Age', notificationFieldOperator: '*', notificationFieldValue: null }], 'condition')).toEqual('Name is any value<br>Age is any value');
  }));

  it('should not attempt to format a non-Array value', inject(function($filter) {
    expect($filter('alert')({notAnArray: true}, 'condition')).toEqual({notAnArray: true});
  }));

  it('should handle a missing params arg', inject(function($filter) {
    expect($filter('alert')('someVal')).toEqual('someVal');
  }));

  it('should handle a non-object params arg', inject(function($filter) {
    expect($filter('alert')([], 'condition')).toEqual('');
  }));
});
