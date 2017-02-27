'use strict';

describe('Component: volumeDetails', function() {
  let routeParams,
    service,
    controller;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $routeParams, VolumeDetailsService) {
    routeParams = $routeParams;
    service = VolumeDetailsService;
    controller = $componentController('volumeDetails');
  }));

  describe('Initialization', function() {
    it('should initialize volume details data properly', function() {

    });
  });

  describe('Info bar data', function() {
    it('should attempt to set info bar data on refresh', function() {

    });

    it('should calculate used capacity', function() {

    });

    it('should set cluster name as expected', function() {

    });

    it('should set info bar data properly', function() {

    });

    it('should return graph config', function() {

    });
  });
});
