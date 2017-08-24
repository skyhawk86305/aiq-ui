class LinkSSOController {
  modalInstance;
  error: string;

  static $inject = [ '$location', '$window', 'AuthService' ];
  constructor(private $location, private $window, private AuthService) {}

  goToAIQLogin() {
    const url = this.$location.path();
    this.$location.path('/aiq-login').search({ linkSSO: true, url });
    this.modalInstance.close();
  }

  createAndLinkAIQAccount() {
    return this.AuthService.createAIQAccountFromSSO()
      .then( () => {
        this.modalInstance.close();
        this.$window.location.reload();
      })
      .catch( err => {
        // TODO: show error on this window?
        this.error = err;
      });
  }
}

export const LinkSSOComponent = {
  bindings: {
    modalInstance: '<',
  },
  template: require('./link-sso.tpl.html'),
  controller: LinkSSOController,
};
