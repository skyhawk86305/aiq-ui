class RestoreClusterConfirmationController {
  public modalInstance;
  public resolve;

  yes() {
    this.modalInstance.close();
  }

  no() {
    this.modalInstance.dismiss();
  }
}

export const RestoreClusterConfirmationComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<',
  },
  template: require('./restore-cluster-confirmation.tpl.html'),
  controller: RestoreClusterConfirmationController,
};
