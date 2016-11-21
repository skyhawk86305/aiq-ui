'use strict';

describe('Cluster Stage Filter', function () {
  var filter;
  beforeEach(module('aiqUi'));
  beforeEach(inject(function($filter) {
    filter = $filter('clusterStage');
  }));

  describe('when given a valid stage', function () {
    it('should return the appropriate description', function () {
      expect(filter('stage1Happy')).toEqual('Normal');
      expect(filter('stage2Happy')).toEqual('Normal');
      expect(filter('stage3')).toEqual('Warning');
      expect(filter('stage4')).toEqual('Error');
      expect(filter('stage55')).toEqual('Full');
      expect(filter('stage5')).toEqual('Full');
    });

    describe('and getClass is true', function () {
      it('should return the correct class', function () {
        expect(filter('stage1Happy', true)).toEqual('-no-alert');
        expect(filter('stage2Happy', true)).toEqual('-no-alert');
        expect(filter('stage3', true)).toEqual('-warning');
        expect(filter('stage4', true)).toEqual('-error');
        expect(filter('stage55', true)).toEqual('-critical');
        expect(filter('stage5', true)).toEqual('-critical');
      });
    });
  });

  describe('when given an invalid stage', function () {
    it('should return \'not applicable\'', function () {
    });

    describe('and getClass is true', function () {
      it('should return an empty string', function () {
        expect(filter('foo', true)).toEqual('');
        expect(filter('bar', true)).toEqual('');
        expect(filter('STAGE3', true)).toEqual('');
        expect(filter('somethingstage1something', true)).toEqual('');
      });
    });
  });
});
