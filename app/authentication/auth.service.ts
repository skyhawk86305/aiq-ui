(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('AuthService', ['$q', '$http', 'UserInfoService', AuthService]);

    function AuthService($q, $http, UserInfoService) {
      return {
        login: function(credentials) {
          var encodedCredentials = {
            username: credentials.username,
            password: angular.copy(btoa(credentials.password))
          };
          return $http.put('/sessions', encodedCredentials).then(function(response) {
            UserInfoService.getUserInfo();
            return response;
          }).catch(function(error) {
            UserInfoService.clearUserInfo();
            return $q.reject(error);
          });
        },

        isAuthenticated: function() {
          return $http.get('/sessions', {cache: false}).then(function(response) {
            UserInfoService.getUserInfo();
            return response;
          }).catch(function(error) {
            UserInfoService.clearUserInfo();
            return $q.reject(error);
          });
        },

        logout: function() {
          return $http.delete('/sessions').then(function(response) {
            UserInfoService.clearUserInfo();
            return response;
          }).catch(function(error) {
            return $q.reject(error);
          });
        }
      };
    }
})();
