class LoginController {
  private queryParams;
  public redirectUrl;

  static $inject = [ 'AuthService', '$location', '$rootScope', '$uibModal', '$window', '$httpParamSerializer' ];
  constructor(
    private AuthService,
    private $location,
    private $rootScope,
    private $uibModal,
    private $window,
    private $httpParamSerializer,
  ) {
    $rootScope.queryParams = $location.search();
    this.redirectUrl = $rootScope.queryParams && $rootScope.queryParams.url ? $rootScope.queryParams.url : '/';
  }

  loginWithSSO() {
    // we need to prepend the redirectURL with the pathname to make feature branch deploys work
    const target = this.$window.location.pathname + '#' + this.redirectUrl;
    const params = this.$httpParamSerializer({ target });
    const loginURL = `/sso/login?${params}`;
    this.$window.location.href = loginURL;
  }
};

export const LoginComponent = {
  template: require('./login.tpl.html'),
  controller: LoginController,
};


