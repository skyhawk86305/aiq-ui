import * as _ from 'lodash';

class AiqLoginController {
  public linkedAiqWithNetapp: any;
  private error;
  private queryParams;

static $inject = [ 'AuthService', '$location', '$rootScope', '$uibModal', '$timeout'];
  constructor(
    private AuthService,
    private $location,
    private $rootScope,
    private $uibModal,
    private $timeout,
  ) {
    const self = this;
    $rootScope.queryParams = $location.search();
    // $timeout(function() { self.openLinkingModal(); }, 500);
  }

  login(credentials) {
    const self = this;
    self.AuthService.login(credentials)
      .then( () => {
        self.error = null;
        self.$rootScope.queryParams = self.$location.search();
        if (self.$rootScope.queryParams && self.$rootScope.queryParams.url) {
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
        backdrop: 'static',
        backdropClass: 'aiq-modal-backdrop',
      })
      .result;
  };
}

export const AiqLoginComponent = {
  template: require('./aiq-login.tpl.html'),
  controller: AiqLoginController,
};
