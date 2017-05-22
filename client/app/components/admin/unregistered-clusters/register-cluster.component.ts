import * as _ from 'lodash';

class Customer {
  public customerUID: string;
  public customerName: string;
}

class RegisterUnregisteredClusterController {
  private modalInstance;
  private resolve;
  public customers: Customer[];
  public customer: Customer = null;

  public error: string;

  static $inject = [ '$q', '$uibModal', 'DataService' ];
  constructor(
    private $q,
    private $uibModal,
    private DataService,
  ) {}

  $onInit() {
    return this.DataService.callAPI('ListCustomers')
      .then( ({ customers = [] }) => {
        this.customers = customers;
      });
  }

  registerCluster() {
    this.error = null;
    return this.validateCustomer()
      .then( () => this.openConfirmationModal() )
      .then( () =>
        this.DataService.callAPI('RegisterCluster', {
          clusterUUID: this.resolve.cluster.clusterUUID,
          customerUID: this.customer.customerUID,
        })
      )
      .then( () => this.modalInstance.close() )
      .catch( err => {
        if (err === 'backdrop click') {
          // confirmation modal was cancelled
          return;
        }
        this.error = err;
      });
  }

  cancel() {
    this.modalInstance.dismiss();
  }

  private validateCustomer() {
    const validCustomerUIDs = this.customers.map( customer => _.get(customer, 'customerUID') );
    if ( _(validCustomerUIDs).includes(this.customer.customerUID) ) {
      return this.$q.resolve();
    }
    return this.$q.reject('Customer not found');
  }

  private openConfirmationModal() {
    return this.$uibModal
      .open({
        animation: false,
        component: 'registerUnregisteredClusterConfirmation',
        size: 'md',
        resolve: {
          clusterName: () => this.resolve.cluster.clusterName,
          customerName: () => this.customer.customerName,
        },
        windowClass: 'aiq-modal',
        backdropClass: 'aiq-modal-backdrop',
      })
      .result;
  }
}

export const RegisterUnregisteredClusterComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<',
  },
  template: require('./register-cluster.tpl.html'),
  controller: RegisterUnregisteredClusterController,
};
