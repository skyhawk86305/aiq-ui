(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('AuthService', ['$http', 'UserInfoService', AuthService]);

    function AuthService($http, UserInfoService) {
      return {
        login: function(credentials) {
          var encodedCredentials = {
            username: credentials.username,
            password: angular.copy(btoa(credentials.password))
          };
          UserInfoService.getUserInfo();
          return $http.put('/sessions', encodedCredentials);
        },

        isAuthenticated: function() {
          UserInfoService.getUserInfo();
          return $http.get('/sessions', {cache: false});
        },

        logout: function() {
          UserInfoService.clearUserInfo();
          return $http.delete('/sessions');
        }
      };
    }
})();
