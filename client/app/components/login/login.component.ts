class LoginController {

  static $inject = [ '$location', '$uibModal', '$window', '$httpParamSerializer' ];
  constructor(
    private $location,
    private $uibModal,
    private $window,
    private $httpParamSerializer,
  ) {}

  loginWithSSO() {
    const redirectURL = this.$location.search().url || '/';
    // we need to prepend the redirectURL with the pathname to make feature branch deploys work
    const target = this.$window.location.pathname + '#' + redirectURL;
    const params = this.$httpParamSerializer({ target });
    const loginURL = `/sso/login?${params}`;
    this.$window.location.href = loginURL;
  }

  openSSOPushModal() {
    return this.$uibModal
      .open({
        animation: false,
        component: 'ssoPush',
        size: 'md',
        windowClass: 'aiq-modal sso-push-modal',
        backdrop: 'static',
        backdropClass: 'aiq-modal-backdrop',
        resolve: {
          initiateSSOLogin: () => {
            return () => this.loginWithSSO();
          }
        },
      })
      .result;
  }

};

export const LoginComponent = {
  template: require('./login.tpl.html'),
  controller: LoginController,
};
