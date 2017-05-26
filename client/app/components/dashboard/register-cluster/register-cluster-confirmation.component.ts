export class RegisterClusterConfirmationController {
  public modalInstance;
  public resolve;

  yes() {
    this.modalInstance.close();
  }

  no() {
    this.modalInstance.dismiss();
  }
}

export const RegisterClusterConfirmationComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<',
  },
  template: require('./register-cluster-confirmation.tpl.html'),
  controller: RegisterClusterConfirmationController,
}
