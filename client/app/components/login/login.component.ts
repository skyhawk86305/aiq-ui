import * as _ from 'lodash';

class LoginController {
  public linkedAiqWithNetapp: boolean;
  private error;
  private queryParams;

  static $inject = [ 'AuthService', '$location', '$rootScope', '$uibModal' ];
  constructor(
    private AuthService,
    private $location,
    private $rootScope,
    private $uibModal,
  ) {}

  login(credentials) {
    const self = this;
    self.AuthService.login(credentials)
      .then( () => {
        self.error = null;
        self.$rootScope.queryParams = self.$location.search();
        // commented out until account linking is implemented
        /* if (!self.linkedAiqWithNetapp) {
          self.openLinkingModal();
        } else */ if (self.$rootScope.queryParams && self.$rootScope.queryParams.url) {
          self.$location.url(self.$rootScope.queryParams.url);
        } else {
          self.$location.path('/');
        }
      }).catch( () => {
        self.error = 'Invalid username or password';
      });
  };

  private openLinkingModal() {
    return this.$uibModal
      .open({
        animation: false,
        component: 'linkAiqNetappAccounts',
        size: 'md',
        windowClass: 'aiq-modal link-aiq-netapp-accounts-modal',
        background: 'static',
        backdropClass: 'aiq-modal-backdrop',
      })
      .result;
  };

}

export const LoginComponent = {
  template: require('./login.tpl.html'),
  controller: LoginController,
};
