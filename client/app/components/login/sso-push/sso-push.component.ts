class SSOPushController {
  private modalInstance;
  private resolve;

  static $inject = [ '$window', '$location' ];
  constructor(private $window, private $location) {}

  loginWithSSO() {
    this.resolve.initiateSSOLogin();
    this.modalInstance.close();
  }

  registerForNetappSupportAccount() {
    this.$window.open('https://mysupport.netapp.com/eservice/public/now.do', '_blank');
    this.cancel();
  };

  cancel() {
    this.$location.path('/aiq-login');
    this.modalInstance.close();
  };
}

export const SSOPushComponent = {
  bindings: {
    modalInstance: '<',
    resolve: '<',
  },
  template: require('./sso-push.tpl.html'),
  controller: SSOPushController,
};
