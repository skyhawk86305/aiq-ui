'use strict';

describe('SettingsController', function () {
  var scope,
      timeout,
      sfClient,
      helpers,
      getConfigDeferred,
      setConfigDeferred,
      getConfigSpy,
      setConfigSpy,
      controller;

  beforeEach(module('elementUiPerNode', function ($provide, $urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
    $provide.value('SFClient', {
      api: {
        getConfig: function() {},
        setConfig: function() {},
      }
    });
    $provide.value('sfHelpers', {
      handleError: jasmine.createSpy()
    });
  }));

  beforeEach(inject(function ($rootScope, $timeout, $q, SFClient, sfHelpers, $controller) {
    scope = $rootScope.$new();
    timeout = $timeout;
    sfClient = SFClient;
    helpers = sfHelpers;
    getConfigDeferred = $q.defer();
    setConfigDeferred = $q.defer();
    getConfigSpy = spyOn(sfClient.api, 'getConfig').and.returnValue(getConfigDeferred.promise);
    setConfigSpy = spyOn(sfClient.api, 'setConfig').and.returnValue(setConfigDeferred.promise);
    controller = $controller('SettingsController', {SFClient:sfClient, sfHelpers:helpers});
  }));

  describe('initialization', function() {
    it('should set the default loading states', function() {
      getConfigDeferred.resolve();
      getConfigSpy.and.returnValue(getConfigDeferred.promise);
      expect(controller.pageState).toEqual('loading');
      expect(controller.currentState).toEqual('default');
    });

    it('should call the GetConfig API method', function() {
      getConfigDeferred.resolve({});
      getConfigSpy.and.returnValue(getConfigDeferred.promise);
      scope.$apply();
      expect(sfClient.api.getConfig).toHaveBeenCalled();
    });

    it('should set the config object for use in the page form inputs', function() {
      getConfigDeferred.resolve({result:{config:'expectedConfig'}});
      getConfigSpy.and.returnValue(getConfigDeferred.promise);
      scope.$apply();
      expect(controller.config).toEqual('expectedConfig');
    });

    it('should set the ethernetInfo object for use in the page static details', function() {
      getConfigDeferred.resolve({result:{config:{network:{eth0:{'bond-master':'Bond1G'},eth1:{'bond-master':'Bond10G'}}}}});
      getConfigSpy.and.returnValue(getConfigDeferred.promise);
      scope.$apply();
      expect(controller.ethernetInfo).toEqual({bond1G:[{mac:undefined, port:'eth0'}], bond10G:[{mac:undefined, port:'eth1'}]});
    });

    it('should set formattedEnsemble', function() {
      getConfigDeferred.resolve({result:{config:{cluster:{ensemble:['foo','bar','baz']}}}});
      getConfigSpy.and.returnValue(getConfigDeferred.promise);
      scope.$apply();
      expect(controller.formattedEnsemble).toEqual('foo</br>bar</br>baz');
    });

    it('should handle errors in a sf-components modal', function() {
      getConfigDeferred.reject({method:'GetConfig', message:'foobar'});
      getConfigSpy.and.returnValue(getConfigDeferred.promise);
      scope.$apply();
      expect(helpers.handleError).toHaveBeenCalledWith('GetConfig Failed: foobar');
    });
  });

  describe('.updateConfig', function() {
    it('should update the button state and call the setConfig API method', function() {
      controller.updateConfig();
      expect(controller.currentState).toEqual('loading');
    });

    it('should reset the button state on success', function() {
      setConfigDeferred.resolve({result:{}});
      setConfigSpy.and.returnValue(setConfigDeferred.promise);
      controller.updateConfig();
      scope.$apply();
      timeout.flush();
      expect(controller.currentState).toEqual('default');
    });

    it('should handle errors in a sf-components modal', function() {
      setConfigDeferred.reject({method:'SetConfig', message:'foobar'});
      setConfigSpy.and.returnValue(setConfigDeferred.promise);
      controller.updateConfig();
      scope.$apply();
      expect(helpers.handleError).toHaveBeenCalledWith('SetConfig Failed: foobar');
    });
  });

  describe('.whenProcessing', function() {
    it('should return true if currentState is anything but default (to disable the form inputs)', function() {
      controller.currentState = 'foobar'
      expect(controller.whenProcessing()).toBeTruthy();
    });
  });

  describe('.addRoute', function() {
    it('should add an empty route object to the config', function() {
      controller.config = {network: {foo: {routes:[]}}};
      expect(controller.config.network.foo.routes.length).toEqual(0);
      controller.addRoute('foo');
      expect(controller.config.network.foo.routes.length).toEqual(1);
    });
  });

  describe('.removeRoute', function() {
    it('should remove a route from the config object at the index', function() {
      controller.config = {network: {foo: {routes:['bar']}}};
      expect(controller.config.network.foo.routes.length).toEqual(1);
      controller.removeRoute(0, 'foo');
      expect(controller.config.network.foo.routes.length).toEqual(0);
    });
  });

});
