'use strict';

describe('UserInfoService', function () {
  var service,
      rootScope,
      dataService,
      dataSpy,
      googleSpy,
      deferred,
      apiResponseUser,
      window;

  beforeEach(angular.mock.module('aiqUi', function ($provide) {
    $provide.value('DataService', {callAPI: function() {} });
    $provide.value('$window', {ga: function(){}});
  }));

  beforeEach(inject(function ($rootScope, $window, UserInfoService, DataService, $q) {
    rootScope = $rootScope;
    service = UserInfoService;
    dataService = DataService;
    window = $window;
    deferred = $q.defer();
    dataSpy = spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
    googleSpy = spyOn(window, 'ga');
    apiResponseUser = {
      user: {
        username: 'user',
        userID: 'userID',
        customerName: 'customer',
        customerID: 'customerID',
        groups: ['group1', 'group2'],
        userDisplayName: 'Test User'
      }
    };
    window.ATL_JQ_PAGE_PROPS = {
      fieldValues: {}
    };
  }));

  describe('.getUserInfo', function () {
    it('should retrieve user information and set Google Analytics properties', function () {
      deferred.resolve(apiResponseUser);
      service.getUserInfo();
      rootScope.$apply();
      expect(dataService.callAPI).toHaveBeenCalled();
      expect(window.ga).toHaveBeenCalled();
      expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', apiResponseUser.user.username);
      expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', apiResponseUser.user.userID);
      expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', apiResponseUser.user.customerName);
      expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', apiResponseUser.user.customerID);
      expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', apiResponseUser.user.groups.join(', '));
      expect(window.ATL_JQ_PAGE_PROPS.fieldValues).toEqual({fullname: apiResponseUser.user.userDisplayName, email: apiResponseUser.user.username});
    });

    it('should only retrieve user information once per login', function (done) {
      deferred.resolve(apiResponseUser);
      service.getUserInfo().then(function() {
        service.getUserInfo().then(function() {
          expect(dataService.callAPI.calls.count()).toEqual(1);
          expect(window.ga.calls.count()).toEqual(5);
          done();
        });
      });
      rootScope.$apply();
    });

    describe('the response does not contain a \'user\' object', function () {
      it('should not set any Google Analytics properties or JIRA form properties', function () {
        deferred.resolve({});
        service.getUserInfo();
        rootScope.$apply();
        expect(dataService.callAPI).toHaveBeenCalled();
        expect(window.ga.calls.count()).toEqual(5);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', null);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', null);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', null);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', null);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', null);
        expect(window.ATL_JQ_PAGE_PROPS.fieldValues).toEqual({});
      });
    });

    describe('if the [value] is not provided by the API', function () {
      beforeEach(function() {
        service.clearUserInfo();
      });

      it('should not set the [username] property in Google Analytics', function () {
        var apiResponseSubset = {
          user: {
            userID: 'userID',
            customerName: 'customer',
            customerID: 'customerID',
            groups: ['group1', 'group2']
          }
        };
        deferred.resolve(apiResponseSubset);
        service.getUserInfo();
        rootScope.$apply();
        expect(dataService.callAPI).toHaveBeenCalled();
        expect(window.ga.calls.count()).toEqual(4);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', apiResponseSubset.user.userID);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', apiResponseSubset.user.customerName);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', apiResponseSubset.user.customerID);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', apiResponseSubset.user.groups.join(', '));
      });
      it('should not set the [userID] property in Google Analytics', function () {
        var apiResponseSubset = {
          user: {
            username: 'user',
            customerName: 'customer',
            customerID: 'customerID',
            groups: ['group1', 'group2']
          }
        };
        deferred.resolve(apiResponseSubset);
        service.getUserInfo();
        rootScope.$apply();
        expect(dataService.callAPI).toHaveBeenCalled();
        expect(window.ga.calls.count()).toEqual(4);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', apiResponseSubset.user.username);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', apiResponseSubset.user.customerName);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', apiResponseSubset.user.customerID);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', apiResponseSubset.user.groups.join(', '));
      });
      it('should not set the [customerName] property in Google Analytics', function () {
        var apiResponseSubset = {
          user: {
            username: 'user',
            userID: 'userID',
            customerID: 'customerID',
            groups: ['group1', 'group2']
          }
        };
        deferred.resolve(apiResponseSubset);
        service.getUserInfo();
        rootScope.$apply();
        expect(dataService.callAPI).toHaveBeenCalled();
        expect(window.ga.calls.count()).toEqual(4);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', apiResponseSubset.user.username);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', apiResponseSubset.user.userID);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', apiResponseSubset.user.customerID);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', apiResponseSubset.user.groups.join(', '));
      });
      it('should not set the [customerID] property in Google Analytics', function () {
        var apiResponseSubset = {
          user: {
            username: 'user',
            userID: 'userID',
            customerName: 'customer',
            groups: ['group1', 'group2']
          }
        };
        deferred.resolve(apiResponseSubset);
        service.getUserInfo();
        rootScope.$apply();
        expect(dataService.callAPI).toHaveBeenCalled();
        expect(window.ga.calls.count()).toEqual(4);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', apiResponseSubset.user.username);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', apiResponseSubset.user.userID);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', apiResponseSubset.user.customerName);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', apiResponseSubset.user.groups.join(', '));
      });
      it('should not set the [groups] property in Google Analytics', function () {
        var apiResponseSubset = {
          user: {
            username: 'user',
            userID: 'userID',
            customerName: 'customer',
            customerID: 'customerID'
          }
        };
        deferred.resolve(apiResponseSubset);
        service.getUserInfo();
        rootScope.$apply();
        expect(dataService.callAPI).toHaveBeenCalled();
        expect(window.ga.calls.count()).toEqual(4);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', apiResponseSubset.user.username);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', apiResponseSubset.user.userID);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', apiResponseSubset.user.customerName);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', apiResponseSubset.user.customerID);
      });
    });
  });

  describe('.clearUserInfo', function () {
    it('should allow the user information to be retrieved again', function (done) {
      deferred.resolve(apiResponseUser);
      service.getUserInfo().then(function() {
        expect(dataService.callAPI).toHaveBeenCalled();
        expect(window.ga).toHaveBeenCalled();
        service.clearUserInfo();
        service.getUserInfo().then(function() {
          expect(dataService.callAPI.calls.count()).toEqual(2);
          expect(window.ga.calls.count()).toEqual(10);
          done();
        });
      });
      rootScope.$apply();
    });
  });
});
