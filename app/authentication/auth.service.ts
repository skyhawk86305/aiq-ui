(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('AuthService', ['$http', AuthService]);

    function AuthService($http) {
      return {
        login: function(credentials) {
          var encodedCredentials = {
            username: credentials.username,
            password: angular.copy(btoa(credentials.password))
          };
          return $http.put('/sessions', encodedCredentials);
        },

        isAuthenticated: function() {
          return $http.get('/sessions');
        },

        logout: function() {
          return $http.delete('/sessions');
        }
      };
    }
})();
