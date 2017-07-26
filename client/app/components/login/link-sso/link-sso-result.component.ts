class LinkSSOResultController {
  private modalInstance;
  private resolve;
}

export const LinkSSOResultComponent = {
  bindings: {
    modalInstance: '<',
    resolve: '<',
  },
  template: require('./link-sso-result.tpl.html'),
  controller: LinkSSOResultController,
};
