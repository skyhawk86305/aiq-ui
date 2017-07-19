(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('login', {
      template: require('./login.tpl.html'),
      controller: ['AuthService', '$location', '$rootScope', LoginController]
    });

  function LoginController(AuthService, $location, $rootScope) {
    let self = this;

    // needs to check whether or not the user has linked
    // their AIQ account with their NetApp Support Account
    // let linkedAIQWithSSO = true;

    self.login = function(credentials) {
      AuthService.login(credentials)
        .then(function() {
          self.error = null;
          let queryParams = $location.search();
          if (queryParams && queryParams.url) {
            $location.url(queryParams.url);
          // disabled until new login page is finished
          // } else if (!linkedAIQWithSSO) {
          //   $rootScope.redirectUrl = queryParams.url;
          //   $location.path('/account/register-with-netapp-support');
          } else {
            $location.path('/');
          }
        }).catch(function() {
          self.error = 'Invalid username or password';
        });
    };
  }
})();
