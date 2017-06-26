'use strict';

describe('Custom Comparators', function () {
  let rootScope,
    customComparators,
    sfTableService,
    getDataFunc,
    sfFilterComparators,
    columns = [
      {key: 'foo', label: 'foo', filterComparators: []},
      {key: 'bar', label: 'bar', filterComparators: []},
      {key: 'baz', label: 'baz', filterComparators: []}
    ],
    mockData = [
      {foo: 0,  bar: true, baz : 'a'},
      {foo: 1,  bar: false, baz : 'b'},
      {foo: 2,  bar: true, baz : 'c'},
      {foo: 3,  bar: false, baz : 'a'},
      {foo: 4,  bar: true, baz : 'b'},
      {foo: 5,  bar: false, baz : 'c'},
      {foo: 6,  bar: true, baz : 'a'},
      {foo: 7,  bar: false, baz : 'b'},
      {foo: 8,  bar: true, baz : 'c'},
      {foo: 9,  bar: false, baz : 'a'},
      {foo: 10, bar: true, baz : 'b'},
      {foo: 11, bar: false, baz : 'c'},
      {foo: 12, bar: true, baz : 'a'},
      {foo: 13, bar: false, baz : 'b'},
      {foo: 14, bar: true, baz : 'c'},
      {foo: 15, bar: false, baz : 'a'},
      {foo: 16, bar: true, baz : 'b'},
      {foo: 17, bar: false, baz : 'c'},
      {foo: 18, bar: true, baz : 'a'},
      {foo: 19, bar: false, baz : 'b'},
    ],
    serverSide = true;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($rootScope, SFTableService, CustomComparatorsService, SFFilterComparators) {
    rootScope = $rootScope;
    getDataFunc = function() {};
    sfTableService = new SFTableService(getDataFunc, columns, serverSide);
    customComparators = CustomComparatorsService;
    sfFilterComparators = SFFilterComparators;
    columns[0].filterComparators = sfFilterComparators.INTEGER_DEFAULT;
    columns[1].filterComparators = customComparators.resolvedComparators;
    columns[2].filterComparators = customComparators.alertSeverityComparators;
  }));

  describe('.addSpacing', function() {
    it('should return the correctly formatted data', function() {
      expect(customComparators.addSpacing('')).toEqual('');
      expect(customComparators.addSpacing('blah')).toEqual('blah');
      expect(customComparators.addSpacing('blahblah')).toEqual('blahblah');
      expect(customComparators.addSpacing('blahBlah')).toEqual('blah Blah');
      expect(customComparators.addSpacing('BlahBlah')).toEqual('Blah Blah');
      expect(customComparators.addSpacing('BlahBlahBlah')).toEqual('Blah Blah Blah');
    });
  });

  describe('SFTable constructor', function() {
    it('should set variables passed in as params', function() {
      expect(sfTableService.getDataFunc).toEqual(getDataFunc);
      expect(sfTableService.columns).toEqual(columns);
      expect(sfTableService.serverSide).toBeTruthy();
    });

    it('should maintain active set of filters, sorts and page', function() {
      expect(sfTableService.filters).toEqual({});
      expect(sfTableService.sorts).toEqual([]);
      expect(sfTableService.page).toEqual({start:0, limit:100});
    });
  });

  describe('Filtering', function() {
    beforeEach(function() {
      sfTableService.data = mockData;
    });

    it('should initialize filters', function() {
      expect(sfTableService.filters).toBeDefined();
    });

    describe('.filterData and SFFilterComparators', function() {
      beforeEach(function() {
        sfTableService.filterComparators = {
          'equals': sfFilterComparators.EQUAL_STRING,
          'doesNotEqual': sfFilterComparators.NOT_EQUAL_STRING,
          'lessThan': sfFilterComparators.LESS_THAN,
          'greaterThan': sfFilterComparators.GREATER_THAN,
          'resolvedIs': customComparators.resolvedComparators[0],
          'alertSeverityIs': customComparators.alertSeverityComparators[0],
          'alertSeverityIsNot': customComparators.alertSeverityComparators[1]
        };
      });

      it('should filter the data with the resolvedIs comparator', function() {
        sfTableService.filters = {
          bar: {
            resolvedIs: ['Yes']
          }
        };
        sfTableService.filterData();
        expect(sfTableService.data).toEqual([
          {foo: 0,  bar: true, baz : 'a'},
          {foo: 2,  bar: true, baz : 'c'},
          {foo: 4,  bar: true, baz : 'b'},
          {foo: 6,  bar: true, baz : 'a'},
          {foo: 8,  bar: true, baz : 'c'},
          {foo: 10, bar: true, baz : 'b'},
          {foo: 12, bar: true, baz : 'a'},
          {foo: 14, bar: true, baz : 'c'},
          {foo: 16, bar: true, baz : 'b'},
          {foo: 18, bar: true, baz : 'a'}
        ]);
      });

      it('should filter the data with the alertSeverityIs comparator', function() {
        sfTableService.filters = {
          baz: {
            alertSeverityIs: ['a']
          }
        };
        sfTableService.filterData();
        expect(sfTableService.data).toEqual([
          {foo: 0,  bar: true, baz : 'a'},
          {foo: 3,  bar: false, baz : 'a'},
          {foo: 6,  bar: true, baz : 'a'},
          {foo: 9,  bar: false, baz : 'a'},
          {foo: 12, bar: true, baz : 'a'},
          {foo: 15, bar: false, baz : 'a'},
          {foo: 18, bar: true, baz : 'a'},
        ]);
      });

      it('should filter the data with the alertSeverityIsNot comparator', function() {
        sfTableService.filters = {
          baz: {
            alertSeverityIsNot: ['b']
          }
        };
        sfTableService.filterData();
        expect(sfTableService.data).toEqual([
          {foo: 0,  bar: true, baz : 'a'},
          {foo: 2,  bar: true, baz : 'c'},
          {foo: 3,  bar: false, baz : 'a'},
          {foo: 5,  bar: false, baz : 'c'},
          {foo: 6,  bar: true, baz : 'a'},
          {foo: 8,  bar: true, baz : 'c'},
          {foo: 9,  bar: false, baz : 'a'},
          {foo: 11, bar: false, baz : 'c'},
          {foo: 12, bar: true, baz : 'a'},
          {foo: 14, bar: true, baz : 'c'},
          {foo: 15, bar: false, baz : 'a'},
          {foo: 17, bar: false, baz : 'c'},
          {foo: 18, bar: true, baz : 'a'},
        ]);
      });
    });
  });
});
