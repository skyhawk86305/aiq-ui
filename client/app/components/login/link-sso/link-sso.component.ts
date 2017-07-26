class LinkSSOController {
  modalInstance;

  static $inject = [ '$window', '$location' ];
  constructor(
    private $window,
    private $location,
  ) {}

  goToAIQLogin() {
    const url = this.$location.path();
    this.$location.path('/aiq-login').search({ linkSSO: true, url });
    this.modalInstance.close();
  }

  createAndLinkAIQAccount() {
    this.$window.alert('Not yet implemented');
  }
}

export const LinkSSOComponent = {
  bindings: {
    modalInstance: '<',
  },
  template: require('./link-sso.tpl.html'),
  controller: LinkSSOController,
};
