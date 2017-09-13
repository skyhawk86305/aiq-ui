import * as _ from 'lodash';

class Customer {
  public clusterID: number;
  public customerUID: string;
  public customerName: string;
}

class RestoreClusterController {
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

  restoreCluster() {
    this.error = null;
      return this.validateCustomer()
      .then( () => this.openConfirmationModal() )
      .then( () =>
        this.DataService.callAPI('RestoreArchivedCluster', {
          clusterID: this.resolve.cluster.clusterID,
        })
      )
      .then( () => this.modalInstance.close() )
      .catch( err => {
        if ( !err || err === 'backdrop click' ) {
          // confirmation modal was cancelled
          return;
        }
        const message = _.get(err, 'message');
        if (message) {
          this.error = message;
          return;
        }
        this.error = 'An unexpected error occurred while attempting to restore the cluster';
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
      return this.$q.reject({ message: 'Customer not found' });
    }


  private openConfirmationModal() {
    return this.$uibModal
      .open({
        animation: false,
        component: 'restoreClusterConfirmation',
        size: 'md',
        resolve: {
          clusterName: () => this.resolve.cluster.clusterName,
          customerName: () => this.customer.customerName,
        },
        windowClass: 'aiq-modal restore-cluster-confirmation-modal',
        backdropClass: 'aiq-modal-backdrop',
      })
      .result;
  }
}

export const RestoreClusterComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<',
  },
  template: require('./restore-cluster.tpl.html'),
  controller: RestoreClusterController,
};
