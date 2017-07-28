class LinkAiqNetappAccountsController {
  private modalInstance;
  private redirectUrl;

  static $inject = [ '$window', '$location', '$rootScope', '$httpParamSerializer' ];
  constructor(
    private $window,
    private $location,
    private $rootScope,
    private $httpParamSerializer
  ) {
    $rootScope.queryParams = $location.search();
    this.redirectUrl = $rootScope.queryParams && $rootScope.queryParams.url ? $rootScope.queryParams.url : '/';
  }

  cancel() {
    this.modalInstance.close();
  };

  loginWithSSO() {
    // we need to prepend the redirectURL with the pathname to make feature branch deploys work
    const target = this.$window.location.pathname + '#' + this.redirectUrl;
    const params = this.$httpParamSerializer({ target });
    const loginURL = `/sso/login?${params}`;
    this.$window.location.href = loginURL;
  }

  registerForNetappSupportAccount() {
    this.$window.open('https://mysupport.netapp.com/eservice/public/now.do', '_blank');
    this.cancel();
  };

}

export const LinkAiqNetappAccountsComponent = {
  bindings: {
    modalInstance: '<',
  },
  template: require('./link-aiq-netapp-accounts.tpl.html'),
  controller: LinkAiqNetappAccountsController,
};
