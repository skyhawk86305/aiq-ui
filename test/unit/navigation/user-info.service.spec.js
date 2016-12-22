'use strict';

describe('UserInfoService', function () {
  var service,
      dataService,
      dataSpy,
      googleSpy,
      deferred,
      apiResponse,
      window;

  beforeEach(module('aiqUi'));

  beforeEach(function() {
    angular.mock.module('aiqUi', function($provide){
      $provide.value('$window', {ga: function(){}});
    });
  });

  beforeEach(inject(function ($window, UserInfoService, DataService, $q) {
    service = UserInfoService;
    dataService = DataService;
    window = $window;
    deferred = $q.defer();
    dataSpy = spyOn(dataService, 'callAPI').and.returnValue(deferred.promise);
    googleSpy = spyOn(window, 'ga');
    apiResponse = {
      user: {
        username: 'user',
        userID: 'userID',
        customerName: 'customer',
        customerID: 'customerID',
        groups: ['group1', 'group2']
      }
    };
  }));

  describe('.getUserInfo', function () {
    it('should retrieve user information and set Google Analytics properties', function () {
      deferred.resolve(apiResponse);
      service.getUserInfo().then(function() {
        expect(dataService.callAPI).toHaveBeenCalled();
        expect(window.ga).toHaveBeenCalled();
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', apiResponse.user.username);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', apiResponse.user.userID);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', apiResponse.user.customerName);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', apiResponse.user.customerID);
        expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', apiResponse.user.groups.join(', '));
      });
    });

    it('should only retrieve user information once per login', function () {
      deferred.resolve(apiResponse);
      service.getUserInfo().then(function() {
        service.getUserInfo().then(function() {
          expect(dataService.callAPI.calls.count()).toEqual(1);
          expect(window.ga.calls.count()).toEqual(5);
        });
      });
    });

    describe('the response does not contain a \'user\' object', function () {
      it('should not set any Google Analytics properties', function () {
        deferred.resolve({});
        service.getUserInfo().then(function() {
          expect(dataService.callAPI).toHaveBeenCalled();
          expect(window.ga).not.toHaveBeenCalled();
        });
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
        service.getUserInfo().then(function() {
          expect(dataService.callAPI).toHaveBeenCalled();
          expect(window.ga.calls.count()).toEqual(4);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', apiResponseSubset.user.userID);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', apiResponseSubset.user.customerName);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', apiResponseSubset.user.customerID);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', apiResponseSubset.user.groups.join(', '));
        });
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
        service.getUserInfo().then(function() {
          expect(dataService.callAPI).toHaveBeenCalled();
          expect(window.ga.calls.count()).toEqual(4);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', apiResponseSubset.user.username);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', apiResponseSubset.user.customerName);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', apiResponseSubset.user.customerID);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', apiResponseSubset.user.groups.join(', '));
        });
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
        service.getUserInfo().then(function() {
          expect(dataService.callAPI).toHaveBeenCalled();
          expect(window.ga.calls.count()).toEqual(4);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', apiResponseSubset.user.username);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', apiResponseSubset.user.userID);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', apiResponseSubset.user.customerID);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', apiResponseSubset.user.groups.join(', '));
        });
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
        service.getUserInfo().then(function() {
          expect(dataService.callAPI).toHaveBeenCalled();
          expect(window.ga.calls.count()).toEqual(4);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', apiResponseSubset.user.username);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', apiResponseSubset.user.userID);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', apiResponseSubset.user.customerName);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension5', apiResponseSubset.user.groups.join(', '));
        });
      });
      it('should not set the [groups] property in Google Analytics', function () {
        var apiResponseSubset = {
          user: {
            username: 'user',
            userID: 'userID',
            customerName: 'customer',
            customerID: 'customerID',
          }
        };
        deferred.resolve(apiResponseSubset);
        service.getUserInfo().then(function() {
          expect(dataService.callAPI).toHaveBeenCalled();
          expect(window.ga.calls.count()).toEqual(4);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension1', apiResponseSubset.user.username);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension2', apiResponseSubset.user.userID);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension3', apiResponseSubset.user.customerName);
          expect(window.ga).toHaveBeenCalledWith('set', 'dimension4', apiResponseSubset.user.customerID);
        });
      });
    });
  });

  describe('.clearUserInfo', function () {
    it('should allow the user information to be retrieved again', function () {
      deferred.resolve(apiResponse);
      service.getUserInfo().then(function() {
        expect(dataService.callAPI).toHaveBeenCalled();
        expect(window.ga).toHaveBeenCalled();
        service.clearUserInfo();
        service.getUserInfo().then(function() {
          expect(dataService.callAPI.calls.count()).toEqual(2);
          expect(window.ga.calls.count()).toEqual(10);
        });
      });
    });
  });
});
