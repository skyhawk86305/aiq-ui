(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('UserInfoService', ['$window', 'DataService', UserInfoService]);

  function UserInfoService($window, DataService) {
    var userInfoRetrieved = false;

    return {
      getUserInfo: function() {
        if(!userInfoRetrieved) {
          return DataService.callAPI('GetUserInfo', null)
            .then(function(response) {
              userInfoRetrieved = true;
              if(typeof $window.ga !== 'undefined' && response.user){
                if(response.user.username) {
                  $window.ga('set', 'dimension1', response.user.username);
                }
                if(response.user.userID) {
                  $window.ga('set', 'dimension2', response.user.userID);
                }
                if(response.user.customerName) {
                  $window.ga('set', 'dimension3', response.user.customerName);
                }
                if(response.user.customerID) {
                  $window.ga('set', 'dimension4', response.user.customerID);
                }
                if(response.user.groups) {
                  $window.ga('set', 'dimension5', response.user.groups.join(', '));
                }
              }
            });
        }
      },

      clearUserInfo: function() {
        userInfoRetrieved = false;
      }
    };
  }
})();
