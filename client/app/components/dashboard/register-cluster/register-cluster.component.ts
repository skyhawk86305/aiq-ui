import * as _ from 'lodash';

class RegisterClusterController {
  public steps = this.getWizardSteps();
  public currentStep = 0;
  public error: string;
  public loading: boolean;

  public clusterMVIP: string;
  public clusterUsername: string;
  public clusterPassword: string;
  public clusterName: string;
  public clusterUUID: string;
  public customerName: string;
  public customerUID: string;
  public clusterID: number;

  static $inject = [ '$q', '$uibModal', '$location', 'DataService', 'ElementClient' ];
  constructor(private $q, private $uibModal, private $location, private DataService, private ElementClient) {}

  next() {
    this.loading = true;
    this.error = null;
    this.validateCurrentStep()
      .then( () => {
        this.currentStep++;
      })
      .catch( err => {
        this.error = err;
      })
      .then( () => {
        this.loading = false;
      });
  }

  back() {
    this.currentStep--;
  }

  viewCluster() {
    this.$location.path(`/cluster/${this.clusterID}/reporting/overview`);
  }

  private validateCurrentStep() {
    const step = this.steps[this.currentStep];
    if (step) {
      return step();
    }
    return this.$q.resolve();
  }

  private getWizardSteps() {
    return [
      // step 1
      () => {
        const client = new this.ElementClient(this.clusterMVIP, '', '');
        return this.$q.resolve( client.callAPI('GetClusterInfo') )
          .catch( err => {
            if (err === 'unauthenticated') {
              // this is what we expect if the MVIP is accessible, since we didn't send any creds
              return;
            }
            return this.$q.reject('ClusterInfoNotRetrievable');
          });
      },

      // step 2
      () => {
        const client = new this.ElementClient(this.clusterMVIP, this.clusterUsername, this.clusterPassword);
        return this.$q.resolve( client.callAPI('GetClusterInfo') )
          .then( ({ clusterInfo }) => {
            this.clusterName = clusterInfo.name;
            this.clusterUUID = clusterInfo.uuid;
          })
          .catch( err => {
            if (err === 'unauthenticated') {
              return this.$q.reject('ClusterAuthError');
            }
            return this.$q.reject('ClusterInfoNotRetrievable');
          })
          .then( () =>
            this.DataService.callAPI('FindCluster', { clusterUUID: this.clusterUUID })
              .catch( err => {
                if (err.name === 'NoSuchClusterFoundFault') {
                  // no problem, it'll be created when we call RegisterCluster
                  return;
                }
                if (err.name === 'ClusterNotAvailableFault') {
                  // already registered and we can't see it
                  return this.$q.reject('RegisteredClusterPermissionError');
                }
                return this.$q.reject('RegistrationCheckError');
              })
              .then( result => {
                const customerID = _.get(result, 'customerID')
                if (customerID) {
                  this.clusterID = _.get(result, 'clusterID');
                  return this.$q.reject('ClusterAlreadyRegistered');
                }
              })
          );
      },

      // step 3
      () => {
        return this.DataService.callAPI('GetCustomer', { customerUID: this.customerUID })
          .then( ({ customer }) => {
            this.customerName = customer.customerName;
          })
          .catch( err => {
            if (err.name === 'InvalidCustomerFault') {
              return this.$q.reject('CustomerNotFoundError');
            }
            return this.$q.reject('CustomerCheckError');
          })
          .then( () => this.openConfirmationModal() )
          .then( () =>
            this.DataService.callAPI('RegisterCluster', {
              clusterUUID: this.clusterUUID,
              customerUID: this.customerUID,
            })
            .then( ({ clusterID }) => {
              this.clusterID = clusterID;
            })
            .catch( err => {
              if ( err.name === 'ClusterAlreadyRegisteredFault' ) {
                this.clusterID = null;
                return this.$q.reject('ClusterAlreadyRegistered');
              }
              return this.$q.reject('ClusterRegistrationError');
            })
          );
      },
    ];
  }

  private openConfirmationModal() {
    return this.$uibModal
      .open({
        animation: false,
        component: 'registerClusterConfirmation',
        size: 'md',
        resolve: {
          clusterName: () => this.clusterName,
          customerName: () => this.customerName,
        },
        windowClass: 'aiq-modal',
        backdropClass: 'aiq-modal-backdrop',
      })
      .result;
  }
}

export const RegisterClusterComponent = {
  template: require('./register-cluster.tpl.html'),
  controller: RegisterClusterController,
}
