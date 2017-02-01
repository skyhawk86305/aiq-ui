(function () {
  'use strict';

  const moduleName = 'aiqUi';
  const componentName = 'changePassword';
  const templateUrl = 'account/change-password/change-password.tpl.html';
  const controllerDeps = ['AuthService'];

  class ChangePasswordController {
    public currentPassword: string;
    public newPassword: string;
    public reenterNewPassword: string;
    public form;

    private successful: boolean = false;
    private error = null;
    private incorrectPassword: boolean = false;

    constructor(private AuthService) {}

    submit() {
      this.successful = false;
      this.error = null;
      this.incorrectPassword = false;

      return this.AuthService.changePassword(this.currentPassword, this.newPassword)
        .then( response => {
          this.successful = true;
          this.currentPassword = '';
          this.newPassword = '';
          this.reenterNewPassword = '';
          this.form.$setUntouched();
          this.form.$setPristine();
        })
        .catch( err => {
          if (err.name == 'IncorrectPasswordFault') this.incorrectPassword = true;
          else if (err.message) this.error = err.message;
          else if (err.data) this.error = err.data;
          else this.error = err;
        });
    }
  }

  // had to move this to the bottom in order to use a TS class, since class definitions aren't hoisted to
  // the top of the scope like function definitions are. This will be cleaner with webpack/ES6 imports.
  angular
    .module(moduleName)
    .component(componentName, {
      templateUrl,
      controller: [ ...controllerDeps, ChangePasswordController ],
    });
})();
