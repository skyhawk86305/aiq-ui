(function () {
    'use strict';
    angular
        .module('aiqUi')
        .component('login', {
        templateUrl: 'authentication/login.tpl.html',
        controller: ['AuthService', '$location', LoginController]
    });
    function LoginController(AuthService, $location) {
        var self = this;
        self.login = function (credentials) {
            AuthService.login(credentials)
                .then(function () {
                self.error = null;
                $location.path('/');
            }).catch(function () {
                self.error = 'Invalid username or password';
            });
        };
    }
})();
//# sourceMappingURL=login.component.js.map