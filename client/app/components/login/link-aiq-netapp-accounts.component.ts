class LinkAiqNetappAccountsController {
  private modalInstance;

  static $inject = [ '$window', '$location', '$rootScope' ];
  constructor(
    private $window,
    private $location,
    private $rootScope
  ) {}

  cancel() {
    this.modalInstance.close();
    if (this.$rootScope.queryParams && this.$rootScope.queryParams.url) {
      this.$location.url(this.$rootScope.queryParams.url);
    } else {
      this.$location.path('/');
    }
  };

  goToNetappSignIn() {}

  goToNetappRegister() {
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
