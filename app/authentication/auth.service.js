(function () {
    'use strict';
    angular
        .module('aiqUi')
        .service('AuthService', ['$http', AuthService]);
    function AuthService($http) {
        var authService = {};
        authService.login = function (credentials) {
            var encodedCredentials = {
                username: credentials.username,
                password: angular.copy(btoa(credentials.password))
            };
            return $http.put('/sessions', encodedCredentials);
        };
        authService.isAuthenticated = function () {
            return $http.get('/sessions');
        };
        authService.logout = function () {
            return $http.delete('/sessions');
        };
        return authService;
    }
})();
//# sourceMappingURL=auth.service.js.map