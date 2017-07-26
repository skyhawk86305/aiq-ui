class AiqLoginController {
  private error;

  static $inject = [ 'AuthService', '$location', '$uibModal', '$window' ];
  constructor(
    private AuthService,
    private $location,
    private $uibModal,
    private $window,
  ) {}

  login(credentials) {
    return this.AuthService.login(credentials)
      .then( () => {
        this.error = null;
        const params = this.$location.search();
        const targetURL = params.url || '/';
        if (params.linkSSO) {
          return this.linkSSOAndRedirect(targetURL);
        }
        this.$location.url(targetURL);
      })
      .catch( () => {
        this.error = 'Invalid username or password';
      })
  }

  private linkSSOAndRedirect(targetURL) {
    return this.AuthService.linkSSO()
      .then( () => {
        this.showLinkSSOResultModal()
          .then( () => {
            this.$location.url(targetURL)
          })
      })
      .catch( err => {
        this.showLinkSSOResultModal(err);
      })
  }
  private showLinkSSOResultModal(err = undefined) {
    return this.$uibModal
      .open({
        animation: false,
        component: 'linkSSOResult',
        size: 'md',
        windowClass: 'aiq-modal link-sso-result-modal',
        backdrop: 'static',
        backdropClass: 'link-sso-modal-backdrop',
        resolve: { err },
      })
      .result;
  }

}

export const AiqLoginComponent = {
  template: require('./aiq-login.tpl.html'),
  controller: AiqLoginController,
};
