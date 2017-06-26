(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'resetPassword';
  const controllerDeps = ['AuthService', '$location'];

  class ResetPasswordController {
    public token: string;
    public username: string;

    public email: string;
    public newPassword: string;

    public emailSent = false;
    public resetComplete = false;
    public error: string = null;

    constructor(private AuthService, private $location) {
      this.token = this.$location.search()['token'];
      this.username = this.$location.search()['user'];
    }

    requestPasswordReset() {
      return this.AuthService.requestPasswordReset(this.email)
        .then( () => {
          this.emailSent = true;
        })
        .catch( err => {
          this.error = 'Error Code: ' + err.status + ' ' + err.statusText || err;
        });
    };

    setNewPassword() {
      return this.AuthService.setNewPassword(this.token, this.newPassword)
        .then( () => {
          this.resetComplete = true;
        })
        .catch( err => {
          this.error = 'Error Code: ' + err.status + ' ' + err.statusText || err;
        });
    };

  }

  angular
    .module(moduleName)
    .component(componentName, {
      template: require('./reset-password.tpl.html'),
      controller: [ ...controllerDeps, ResetPasswordController ],
    });
})();

