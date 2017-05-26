class RegisterUnregisteredClusterConfirmationController {
  public modalInstance;
  public resolve;

  yes() {
    this.modalInstance.close();
  }

  no() {
    this.modalInstance.dismiss();
  }
}

export const RegisterUnregisteredClusterConfirmationComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<',
  },
  template: require('./register-cluster-confirmation.tpl.html'),
  controller: RegisterUnregisteredClusterConfirmationController,
};
