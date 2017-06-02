module.exports = class FindClusterPage {
  constructor() {
    this.el = element(by.css('.find-cluster-page'));
    this.errorMessage = this.el.element(by.css('.banner-message-error'));
  }
}
