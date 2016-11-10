'use strict';

describe('Cluster Stage Filter', function () {
  beforeEach(module('aiqUi'));

  describe('when given a valid stage', function () {
    it('should return the appropriate description', inject(function ($filter) {
      expect($filter('aiqClusterStage')('stage1Happy')).toEqual('Normal');
      expect($filter('aiqClusterStage')('stage2Happy')).toEqual('Normal');
      expect($filter('aiqClusterStage')('stage3')).toEqual('Warning');
      expect($filter('aiqClusterStage')('stage4')).toEqual('Error');
      expect($filter('aiqClusterStage')('stage55')).toEqual('Full');
      expect($filter('aiqClusterStage')('stage5')).toEqual('Full');
    }));
  });

  describe('when given an invalid stage', function () {
    it('should return \'not applicable\'', inject(function ($filter) {
      expect($filter('aiqClusterStage')('foo')).toEqual('n/a');
      expect($filter('aiqClusterStage')('bar')).toEqual('n/a');
      expect($filter('aiqClusterStage')('STAGE3')).toEqual('n/a');
      expect($filter('aiqClusterStage')('somethingstage1something')).toEqual('n/a');
    }));
  });
});
