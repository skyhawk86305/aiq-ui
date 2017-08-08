import { NewSuppressionResult } from './suppress-cluster/suppress-cluster.component';

class SuppressedClustersController {
  public newSuppressionResult: NewSuppressionResult;
  public newSuppressionError: string;

  static readonly $inject = [ 'SuppressedClustersService', '$uibModal', '$rootScope' ];
  constructor(private SuppressedClustersService, private $uibModal, private $rootScope) {}

  suppressCluster() {
    this.newSuppressionResult = null;
    this.newSuppressionError = null;
    return this.$uibModal
      .open({
        animation: false,
        component: 'suppressCluster',
        size: 'md',
        windowClass: 'aiq-modal suppress-cluster-modal',
        backdrop: 'static',
        backdropClass: 'aiq-modal-backdrop',
      })
      .result
      .then( result => {
        this.newSuppressionResult = result;
        this.$rootScope.$broadcast('refresh-suppressed-clusters', true);
      })
      .catch( err => {
        console.log(err);
        this.newSuppressionError = err;
      });
  }
}

export const SuppressedClustersComponent = {
  template: require('./suppressed-clusters.tpl.html'),
  controller: SuppressedClustersController,
};
